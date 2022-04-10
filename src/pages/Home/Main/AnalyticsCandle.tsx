import { ReactElement, useState } from 'react'
// import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
// import { Line } from 'react-chartjs-2'
// import { ChartData, ChartOptions } from 'chart.js'
// import _ from 'lodash'
// import moment from 'moment'
// import Select from 'react-select'

// import { COLOR, UTIL } from 'consts'
import { WHITELIST } from 'consts'
import { COLOR } from 'consts'

import { View } from 'components'
// import { Card, FormText, View, DatePicker, FormInput, Row } from 'components'
// import { Card } from 'components'
import { ContractAddr, TokenKeyEnum } from 'types'
// import { ContractAddr, Token, uLP } from 'types'
import useAnalyticsCandle from 'hooks/common/home/useAnalyticsCandle'
// import useNetwork from 'hooks/common/useNetwork'
// import usePool from 'hooks/query/pair/usePool'
// import { LpLpSimulation } from 'logics/lpSimulator'

// import { createChart } from 'lightweight-charts'
import Chart from 'kaktana-react-lightweight-charts'

// const StyledContainer = styled(Card)``

const StyledChart = styled(View)`
  display: flex;
  border: 1px solid ${COLOR.gray._300};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  background-color: ${COLOR.white};
  z-index: 0;
`

// const StyledSettingBox = styled(View)`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   column-gap: 10px;
// `

