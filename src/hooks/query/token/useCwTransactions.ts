import { useMemo } from 'react'
import axios from 'axios'
// import _ from 'lodash'
import moment, { Moment } from 'moment'
import {
  LogFinderAmountResult,
  getTxAmounts,
  createLogMatcherForAmounts,
  LogFindersAmountRuleSet,
  //   LogFindersActionRuleSet,
  //   LogFindersAmountRuleSet,
} from '@terra-money/log-finder-ruleset'

import { TradeTypeEnum } from 'types'

import {
  //   createActionRuleSet,
  createAmountRuleSet,
} from '@terra-money/log-finder-ruleset'

// import { addressTokenMap } from 'consts/whitelist'

// export declare const createAmountRuleSet: () => import('./types').LogFindersAmountRuleSet[]

import { splitCoinData } from 'scripts/utility'
import { plus } from 'scripts/math'

// import { APIURL, UTIL } from 'consts'

import { ContractAddr, QueryKeyEnum } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useNetwork from 'hooks/common/useNetwork'
import { Coin } from '@terra-money/terra.js'

export type TxsHistoryType = {
  timestamp: Moment
  txhash: string
  action: string
  //   uusd: uUST
  //   uCW20: uCW20
  amountIn: Coin
  amountOut: Coin
  unitPrice: number
}

export type UseCw20HistoryReturn = {
  txList: TxsHistoryType[]
}

// type Cw20FetchResponseType = {
//   pair: {
//     token0: {
//       symbol: string
//     }
//     token1: {
//       symbol: string
//     }
//     next: number
//     txs: TxResponse[]
//   }
// }

// type FetchResponseType = {
//   pair: {
//     token0: {
//       symbol: string
//     }
//     token1: {
//       symbol: string
//     }
//     transactions: {
//       timestamp: number
//       txHash: string
//       action: string
//       token0Amount: string
//       token1Amount: string
//     }[]
//   }
// }

// type Fee = {
//   denom: string
//   amount: string
// }

// const getTxFee = (prop: Fee) =>
//   prop && `${format.amount(prop.amount)} ${format.denom(prop.denom)}`

const getRenderAmount = (
  amountList: string[] | undefined,
  amountArray: Coin[]
): void => {
  amountList?.forEach((amount) => {
    const coin = splitCoinData(amount.trim())
    // console.log('coin', coin)
    if (coin) {
      const { amount, denom } = coin

      //   const element = <Coin amount={amount} denom={denom} />

      // amountArray.push(new Coin(addressTokenMap[denom], +amount))
      amountArray.push(new Coin(denom, +amount))
    }
  })
}

const getMultiSendAmount = (
  matchedLogs: LogFinderAmountResult[],
  address: string,
  amountIn: Coin[],
  amountOut: Coin[]
): void => {
  const amountInMap = new Map<string, string>()
  const amountOutMap = new Map<string, string>()

  matchedLogs.forEach((log) => {
    const recipient = log.match[0].value
    const coin = log.match[1].value.split(',').map(splitCoinData)

    coin.forEach((data) => {
      if (data) {
        const { amount, denom } = data
        const amountInStack = amountInMap.get(denom)
        const amountOutStack = amountOutMap.get(denom)

        const inStack = amountInStack ? plus(amountInStack, amount) : amount
        const outStack = amountOutStack ? plus(amountOutStack, amount) : amount

        if (recipient === address) {
          amountInMap.set(denom, inStack)
        } else {
          amountOutMap.set(denom, outStack)
        }
      }
    })
  })

  amountInMap.forEach((amount, denom) => amountIn.push(new Coin(amount, denom)))

  amountOutMap.forEach((amount, denom) =>
    amountOut.push(new Coin(amount, denom))
  )
}

const getAmount = (
  address: string,
  matchedMsg?: LogFinderAmountResult[][]
): [Coin[], Coin[]] => {
  const amountIn: Coin[] = []
  const amountOut: Coin[] = []
  matchedMsg?.forEach((matchedLog) => {
    if (matchedLog && matchedLog[0]?.transformed?.type === 'multiSend') {
      getMultiSendAmount(matchedLog, address, amountIn, amountOut)
    } else {
      matchedLog?.forEach((log) => {
        const amounts = log.transformed?.amount?.split(',')
        const sender = log.transformed?.sender
        const recipient = log.transformed?.recipient

        // console.log('getAmount', 'address', address, 'sender', sender)
        if (address === sender) {
          getRenderAmount(amounts, amountOut)
        }

        if (address === recipient) {
          getRenderAmount(amounts, amountIn)
        }
      })
    }
  })

  //amount row limit
  return [amountIn.slice(0, 3), amountOut.slice(0, 3)]
}

