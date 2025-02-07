import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  Token,
  uToken,
  uUST,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
  TradeTypeEnum,
} from 'types'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'

import { validateFee } from 'logics/validator'
import useNetwork from '../useNetwork'
import usePool from 'hooks/query/pair/usePool'
import useOrders from 'hooks/query/limitOrder/useOrders'
import _ from 'lodash'

export type UseMyOrderReturn = {
  askTokenPrice: Token
  forBuyDenom: ContractAddr | TokenDenomEnum
  toBuyContractOrDenom: ContractAddr | TokenDenomEnum
  tokenForBuySymbol: string
  tokenToBuySymbol: string

  setOrderId: (value: number) => void
  limitOrderList: {
    orderId: number
    pairContract: ContractAddr
    type: TradeTypeEnum
    price: Token
    toBuyAmount: uToken
    toSellAmount: uToken
    offerContractOrDenom: ContractAddr | TokenDenomEnum
    askContractOrDenom: ContractAddr | TokenDenomEnum
    totalLoop: number
    remainingLoop: number
  }[]

  fee?: Fee

  invalidForm: boolean
  submitErrMsg: string
}

const useMyOrder = ({
  forBuyDenom,
  toBuyContractOrDenom,
  tokenForBuySymbol,
  tokenToBuySymbol,
  pairContract,
}: {
  forBuyDenom: ContractAddr | TokenDenomEnum
  toBuyContractOrDenom: ContractAddr | TokenDenomEnum
  tokenForBuySymbol: string
  tokenToBuySymbol: string
  pairContract: ContractAddr
}): UseMyOrderReturn => {
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { getCancelOrderMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()
  const { limitOrder, tokenInfo, pairContractMap } = useNetwork()

  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: toBuyContractOrDenom,
  })

  const askTokenPrice = UTIL.toBn(poolInfo?.token_0_Price)
    .dp(6)
    .toString(10) as Token

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const { orders, refetch } = useOrders({
    limitOrderContract: limitOrder,
    bidderAddr: walletAddress,
    // pairContract,
  })

  const limitOrderList = useMemo(() => {
    return _.map(orders, (item) => {
      // console.log(
      //   'debug',
      //   item,
      //   item.offerContractOrDenom,
      //   item.pairContract,
      //   pairContractMap[item.pairContract]
      // )
      const type =
        item.offerContractOrDenom ===
        tokenInfo[pairContractMap[item.pairContract].base].contractOrDenom
          ? TradeTypeEnum.buy
          : TradeTypeEnum.sell
      const price =
        type === TradeTypeEnum.buy
          ? (UTIL.toBn(item.offerAmount)
              .div(item.askAmount)
              .toString(10) as Token)
          : (UTIL.toBn(item.askAmount)
              .div(item.offerAmount)
              .toString(10) as Token)
      return {
        orderId: item.orderId,
        pairContract: item.pairContract,
        type,
        price,
        toBuyAmount:
          type === TradeTypeEnum.buy ? item.askAmount : item.offerAmount,
        toSellAmount:
          type === TradeTypeEnum.buy ? item.offerAmount : item.askAmount,
        offerContractOrDenom: item.offerContractOrDenom,
        askContractOrDenom: item.askContractOrDenom,
        totalLoop: item.totalLoop,
        remainingLoop: item.remainingLoop,
      }
    })
  }, [orders])

  const [orderId, setOrderId] = useState<number>()

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST || Number.isNaN(orderId)

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (orderId !== undefined) {
      msgs = getCancelOrderMsgs({
        limitOrderContract: limitOrder,
        orderId,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, orderId])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const submitErrMsg = useMemo(() => {
    let msg = ''

    if (fee) {
      let availableUusd = UTIL.toBn(uusdBal)

      msg = validateFee({
        availableUusd: availableUusd.toFixed(0) as uUST,
        fee,
      })
    }

    return msg
  }, [fee])

  useEffect(() => {
    if (Number.isInteger(orderId) && fee) {
      postTx({ txOptions: { ...txOptions, fee } })
    }
  }, [orderId, fee])

  const initForm = (): void => {
    refetch()
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
    if (!!walletAddress) {
      const interval = setInterval(() => {
        refetch()
      }, 3000)
      return (): void => clearInterval(interval)
    }
  }, [walletAddress, postTxResult.status])

  return {
    askTokenPrice,
    forBuyDenom,
    toBuyContractOrDenom,
    tokenForBuySymbol,
    tokenToBuySymbol,

    limitOrderList,

    setOrderId,

    fee,
    invalidForm,
    submitErrMsg,
  }
}

export default useMyOrder