// const MyResponsiveLine = ({
//   data,
//   returnTypeSymbol,
// }: {
//   data: ChartData
//   returnTypeSymbol: string
// }): ReactElement => {
//   const options: ChartOptions = {
//     aspectRatio: 3,
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       'left-y': {
//         type: 'linear',
//         position: 'left',
//         ticks: {
//           callback: (value): string =>
//             `${UTIL.formatAmount(UTIL.microfy(value as Token), {
//               abbreviate: true,
//               toFix: 2,
//             })}${returnTypeSymbol}`,
//         },
//       },
//       'right-y': {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           callback: (value): string =>
//             `${UTIL.toBn(value).dp(2).toString(10)}%`,
//         },
//       },
//     },
//     interaction: {
//       mode: 'index',
//       axis: 'xy',
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         intersect: false,
//         callbacks: {
//           label: (tooltipItems: any): string => {
//             const suffix = [0, 1].includes(tooltipItems.datasetIndex)
//               ? returnTypeSymbol
//               : '%'
//             return `${tooltipItems.dataset.label} : ${tooltipItems.formattedValue}${suffix}`
//           },
//         },
//       },
//     },
//   }

//   return <Line data={data} options={options} />
// }

// const SimulateLpAmount = ({
//   inputLp,
//   pairContract,
//   token_0_ContractOrDenom,
//   token_0_Symbol,
//   token_1_Symbol,
// }: {
//   inputLp: uLP
//   pairContract: ContractAddr
//   token_0_ContractOrDenom: ContractAddr
//   token_0_Symbol?: string
//   token_1_Symbol?: string
// }): ReactElement => {
//   const { poolInfo } = usePool({
//     pairContract,
//     token_0_ContractOrDenom,
//   })

//   const simulated =
//     poolInfo &&
//     LpLpSimulation({
//       poolInfo,
//       ulp: inputLp as uLP,
//       userLpBalance: inputLp as uLP,
//     })

//   const formatLp = UTIL.formatAmount(inputLp)
//   const formatToken_0 = UTIL.formatAmount(
//     UTIL.microfy(simulated?.token_0_Amount || ('0' as Token))
//   )
//   const formatToken_1 = UTIL.formatAmount(
//     UTIL.microfy(simulated?.token_1_Amount || ('0' as Token))
//   )

//   return (
//     <Row style={{ paddingTop: 5, paddingBottom: 10 }}>
//       <FormText fontType="R14">
//         {`${formatLp} LP ≒ ( ${formatToken_0} ${token_0_Symbol} + ${formatToken_1} ${token_1_Symbol} )`}
//       </FormText>
//     </Row>
//   )
// }

const AnalyticsCandle = ({
  pairContract,
  tradeBase,
}: {
  pairContract: ContractAddr
  tradeBase: TokenKeyEnum
}): ReactElement => {
  const baseContractOrDenom: ContractAddr = WHITELIST.tokenInfo[tradeBase]
    .contractOrDenom as ContractAddr

  // console.log('tradeBase', tradeBase, baseContractOrDenom)

  // const { getSymbolByContractOrDenom } = useNetwork()
  const [options] = useState({
    alignLabels: true,
    // wickVisible: true,
    // upColor: 'green',
    // downColor: 'red',
    // margins: {
    //   above: 10,
    //   below: 10,
    // },
    timeScale: {
      rightOffset: 12,
      barSpacing: 24,
      minBarSpacing: 4,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#fff000',
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
    autoscaleInfoProvider: () => ({
      // priceRange: {
      //   minValue: 0,
      //   maxValue: 100,
      // },
      margins: {
        above: 10,
        below: 10,
      },
    }),
  })
  const {
    analyticsList,
    // inputValue,
    // setInputValue,
    // from,
    // setFrom,
    // to,
    // setTo,
    // token_0_ContractOrDenom,
    // token_1_ContractOrDenom,
    // returnTokenType,
    // setReturnTokenType,
  } = useAnalyticsCandle({ pairContract, baseContractOrDenom })

  // const token_0_Symbol =
  //   token_0_ContractOrDenom &&
  //   getSymbolByContractOrDenom(token_0_ContractOrDenom)
  // const token_1_Symbol =
  //   token_1_ContractOrDenom &&
  //   getSymbolByContractOrDenom(token_1_ContractOrDenom)

  // const options = [
  //   {
  //     value: '0',
  //     label: token_0_Symbol,
  //   },
  //   {
  //     value: '1',
  //     label: token_1_Symbol,
  //   },
  // ]

  // const data: ChartData = useMemo(() => {
  //   return {
  //     labels: _.map(analyticsList, (item) =>
  //       moment.unix(item.timestamp).format('YYYY.MM.DD')
  //     ),
  //     datasets: [
  //       {
  //         label: `${token_0_Symbol}-${token_1_Symbol} Hold Value`,
  //         data: _.map(analyticsList, (item) =>
  //           UTIL.toBn(item.holdValue).dp(2).toNumber()
  //         ),
  //         borderColor: COLOR.rainbow.red,
  //         backgroundColor: COLOR.rainbow.red,
  //         yAxisID: 'left-y',
  //       },
  //       {
  //         label: `${token_0_Symbol}-${token_1_Symbol} Pool Value`,
  //         data: _.map(analyticsList, (item) =>
  //           UTIL.toBn(item.poolValue).dp(2).toNumber()
  //         ),
  //         borderColor: COLOR.rainbow.orang,
  //         backgroundColor: COLOR.rainbow.orang,
  //         yAxisID: 'left-y',
  //       },
  //       {
  //         label: 'Impermanent Gain/Loss',
  //         data: _.map(analyticsList, (item) =>
  //           UTIL.toBn(item.impermanentLossOrGain)
  //             .multipliedBy(100)
  //             .dp(3)
  //             .toNumber()
  //         ),
  //         borderColor: COLOR.rainbow.green,
  //         backgroundColor: COLOR.rainbow.green,
  //         yAxisID: 'right-y',
  //       },
  //     ],
  //   }
  // }, [analyticsList])

  if (analyticsList.length < 1) {
    return <View />
  }

  // ;[
  //   {
  //     data: [
  //       {
  //         time: 1529899200,
  //         open: 180.34,
  //         high: 180.99,
  //         low: 178.57,
  //         close: 179.85,
  //       },
  //       {
  //         time: 1529899200 + 60 * 1000,
  //         open: 180.82,
  //         high: 181.4,
  //         low: 177.56,
  //         close: 178.75,
  //       },
  //       {
  //         time: 1529899200 + 2 * 60 * 1000,
  //         open: 175.77,
  //         high: 179.49,
  //         low: 175.44,
  //         close: 178.53,
  //       },
  //       {
  //         time: 1529899200 + 3 * 60 * 1000,
  //         open: 178.58,
  //         high: 182.37,
  //         low: 176.31,
  //         close: 176.97,
  //       },
  //       {
  //         time: 1529899200 + 4 * 60 * 1000,
  //         open: 177.52,
  //         high: 180.5,
  //         low: 176.83,
  //         close: 179.07,
  //       },
  //       {
  //         time: 1529899200 + 5 * 60 * 1000,
  //         open: 176.88,
  //         high: 177.34,
  //         low: 170.91,
  //         close: 172.23,
  //       },
  //       {
  //         time: 1529899200 + 6 * 60 * 1000,
  //         open: 173.74,
  //         high: 175.99,
  //         low: 170.95,
  //         close: 173.2,
  //       },
  //       {
  //         time: 1529899200 + 7 * 60 * 1000,
  //         open: 173.16,
  //         high: 176.43,
  //         low: 172.64,
  //         close: 176.24,
  //       },
  //       {
  //         time: 1529899200 + 8 * 60 * 1000,
  //         open: 177.98,
  //         high: 178.85,
  //         low: 175.59,
  //         close: 175.88,
  //       },
  //       {
  //         time: 1529899200 + 9 * 60 * 1000,
  //         open: 176.84,
  //         high: 180.86,
  //         low: 175.9,
  //         close: 180.46,
  //       },
  //       {
  //         time: 1529899200 + 10 * 60 * 1000,
  //         open: 182.47,
  //         high: 183.01,
  //         low: 177.39,
  //         close: 179.93,
  //       },
  //       {
  //         time: 1529899200 + 11 * 60 * 1000,
  //         open: 181.02,
  //         high: 182.41,
  //         low: 179.3,
  //         close: 182.19,
  //       },
  //     ],
  //   },
  // ]

  // console.log('analyticsList', options, analyticsList)

  return (
    // <StyledContainer>
    <StyledChart>
      <Chart
        options={options}
        candlestickSeries={[{ data: analyticsList }]}
        autoWidth
        height={320}
      />
    </StyledChart>
    // </StyledContainer>
  )
}

export default AnalyticsCandle