const extractTxHistory = (
  //   data: FetchResponseType['pair']
  tokenPairContract: ContractAddr,
  baseContractOrDenom: ContractAddr,
  data: { next: number; txs: TxResponse[] }
): TxsHistoryType[] => {
  //   const isToken0Ust = pair.token0.symbol === 'uusd'

  //   const [txsRow, setTxsRow] = useState<JSX.Element[][]>([])

  let ruleArray: LogFindersAmountRuleSet[] = createAmountRuleSet()
  // only match logs against if ruleArray changed
  //   const logMatcher = (): any => createLogMatcherForAmounts(ruleArray)

  // console.log('ruleArray', ruleArray)

  //   const { chainId } = useNetwork()

  if (data?.txs) {
    let txRows: TxsHistoryType[] = []
    data.txs.forEach((tx) => {
      // console.log(tokenPairContract, 'tx', tx)
      const matchedLogs = getTxAmounts(
        JSON.stringify(tx),
        createLogMatcherForAmounts(ruleArray),
        tokenPairContract
      )

      // console.log('matchedLogs', matchedLogs)

      const [amountIn, amountOut] = getAmount(tokenPairContract!, matchedLogs)
      const isSuccess = !tx.code
      // skip LP providing transaction
      const isSwap =
        isSuccess &&
        amountIn.length > 0 &&
        amountOut.length > 0 &&
        amountIn[0].denom !== amountOut[0].denom
      if (isSwap) {
        // some tx are providing LP or withdrawing LP will only have one side withdraw / transfer
        // console.log('extractTxHistory', tx, amountIn, amountOut)
        let action = TradeTypeEnum.buy
        let unitPrice = +amountIn[0].amount / +amountOut[0].amount
        if (amountIn[0].denom === baseContractOrDenom) {
          action = TradeTypeEnum.buy
        } else {
          action = TradeTypeEnum.sell
          unitPrice = +amountOut[0].amount / +amountIn[0].amount
        }

        // execute_msg:
        // { send: {msg: 'eyJ3aXRoZHJhd19saXF1aWRpdHkiOnt9fQ==', amount: '4180000', contract: 'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552'} }
        if (unitPrice < 100) {
          console.log(
            'txList with invalid unitPrice',
            unitPrice,
            tx,
            'baseContractOrDenom',
            baseContractOrDenom,
            'amountIn',
            amountIn[0].amount.toFixed(3),
            amountIn,
            'amountOut',
            amountOut[0].amount.toFixed(3),
            amountOut
          )
        }

        txRows.push({
          txhash: tx.txhash,
          timestamp: moment(tx.timestamp),
          action,
          amountIn: amountIn[0],
          amountOut: amountOut[0],
          unitPrice,
        })
      }
      //   return getRow(tx, chainId, tokenPairContract, matchedLogs)
    })

    return txRows
    // setTxsRow((stack) => [...stack, ...txRow])
  }

  return []
}

const useTokenPairHistory = ({
  tokenPairContract,
  baseContractOrDenom,
  offset = 0,
  limit = 100,
}: {
  tokenPairContract: ContractAddr
  baseContractOrDenom: ContractAddr
  offset: number
  limit: number
}): UseCw20HistoryReturn => {
  const { lcd } = useNetwork()
  const fcd = lcd.replace('lcd', 'fcd')

  // console.log(
  //   'useTokenPairHistory',
  //   tokenPairContract,
  //   'baseContractOrDenom',
  //   baseContractOrDenom
  // )

  const { data } = useReactQuery(
    [QueryKeyEnum.TX_HISTORY, tokenPairContract],
    async () => {
      if (tokenPairContract) {
        // const { data, isLoading } = useFCD<{ next: number; txs: TxResponse[] }>(
        //   '/v1/txs',
        //   offset,
        //   100,
        //   address
        // )

        // const query = `query {
        //   pair(pairAddress:"${tokenPairContract}"){
        //     token0{
        //       symbol
        //     }
        //     token1{
        //       symbol
        //     }
        //     transactions(limit:10){
        //       timestamp
        //       txHash
        //       action
        //       token0Amount
        //       token1Amount
        //     }
        //   }
        // }`

        // const offset = 0
        // const limit = 100

        const fetchData = await axios.get<{ next: number; txs: TxResponse[] }>(
          fcd + '/v1/txs',
          { params: { offset, limit: limit, account: tokenPairContract } }
        )

        console.log('fetchData', fetchData)

        // if (fetchData?.data) {
        return fetchData?.data
        // }
      }
    }
  )

  // only run again if data changed
  const txList = useMemo(
    () =>
      data
        ? extractTxHistory(tokenPairContract!, baseContractOrDenom, data)
        : [],
    [data]
  )

  return {
    txList,
  }
}

export default useTokenPairHistory
