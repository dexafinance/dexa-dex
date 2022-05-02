import { useMemo } from 'react'
import _ from 'lodash'

import { UTIL } from 'consts'

import useNetwork from '../useNetwork'
import usePoolList from 'hooks/query/pair/usePoolList'
import { TokenType, PairType } from 'types'
import { ExtractPoolResponseType } from 'logics/pool'

export enum SortTypeEnum {
  name = 'name',
  price = 'price',
  poolSize = 'poolSize',
}

export type SortedTokenPairType = {
  token: PairType
  poolInfo?: ExtractPoolResponseType
}

export type UseTokenPairListReturn = {
  sortedList: SortedTokenPairType[]
  refetch: () => void
}

const useTokenPairsList = (token: TokenType): UseTokenPairListReturn => {
  const { isMainnet, tokenInfo } = useNetwork()

  const { poolInfoList, refetch } = usePoolList({
    pairTypeList: token.pairList.map((x) => {
      return {
        symbol: tokenInfo[x.base].symbol,
        pairContract: x.pair,
        token_0_ContractOrDenom: tokenInfo[x.base].contractOrDenom,
      }
    }),
  })

  const poolInfoListWithHistory = useMemo(() => {
    if (false === isMainnet || poolInfoList.length > 0) {
      return _.map(token.pairList, (token) => {
        const symbol = tokenInfo[token.base].symbol

        const poolInfo = poolInfoList.find(
          (x) =>
            x.symbol === symbol &&
            x.otherSymbol === tokenInfo[token.otherToken].symbol &&
            x.poolInfo.pairContract === token.pair
        )?.poolInfo

        return { token, poolInfo }
      })
    }
    return []
  }, [poolInfoList])

  const sortedList = useMemo(() => {
    const sortDesc = true
    return poolInfoListWithHistory.sort((a, b) => {
      if (
        UTIL.toBn(a.poolInfo?.token_1_PoolSize).gt(
          b.poolInfo?.token_1_PoolSize || 0
        )
      ) {
        return sortDesc ? -1 : 1
      }
      return sortDesc ? 1 : -1
    })
  }, [poolInfoListWithHistory])

  return {
    sortedList,
    refetch,
  }
}

export default useTokenPairsList
