import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { IconExternalLink } from '@tabler/icons'
import _ from 'lodash'

import { SortTypeEnum } from 'hooks/common/home/useTokenList'

import { STYLE, UTIL, COLOR, WHITELIST } from 'consts'
// import { COLOR } from 'consts'

import { FormText, Row, LinkFinder, View, Card } from 'components'
import {
  ContractAddr,
  uToken,
  Token,
  TokenType,
  PairType,
  TradeTypeEnum,
} from 'types'
// import { ContractAddr, uToken  } from 'types'
// import useLayout from 'hooks/common/useLayout'
// import useTokenPairHistory from 'hooks/query/token/useCw20History'
import useTokenPairHistory from 'hooks/query/token/useCwTransactions'
import { Coin } from '@terra-money/terra.js'

// const StyledContainer = styled(Card)``

// const StyledTxInfoItem = styled(Row)`
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid ${COLOR.gray._100};
// `

const StyledCard = styled(Card)`
  min-width: 200px;
  @media ${STYLE.media.tablet} {
    width: fit-content;
  }
`

const StyledListHeader = styled(Row)`
  padding: 5px;
  margin-top: 8px;
  border-top: 1px solid ${COLOR.gray._600};
  border-bottom: 1px solid ${COLOR.gray._600};
`

const StyledTitle = styled(View)``

const StyledTokenItem = styled(View)`
  ${STYLE.clickable}
  padding:10px 0;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 8fr 8fr 8fr;
`

const StyledTokenItemBox = styled(View)`
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Title = ({
  title,
  sortBy,
  justifyContent,
}: {
  title: ReactNode
  sortBy: SortTypeEnum
  justifyContent?: string
}): ReactElement => {
  return (
    <StyledTitle style={{ flex: 1 }}>
      <Row
        style={{
          alignItems: 'flex-start',
          justifyContent: justifyContent
            ? justifyContent
            : sortBy === 'price'
            ? 'flex-end'
            : 'center',
        }}
      >
        {typeof title === 'string' ? (
          <FormText fontType="R14" color={COLOR.gray._600}>
            {title}
          </FormText>
        ) : (
          title
        )}
      </Row>
    </StyledTitle>
  )
}

const TxInfoNew = ({
  token,
  pairType,
}: {
  token: TokenType
  pairType: PairType
}): ReactElement => {
  const tradeBaseContract = WHITELIST.tokenInfo[pairType.base].contractOrDenom
  const pairContract = pairType.pair
  const { txList } = useTokenPairHistory({
    tokenPairContract: pairContract,
    baseContractOrDenom: tradeBaseContract as ContractAddr,
    otherContractOrDenom: token.contractOrDenom as ContractAddr,
    offset: 0,
    limit: 100,
  })
  // const { isTabletWidth } = useLayout()

  if (txList == null || txList.length < 1) {
    return <View />
  }
  return (
    <StyledCard>
      <View>
        <FormText fontType="B16">Market Trade</FormText>
      </View>
      <StyledListHeader>
        <Title
          title={`Tx`}
          justifyContent={`flex-start`}
          sortBy={SortTypeEnum.name}
        />
        <Title
          title={`Price`}
          justifyContent={`flex-start`}
          sortBy={SortTypeEnum.price}
        />
        <Title title={`Amount(${token.symbol})`} sortBy={SortTypeEnum.price} />
        <Title
          title={'Time'}
          justifyContent={`flex-end`}
          sortBy={SortTypeEnum.poolSize}
        />
      </StyledListHeader>
      <StyledTokenItemBox>
        {_.map(txList.slice(0, 10), (item, index) => {
          // const uusdBn = UTIL.toBn(item.uusd)
          // const isPositive = uusdBn.isPositive()
          // const isPositive = true
          // let action = 'BUY'
          // let amount: Coin = item.amountIn
          let forAmount: Coin = item.amountOut
          if (item.amountIn?.denom !== tradeBaseContract) {
            // Sell selected token
            // action = 'SELL'
            // amount = item.amountOut
            forAmount = item.amountIn
          }
          // console.log(
          //   'tx',
          //   UTIL.formatAmount(item.amountIn?.amount.toString() as uToken),
          //   item.amountIn?.denom,
          //   UTIL.formatAmount(item.amountOut?.amount.toString() as uToken),
          //   item.amountOut?.denom,
          //   action,
          //   amount
          // )
          // console.log('item.action', item.action)
          return (
            // <StyledTxInfoItem key={`txList-${index}`}>
            <StyledTokenItem key={`txList-${index}`}>
              <View style={{ alignItems: 'left' }}>
                <LinkFinder
                  type="tx"
                  address={item.txhash}
                  title={
                    <Row style={{ alignItems: 'baseline' }}>
                      <IconExternalLink size={12} style={{ paddingLeft: 3 }} />
                    </Row>
                  }
                />
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
              >
                <FormText
                  fontType="R14"
                  color={
                    item.action === TradeTypeEnum.buy
                      ? COLOR.success
                      : COLOR.primary._400
                  }
                >
                  {`${UTIL.formatAmount(
                    UTIL.microfy(
                      item.unitPrice.toString() as Token
                    ).toString() as uToken,
                    { toFix: 3 }
                  )}`}
                </FormText>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
              >
                <FormText fontType="R14">
                  {`${UTIL.formatAmount(
                    forAmount?.amount.toString() as uToken,
                    { toFix: 3 }
                  )}`}
                </FormText>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <FormText fontType="R14">
                  {item.timestamp.format('HH:mm:ss')}
                </FormText>
              </View>
            </StyledTokenItem>
          )
        })}
      </StyledTokenItemBox>
    </StyledCard>
  )
}

export default TxInfoNew
