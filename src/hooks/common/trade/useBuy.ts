import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useDebouncedCallback } from 'use-debounce/lib'
import { useRecoilValue } from 'recoil'
import useNetwork from '../useNetwork'
import useRoute from 'hooks/common/useRoute'

import { DEV, MESSAGE, UTIL } from 'consts'

import {
  uToken,
  Token,
  uNative,
  Native,
  uUST,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
  RoutePath,
  TokenKeyEnum,
} from 'types'
import { TradeSimulation } from 'types/tradeSimulation'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'
import useSimulate from 'hooks/query/token/useSimulate'

import { buyFromSimulator, buyToSimulator } from 'logics/tradeSimulator'
import {
  validateFee,
  validateFormInputAmount,
  validateFormInputAmountDecimal,
  validateSlippage,
} from 'logics/validator'

export type UseBuyReturn = {
  fromTokenContractOrDenom: ContractAddr | TokenDenomEnum
  toTokenContractOrDenom: ContractAddr | TokenDenomEnum
  fromTokenSymbol: string
  toTokenSymbol: string

  slippage: string
  updateSlippage: (value: string) => void
  fromAmount: Token
  updateFromAmount: (value: Token) => void
  fromAmountErrMsg: string
  toAmount: Token
  updateToAmount: (value: Token) => void
  toAmountErrMsg: string

  fee?: Fee
  simulation?: TradeSimulation<uToken, uToken>

  onClickBuy: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useBuy = ({
  fromTokenContractOrDenom,
  toTokenContractOrDenom,
  fromTokenSymbol,
  toTokenSymbol,
  pairContract,
}: {
  fromTokenContractOrDenom: ContractAddr | TokenDenomEnum
  toTokenContractOrDenom: ContractAddr | TokenDenomEnum
  fromTokenSymbol: string
  toTokenSymbol: string
  pairContract: ContractAddr
}): UseBuyReturn => {
  const { pairContractMap } = useNetwork()
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { balance: fromTokenBal } = useMyBalance({
    contractOrDenom: fromTokenContractOrDenom,
  })

  const { getSwapMsgs } = useFabricator(pairContractMap[pairContract]?.dex)
  const connectedWallet = useConnectedWallet()

  const [simulation, setSimulation] =
    useState<TradeSimulation<uToken, uToken>>()
  const [simulationErrMsg, setSimulationErrMsg] = useState('')
  const { simulate, reverseSimulate } = useSimulate()

  const [slippage, setSlippage] = useState<string>('0.01')

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [fromAmount, setFromAmount] = useState('' as Token)
  const fromAmountErrMsg = useMemo(() => {
    const myTokenAmount = UTIL.demicrofy(fromTokenBal)
    return validateFormInputAmount({
      input: fromAmount,
      max: myTokenAmount,
    })
  }, [fromAmount])

  const [toAmount, setToAmount] = useState('' as Token)
  const toAmountErrMsg = useMemo(() => {
    return validateFormInputAmountDecimal({
      input: toAmount,
    })
  }, [toAmount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    fromAmount.trim() === '' ||
    !!fromAmountErrMsg ||
    !!toAmountErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    const beliefPrice =
      simulation?.beliefPrice && UTIL.demicrofy(simulation.beliefPrice)

    if (Number(fromAmount) > 0 && UTIL.toBn(beliefPrice).gt(0)) {
      msgs = getSwapMsgs({
        fromAmount,
        fromTokenContractOrDenom,
        pairContract,
        maxSpread: slippage,
        beliefPrice,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, fromAmount, simulation])

  const { fee } = useCalcFee({
    isValid: !invalidForm && !!simulation,
    txOptions,
  })

  const dbcSimulateFromAmount = useDebouncedCallback(
    async (nextFromUAmount: uToken) => {
      try {
        const simulated = await simulate({
          amount: nextFromUAmount,
          pairContract,
          tokenContract: fromTokenContractOrDenom,
        })

        if (simulated) {
          const simulation = buyFromSimulator({
            simulated,
            fromAmount: nextFromUAmount,
            maxSpread: slippage,
          })
          setSimulation(simulation)
          const _toAmount = simulation?.toAmount || ('0' as uToken)
          setToAmount(UTIL.demicrofy(_toAmount) as Token)
        }
      } catch (e) {
        setSimulationErrMsg(MESSAGE['Simulation failed'])
        DEV.log('dbcSimulateToAmount', e)
      }
    },
    400
  )

  const updateFromAmount = async (nextFromAmount: Token): Promise<void> => {
    setSimulation(undefined)
    setSimulationErrMsg('')
    setFromAmount(nextFromAmount.trim() as Native)
    setToAmount('' as Token)
    const nextFromUAmount = UTIL.microfy(nextFromAmount) as uToken
    dbcSimulateFromAmount(nextFromUAmount)
  }

  const { routeParams } = useRoute<RoutePath.home>()
  const tokenSymbol =
    routeParams?.symbol || TokenKeyEnum.LUNA + '_' + TokenKeyEnum.UST

  const [currentPair, setCurrentPair] = useState('')
  if (currentPair !== tokenSymbol) {
    // reset
    updateFromAmount('' as Token)
    setCurrentPair(tokenSymbol)
  }

  const dbcSimulateToAmount = useDebouncedCallback(
    async (nextToUAmount: uToken) => {
      try {
        const simulated = await reverseSimulate<uToken, uToken>({
          amount: nextToUAmount,
          pairContract,
          tokenContract: toTokenContractOrDenom,
        })
        if (simulated) {
          const simulation = buyToSimulator({
            simulated,
            toAmount: nextToUAmount,
            maxSpread: slippage,
          })
          setSimulation(simulation)
          const _fromAmount = simulation?.fromAmount || ('0' as uToken)
          setFromAmount(UTIL.demicrofy(_fromAmount) as Token)
        }
      } catch (e) {
        setSimulationErrMsg(MESSAGE['Simulation failed'])
        DEV.log('dbcSimulateToAmount', e)
      }
    },
    400
  )

  const updateToAmount = async (nextToAmount: Token): Promise<void> => {
    setSimulation(undefined)
    setSimulationErrMsg('')
    setToAmount(nextToAmount.trim() as Token)
    setFromAmount('' as Native)
    const nextToUAmount = UTIL.microfy(nextToAmount) as uToken
    dbcSimulateToAmount(nextToUAmount)
  }

  const updateSlippage = (value: string): void => {
    setSlippage(value)
    setSimulation(undefined)
    setSimulationErrMsg('')
    dbcSimulateFromAmount(UTIL.microfy(fromAmount) as uNative)
  }

  const submitErrMsg =
    useMemo(() => {
      let msg = ''

      if (fee) {
        let availableUusd = UTIL.toBn(uusdBal)

        if (fromTokenContractOrDenom === TokenDenomEnum.uusd) {
          availableUusd = availableUusd.minus(UTIL.microfy(fromAmount))
        }

        msg = validateFee({
          availableUusd: availableUusd.toFixed(0) as uUST,
          fee,
        })
      }

      const validateSlippageReturn = validateSlippage({
        slippage,
      })

      if (validateSlippageReturn.status === 'error') {
        msg = validateSlippageReturn.message
      }

      return msg
    }, [fee, fromAmount, slippage]) || simulationErrMsg

  const onClickBuy = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateFromAmount('' as Native)
  }

  useEffect(() => {
    updateFromAmount(fromAmount)
  }, [pairContract])

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    fromTokenContractOrDenom,
    toTokenContractOrDenom,
    fromTokenSymbol,
    toTokenSymbol,

    slippage,
    updateSlippage,

    fromAmount,
    updateFromAmount,
    fromAmountErrMsg,

    toAmount,
    updateToAmount,
    toAmountErrMsg,

    fee,
    simulation,
    onClickBuy,
    invalidForm,
    submitErrMsg,
  }
}

export default useBuy
