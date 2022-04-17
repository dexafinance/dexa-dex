import { ReactElement, useState } from 'react'
// import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'

// import { COLOR, UTIL } from 'consts'
import { WHITELIST } from 'consts'
import { COLOR } from 'consts'

import { View } from 'components'
// import { Card, FormText, View, DatePicker, FormInput, Row } from 'components'
// import { Card } from 'components'
import { ContractAddr, TokenKeyEnum, TokenType } from 'types'
// import { ContractAddr, Token, uLP } from 'types'
import useAnalyticsCandle from 'hooks/common/home/useAnalyticsCandle'

// import { createChart } from 'lightweight-charts'
import Chart from 'kaktana-react-lightweight-charts'

const StyledChart = styled(View)`
  display: flex;
  border: 1px solid ${COLOR.gray._300};
  border-radius: 8px;
  min-height: 250px;
  overflow: hidden;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  background-color: ${COLOR.white};
  z-index: 0;
`

const AnalyticsCandle = ({
  token,
  pairContract,
  tradeBase,
}: {
  token: TokenType
  pairContract: ContractAddr
  tradeBase: TokenKeyEnum
}): ReactElement => {
  const baseContractOrDenom: ContractAddr = WHITELIST.tokenInfo[tradeBase]
    .contractOrDenom as ContractAddr

  const [options] = useState({
    alignLabels: true,
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
  const { analyticsList } = useAnalyticsCandle({
    pairContract,
    baseContractOrDenom,
    otherContractOrDenom: token.contractOrDenom as ContractAddr,
  })

  if (analyticsList.length < 1) {
    return <StyledChart></StyledChart>
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
