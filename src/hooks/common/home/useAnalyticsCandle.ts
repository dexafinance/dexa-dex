import useTokenPairHistory from 'hooks/query/token/useCwTransactions'
import { ContractAddr } from 'types'
import { useMemo } from 'react'
// import moment, {Moment} from 'moment'
import moment from 'moment'

export type TxCandleStick = {
  // timestamp: Moment
  // time: Moment
  time: number
  open: number
  high: number
  low: number
  close: number
  //unitPrice: number
  // volume: number,
}

export type UseAnalyticsCandleReturn = {
  analyticsList: TxCandleStick[]
}

const useAnalyticsCandle = ({
  pairContract,
  baseContractOrDenom,
  otherContractOrDenom,
}: {
  pairContract: ContractAddr
  baseContractOrDenom: ContractAddr
  otherContractOrDenom: ContractAddr
}): UseAnalyticsCandleReturn => {
  // const [inputValue, setInputValue] = useState<string>('1')
  // const [from, setFrom] = useState<number>(moment().subtract(2, 'month').unix())
  // const [to, setTo] = useState<number>(moment().unix())
  // const [returnTokenType, setReturnTokenType] = useState('0')
  // const { pair } = useTokenPairHistory({ to, from, pairContract })
  const { txList } = useTokenPairHistory({
    tokenPairContract: pairContract,
    baseContractOrDenom,
    otherContractOrDenom,
    offset: 0,
    limit: 100,
  })

  //   candlestickSeries.setData([
  //     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
  //     { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
  //     { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
  //     { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
  //     { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
  //     { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
  //     { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
  //     { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
  //     { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
  //     { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
  // ]);

  // default time range 15 minutes, will add option or 1h, 4h
  // timestamp, unitPrice
  // time: '2018-12-31 00:00:00'
  // time: '2018-12-31 00:15:00'
  // 15 minutes
  const candleTimespan = 1
  const analyticsList: TxCandleStick[] = useMemo(() => {
    if (txList && txList.length > 0) {
      let candlestickSeries: TxCandleStick[] = []
      const historicalData = txList.sort((a, b) =>
        a.timestamp > b.timestamp ? 1 : -1
      )
      // console.log('txList', txList, baseContractOrDenom)
      // valueOf = number of milliseconds since epoch
      // let lastCandleIndex = 0
      let currentCandleTime =
        (moment().utcOffset() +
          historicalData[0].timestamp.valueOf() /
            (candleTimespan * 1000 * 60)) |
        0
      let currentCandle: TxCandleStick = {
        // multiply back to round to candle blocks
        time: currentCandleTime * candleTimespan * 60,
        open: historicalData[0].unitPrice,
        high: historicalData[0].unitPrice,
        low: historicalData[0].unitPrice,
        close: historicalData[0].unitPrice,
      }

      // candlestickSeries.push(currentCandle)

      // mod ...
      historicalData.forEach((tx) => {
        let candleTime =
          (moment().utcOffset() +
            tx.timestamp.valueOf() / (candleTimespan * 1000 * 60)) |
          0
        const missingCandles = candleTime - currentCandleTime
        if (missingCandles === 0) {
          // current
          currentCandle = {
            ...currentCandle,
            low:
              currentCandle.low > tx.unitPrice
                ? tx.unitPrice
                : currentCandle.low,
            high:
              currentCandle.high < tx.unitPrice
                ? tx.unitPrice
                : currentCandle.high,
            close: tx.unitPrice,
          }
        } else {
          // fill missing
          // prepare for next candle
          // clone previous candle to keep the line continuous (or just put empty candle there)
          // for (let i: number = 0; i < missingCandles - 1; i++) {
          //   candlestickSeries.push(currentCandle)
          // }
          // push previous candle
          candlestickSeries.push(currentCandle)

          currentCandle = {
            time: candleTime * candleTimespan * 60,
            open: tx.unitPrice,
            high: tx.unitPrice,
            low: tx.unitPrice,
            close: tx.unitPrice,
          }
          currentCandleTime = candleTime
        }
      })
      // push last candle
      candlestickSeries.push(currentCandle)

      return candlestickSeries
    }

    return []
  }, [txList])
  // }, [pair, returnTokenType, inputValue])

  return {
    analyticsList,
    // token_0_ContractOrDenom: pair?.token0.tokenAddress as ContractAddr,
    // token_1_ContractOrDenom: pair?.token1.tokenAddress as ContractAddr,
    // inputValue,
    // setInputValue,
    // from,
    // setFrom,
    // to,
    // setTo,
    // returnTokenType,
    // setReturnTokenType,
  }
}

export default useAnalyticsCandle
