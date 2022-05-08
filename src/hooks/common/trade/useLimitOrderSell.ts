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
  validateFormInputMinAmount,
  validateFormInputAmountDecimal,
} from 'logics/validator'
import useNetwork from '../useNetwork'
import usePool from 'hooks/query/pair/usePool'

export type UseLimitOrderSellReturn = {
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string

  offerAmount: Token

  askAmount: Token
  updateAskAmount: (value: Token) => void
  askAmountErrMsg: string

  updateOfferAmount: (value: Token) => void
  offerAmountErrMsg: string
  askPrice: Token
  updateAskPrice: (value: Token) => void
  askPriceErrMsg: string

  feeToken: TokenInfoType
  feeTokenAmount: Token
  setFeeTokenAmount: (value: Token) => void
  feeTokenAmountErrMsg: string

  fee?: Fee

  onClickLimitOrderSell: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLimitOrderSell = ({
  offerContractOrDenom,
  askDenom,
  offerTokenSymbol,
  askTokenSymbol,
  pairContract,
}: {
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string
  pairContract: ContractAddr
}): UseLimitOrderSellReturn => {
  const { limitOrder, feeToken } = useNetwork()
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { balance: offerDenomBal } = useMyBalance({
    contractOrDenom: offerContractOrDenom,
  })

  const { balance: feeTokenBal } = useMyBalance({
    contractOrDenom: feeToken.contractOrDenom,
  })

  const { getSubmitOrderMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()

  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: offerContractOrDenom,
  })

  // allow input price to be larger 1% of simulated price
  const askTokenPrice = UTIL.toBn(poolInfo?.token_0_Price)
    .dp(6)
    .toString(10) as Token

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [offerAmount, setOfferAmount] = useState('' as Token)
  const offerAmountErrMsg = useMemo(() => {
    const myOfferAmount = UTIL.demicrofy(offerDenomBal)
    return validateFormInputAmount({
      input: offerAmount,
      max: myOfferAmount,
    })
  }, [offerAmount])

  const [askPrice, setAskPrice] = useState(askTokenPrice)
  const askPriceErrMsg = useMemo(() => {
    return validateFormInputMinAmount({
      input: askPrice,
      min: UTIL.toBn(askTokenPrice)
        .multipliedBy(0.99)
        .dp(6)
        .toString(10) as Token,
    })
  }, [askPrice, askTokenPrice])

  const [askAmount, setAskAmount] = useState('' as Token)
  const askAmountErrMsg = useMemo(() => {
    return validateFormInputAmountDecimal({
      input: askAmount,
    })
  }, [askAmount])
  // const askAmount = useMemo(() => {
  //   if (offerAmount && askPrice) {
  //     return UTIL.toBn(offerAmount)
  //       .multipliedBy(askPrice)
  //       .dp(6)
  //       .toString(10) as Token
  //   }
  //   return '0' as Token
  // }, [offerAmount, askPrice])

  const myFeeTokenAmount = UTIL.demicrofy(feeTokenBal)
  const [feeTokenAmount, setFeeTokenAmount] = useState<Token>('0.0' as Token)
  const feeTokenAmountErrMsg = useMemo(() => {
    return validateFormInputAmount({
      input: feeTokenAmount,
      max: myFeeTokenAmount,
      min: '0.0' as Token,
    })
  }, [feeTokenAmount, myFeeTokenAmount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    offerAmount.trim() === '' ||
    !!feeTokenAmountErrMsg ||
    !!offerAmountErrMsg ||
    !!askPriceErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(askAmount) > 0 && Number(offerAmount) > 0) {
      msgs = getSubmitOrderMsgs({
        pairContract,
        offerAmount,
        askAmount,
        limitOrderContract: limitOrder,
        offerContractOrDenom,
        askContractOrDenom: askDenom,
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

  const updateOfferAmount = async (nextOfferAmount: Token): Promise<void> => {
    setOfferAmount(nextOfferAmount.trim() as Token)
    if (nextOfferAmount && askPrice) {
      setAskAmount(
        UTIL.toBn(nextOfferAmount)
          .multipliedBy(askPrice)
          .dp(6)
          .toString(10) as Token
      )
    } else {
      setAskAmount('' as Token)
    }
  }

  const updateAskAmount = async (nextAskAmount: Token): Promise<void> => {
    setAskAmount(nextAskAmount.trim() as Token)
    if (nextAskAmount && askPrice) {
      setOfferAmount(
        UTIL.toBn(nextAskAmount).dividedBy(askPrice).dp(6).toString(10) as Token
      )
    } else {
      setOfferAmount('' as Token)
    }
  }

  const updateAskPrice = async (nextAskPrice: Token): Promise<void> => {
    setAskPrice(nextAskPrice.trim() as Token)
    if (askAmount && nextAskPrice) {
      setOfferAmount(
        UTIL.toBn(askAmount).dividedBy(nextAskPrice).dp(6).toString(10) as Token
      )
    }
  }

  const submitErrMsg = useMemo(() => {
    let msg = ''

    if (fee) {
      let availableUusd = UTIL.toBn(uusdBal)

      if (offerContractOrDenom === TokenDenomEnum.uusd) {
        availableUusd = availableUusd.minus(UTIL.microfy(askAmount))
      }

      msg = validateFee({
        availableUusd: availableUusd.toFixed(0) as uUST,
        fee,
      })
    }

    return msg
  }, [fee, askAmount])

  const onClickLimitOrderSell = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateOfferAmount('' as Token)
    setAskPrice(askTokenPrice as Token)
  }

  useEffect(() => {
    initForm()
  }, [pairContract, askTokenPrice])

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    offerContractOrDenom,
    askDenom,
    offerTokenSymbol,
    askTokenSymbol,

    askAmount,
    updateAskAmount,
    askAmountErrMsg,

    offerAmount,
    updateOfferAmount,
    offerAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    feeToken,
    feeTokenAmount,
    setFeeTokenAmount,
    feeTokenAmountErrMsg,

    fee,
    onClickLimitOrderSell,
    invalidForm,
    submitErrMsg,
  }
}

export default useLimitOrderSell
