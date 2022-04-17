import _ from 'lodash'
import { useMemo } from 'react'

import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  limitOrder,
  ContractAddr,
  uToken,
  TokenDenomEnum,
  TradeTypeEnum,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type ExtractLimitOrdersType = {
  orderId: number
  feeAmount: uToken
  offerAmount: uToken
  askAmount: uToken
  unitPrice: number
  action: string
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  hasOwnBidding: boolean
}

export type UseOrderInfoReturn = {
  sellOrders: ExtractLimitOrdersType[]
  buyOrders: ExtractLimitOrdersType[]
  precision: number
  refetch: () => void
}

// return buy / sell orders for pairContract
const useAllOrders = ({
  limitOrderContract,
  bidderAddr,
  pairContract,
  unitTokenOrDenom,
}: {
  limitOrderContract: ContractAddr
  bidderAddr: string
  pairContract: ContractAddr
  unitTokenOrDenom: ContractAddr | TokenDenomEnum
}): UseOrderInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [
      QueryKeyEnum.LIMIT_ORDER_ALL_ORDERS,
      limitOrderContract,
      bidderAddr,
      pairContract,
    ],
    () =>
      wasmFetch<limitOrder.Orders, limitOrder.OrdersResponse>({
        contract: limitOrderContract,
        msg: {
          orders: {
            //bidder_addr: bidderAddr,
          },
        },
      }),

    {
      enabled: !!limitOrderContract && !!pairContract,
    }
  )

  let { sellOrders, buyOrders, precision } = useMemo(() => {
    // sort price in descending order similar to trading list

    const orders = _.map(
      data?.orders.filter((x) => x.pair_addr === pairContract),
      (item) => {
        const offerContractOrDenom =
          'token' in item.offer_asset.info
            ? item.offer_asset.info.token.contract_addr
            : item.offer_asset.info.native_token.denom
        const askContractOrDenom =
          'token' in item.ask_asset.info
            ? item.ask_asset.info.token.contract_addr
            : item.ask_asset.info.native_token.denom

        return {
          orderId: item.order_id,
          feeAmount: item.fee_amount,
          offerAmount: item.offer_asset.amount,
          askAmount: item.ask_asset.amount,
          unitPrice:
            offerContractOrDenom === unitTokenOrDenom
              ? +item.offer_asset.amount / +item.ask_asset.amount
              : +item.ask_asset.amount / +item.offer_asset.amount,
          action:
            offerContractOrDenom === unitTokenOrDenom
              ? TradeTypeEnum.buy
              : TradeTypeEnum.sell,
          offerContractOrDenom,
          askContractOrDenom,
          hasOwnBidding: item.bidder_addr === bidderAddr,
        } as ExtractLimitOrdersType
      }
    ).sort((a, b) => b.unitPrice - a.unitPrice)

    let precision = 2
    const minPrice = orders && orders.length > 0 ? orders[0].unitPrice : 10
    if (minPrice >= 20) precision = 2
    else if (minPrice >= 10) precision = 3
    else if (minPrice >= 0.1) precision = 4
    else precision = 6

    // aggregate orders with same price
    // price step and precision
    let sellIndex = -1
    let sellOrders: ExtractLimitOrdersType[] = []

    let buyIndex = -1
    let buyOrders: ExtractLimitOrdersType[] = []

    orders.forEach((o) => {
      if (o.action === TradeTypeEnum.sell) {
        if (sellIndex === -1) {
          sellOrders.push(o)
          sellIndex = 0
        } else {
          if (
            o.unitPrice.toFixed(precision) ===
            sellOrders[sellIndex].unitPrice.toFixed(precision)
          ) {
            sellOrders[sellIndex].offerAmount = (
              +sellOrders[sellIndex].offerAmount + +o.offerAmount
            ).toString() as uToken
            sellOrders[sellIndex].askAmount = (
              +sellOrders[sellIndex].askAmount + +o.askAmount
            ).toString() as uToken
          }
        }
      } else if (o.action === TradeTypeEnum.buy) {
        if (buyIndex === -1) {
          buyOrders.push(o)
          buyIndex = 0
        } else {
          if (
            o.unitPrice.toFixed(precision) ===
            buyOrders[buyIndex].unitPrice.toFixed(precision)
          ) {
            buyOrders[buyIndex].askAmount = (
              +buyOrders[buyIndex].askAmount + +o.askAmount
            ).toString() as uToken
            buyOrders[buyIndex].offerAmount = (
              +buyOrders[buyIndex].offerAmount + +o.offerAmount
            ).toString() as uToken
          } else {
            buyOrders.push(o)
            buyIndex++
          }
        }
      }
    })

    return {
      sellOrders: sellOrders,
      buyOrders: buyOrders,
      precision,
    }

    // sort by unitPrice descending
    // sort by unitPrice descending
  }, [data])

  return { buyOrders, sellOrders, precision, refetch }
}

export default useAllOrders
