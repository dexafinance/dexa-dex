import _ from 'lodash'

import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  terraswap,
  uToken,
  ContractAddr,
  TokenDenomEnum,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useSimulate from '../token/useSimulate'
import { ExtractPoolResponseType, poolResponseParser } from 'logics/pool'
import useNetwork from 'hooks/common/useNetwork'

export type UsePoolReturn = {
  poolInfoList: {
    symbol: string
    otherSymbol: string
    poolInfo: ExtractPoolResponseType
  }[]
  refetch: () => void
}

const usePoolList = ({
  pairTypeList,
}: {
  pairTypeList: {
    symbol: string
    pairContract: ContractAddr
    token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
  }[]
}): UsePoolReturn => {
  const { simulate } = useSimulate()
  const { wasmFetch } = useLCD()
  const { contractOrDenomMap, tokenInfo } = useNetwork()
  const { data: poolInfoList = [], refetch } = useReactQuery(
    [QueryKeyEnum.POOL, pairTypeList],
    async () => {
      return Promise.all(
        _.map(pairTypeList, async (item) => {
          const poolResponse = await wasmFetch<
            terraswap.Pool,
            terraswap.PoolResponse<uToken>
          >({
            contract: item.pairContract,
            msg: { pool: {} },
          })

          const poolInfo = await poolResponseParser({
            poolResponse,
            pairContract: item.pairContract,
            simulate,
            token_0_ContractOrDenom: item.token_0_ContractOrDenom,
          })

          return {
            symbol: item.symbol,
            otherSymbol:
              tokenInfo[contractOrDenomMap[poolInfo.token_1_ContractOrDenom]]
                .symbol,
            poolInfo,
          }
        })
      )
    },
    {
      enabled: pairTypeList.length > 0,
    }
  )

  return { poolInfoList, refetch }
}

export default usePoolList
