import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  Token,
  uUST,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
  TokenInfoType,
} from 'types'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'

import {
  validateFee,
  validateFormInputAmount,
  validateFormInputAmountDecimal,
} from 'logics/validator'
import useNetwork from '../useNetwork'
import usePool from 'hooks/query/pair/usePool'

export type UseLimitOrderBuyReturn = {
  askTokenPrice: Token
  offerDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string

  offerAmount: Token
  offerAmountErrMsg: string

  askAmount: Token
  updateAskAmount: (value: Token) => void
  askAmountErrMsg: string
  askPrice: Token
  updateAskPrice: (value: Token) => void
  askPriceErrMsg: string

  feeToken: TokenInfoType
  feeTokenAmount: Token
  setFeeTokenAmount: (value: Token) => void
  feeTokenAmountErrMsg: string

  fee?: Fee

  onClickLimitOrderBuy: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLimitOrderBuy = ({
  offerDenom,
  askContractOrDenom,
  offerTokenSymbol,
  askTokenSymbol,
  pairContract,
}: {
  offerDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string
  pairContract: ContractAddr
}): UseLimitOrderBuyReturn => {
  const { limitOrder, feeToken } = useNetwork()
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { balance: offerDenomBal } = useMyBalance({
    contractOrDenom: offerDenom,
  })

  const { balance: feeTokenBal } = useMyBalance({
    contractOrDenom: feeToken.contractOrDenom,
  })

  const { getSubmitOrderMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()

  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: askContractOrDenom,
  })

  // allow input price to be larger 1% of simulated price
  const askTokenPrice = UTIL.toBn(poolInfo?.token_0_Price)
    .multipliedBy(1.01)
    .dp(6)
    .toString(10) as Token

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const myFeeTokenAmount = UTIL.demicrofy(feeTokenBal)
  const [feeTokenAmount, setFeeTokenAmount] = useState<Token>('0.25' as Token)
  const feeTokenAmountErrMsg = useMemo(() => {
    return validateFormInputAmount({
      input: feeTokenAmount,
      max: myFeeTokenAmount,
      min: '0.25' as Token,
    })
  }, [feeTokenAmount, myFeeTokenAmount])

  const [askAmount, setAskAmount] = useState('' as Token)
  const askAmountErrMsg = useMemo(() => {
    return validateFormInputAmountDecimal({
      input: askAmount,
    })
  }, [askAmount])

  const [askPrice, setAskPrice] = useState('' as Token)
  const askPriceErrMsg = useMemo(() => {
    return validateFormInputAmount({
      input: askPrice,
      max: askTokenPrice,
    })
  }, [askPrice])

  const offerAmount = useMemo(() => {
    if (askAmount && askPrice) {
      return UTIL.toBn(askAmount)
        .multipliedBy(askPrice)
        .dp(6)
        .toString(10) as Token
    }
    return '0' as Token
  }, [askAmount, askPrice, feeTokenAmount])

  const offerAmountErrMsg = useMemo(() => {
    const myOfferToken = UTIL.demicrofy(offerDenomBal)
    let dexFee = '0' as Token
    if (feeToken.contractOrDenom === offerDenom) {
      dexFee = feeTokenAmount
    }

    return validateFormInputAmount({
      input: UTIL.toBn(offerAmount).plus(dexFee).dp(6).toString(10) as Token,
      max: myOfferToken,
    })
  }, [offerAmount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    askAmount.trim() === '' ||
    !!feeTokenAmountErrMsg ||
    !!askAmountErrMsg ||
    !!askPriceErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(askAmount) > 0 && Number(offerAmount) > 0) {
      msgs = getSubmitOrderMsgs({
        pairContract,
        offerAmount,
        askAmount,
        limitOrderContract: limitOrder,
        offerContractOrDenom: offerDenom,
        askContractOrDenom,
        feeContractOrDenom: feeToken.contractOrDenom,
        feeAmount: feeTokenAmount,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, offerAmount, askAmount, feeTokenAmount])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const updateAskAmount = async (nextAskAmount: Token): Promise<void> => {
    setAskAmount(nextAskAmount.trim() as Token)
  }

  const updateAskPrice = async (nextAskPrice: Token): Promise<void> => {
    setAskPrice(nextAskPrice.trim() as Token)
  }

  const submitErrMsg = useMemo(() => {
    let msg = ''

    if (fee) {
      let availableUusd = UTIL.toBn(uusdBal)

      if (offerDenom === TokenDenomEnum.uusd) {
        availableUusd = availableUusd.minus(UTIL.microfy(offerAmount))
      }

      if (feeToken.contractOrDenom === TokenDenomEnum.uusd) {
        availableUusd = availableUusd.minus(UTIL.microfy(feeTokenAmount))
      }

      msg = validateFee({
        availableUusd: availableUusd.toFixed(0) as uUST,
        fee,
      })
    }

    return msg
  }, [fee, offerAmount, feeTokenAmount])

  const onClickLimitOrderBuy = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateAskAmount('' as Token)
    setAskPrice('' as Token)
  }

  useEffect(() => {
    initForm()
  }, [pairContract])

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    askTokenPrice,
    offerDenom,
    askContractOrDenom,
    offerTokenSymbol,
    askTokenSymbol,

    offerAmount,
    offerAmountErrMsg,

    askAmount,
    updateAskAmount,
    askAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    feeToken,
    feeTokenAmount,
    setFeeTokenAmount,
    feeTokenAmountErrMsg,

    fee,
    onClickLimitOrderBuy,
    invalidForm,
    submitErrMsg,
  }
}

export default useLimitOrderBuy
