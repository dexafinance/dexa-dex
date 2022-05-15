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
  pairContract: ContractAddr
  feeAmount: uToken
  offerAmount: uToken
  askAmount: uToken
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  action: TradeTypeEnum
  totalLoop: number
  remainingLoop: number
}

export type UseTokenInfoReturn = {
  orders: ExtractLimitOrdersType[]
  refetch: () => void
}

const useOrders = ({
  limitOrderContract,
  bidderAddr,
}: // pairContract,
{
  limitOrderContract: ContractAddr
  bidderAddr: string
  // pairContract: ContractAddr
}): UseTokenInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [
      QueryKeyEnum.LIMIT_ORDER_ORDERS,
      limitOrderContract,
      bidderAddr,
      // pairContract,
    ],
    () =>
      wasmFetch<limitOrder.Orders, limitOrder.OrdersResponse>({
        contract: limitOrderContract,
        msg: {
          orders: {
            bidder_addr: bidderAddr,
          },
        },
      }),

    {
      enabled: !!limitOrderContract && !!bidderAddr,
    }
  )

  const orders = useMemo(() => {
    return _.map(
      // filter((x) => x.pair_addr === pairContract)
      data?.orders,
      (item) => {
        const offerContractOrDenom =
          _.get(item.offer_asset.info, 'token.contract_addr') ||
          _.get(item.offer_asset.info, 'native_token.denom')

        const askContractOrDenom =
          _.get(item.ask_asset.info, 'token.contract_addr') ||
          _.get(item.ask_asset.info, 'native_token.denom')

        return {
          orderId: item.order_id,
          pairContract: item.pair_addr,
          feeAmount: item.fee_amount,
          offerAmount: item.offer_asset.amount,
          askAmount: item.ask_asset.amount,
          offerContractOrDenom,
          askContractOrDenom,
          totalLoop: item.recurring?.total_loop || 0,
          remainingLoop: item.recurring?.remaining_loop || 0,
        } as ExtractLimitOrdersType
      }
    )
  }, [data])

  return { orders, refetch }
}

export default useOrders
