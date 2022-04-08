import { ReactElement, ReactNode, useMemo } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { SortTypeEnum } from 'hooks/common/home/useTokenList'
import { WHITELIST } from 'consts'

// import { UseMyOrderReturn } from 'hooks/common/trade/useMyOrder'
import useAllOrders from 'hooks/query/limitOrder/useAllOrders'
import useNetwork from 'hooks/common/useNetwork'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import usePool from 'hooks/query/pair/usePool'

import { STYLE, UTIL, COLOR } from 'consts'
// import { COLOR } from 'consts'

//LinkFinder,FormImage
import { FormText, Row, View, Card } from 'components'
//uToken, Token
import { ContractAddr, Token, PairType } from 'types'
// import { ContractAddr, uToken  } from 'types'
// import useLayout from 'hooks/common/useLayout'
// import useTokenPairHistory from 'hooks/query/token/useCw20History'
// import useTokenPairHistory from 'hooks/query/token/useCwTransactions'
// import { Coin } from '@terra-money/terra.js'
// import { FormText, Card, FormImage, Row, LinkA, View } from 'components'

//DexEnum,
import { TokenKeyEnum, TokenType } from 'types'

// const StyledContainer = styled(Card)``

// const StyledTxInfoItem = styled(Row)`
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid ${COLOR.gray._100};
// `
// margin-top: 12px;
const StyledCard = styled(Card)`
  min-width: 250px;
  @media ${STYLE.media.tablet} {
    width: fit-content;
  }
`

const StyledListHeader = styled(Row)`
  padding: 5px;
  margin-top: 4px;
  border-top: 1px solid ${COLOR.gray._600};
  border-bottom: 1px solid ${COLOR.gray._600};
`

const StyledTitle = styled(View)``

const StyledTokenItem = styled(View)`
  ${STYLE.clickable}
  padding:10px 0;
  align-items: center;
  display: grid;
  grid-template-columns: 24px 8fr 8fr;
`
//  height: 700px;
const StyledTokenItemBox = styled(View)`
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

// const StyledTokenLogo = styled(Row)`
//   align-items: center;
//   @media ${STYLE.media.tablet} {
//     flex-direction: column;
//   }
// `
// const StyledSymbolPrice = styled(Row)`
//   align-items: center;
// `

const StyledTokenPrice = styled(View)`
  margin-top: 8px;
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
          <FormText fontType="B14" color={COLOR.gray._600}>
            {title}
          </FormText>
        ) : (
          title
        )}
      </Row>
    </StyledTitle>
  )
}

const TokenPrice = ({
  token,
  pairType,
}: {
  token: TokenType
  pairType: PairType
}): ReactElement => {
  const pairContract = pairType.pair
  const tradeBaseContract = WHITELIST.tokenInfo[pairType.base].contractOrDenom
  const { getSymbolByContractOrDenom } = useNetwork()
  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: token.contractOrDenom,
  })

  const token_0_Price = poolInfo?.token_0_Price

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price)
    if (token_0_PriceBn.isLessThan(0.01)) {
      return token_0_PriceBn.toFixed(6)
    }
    return token_0_PriceBn.toFixed(3)
  }, [token_0_Price])

  return (
    <Row style={{ alignItems: 'center', paddingRight: 10 }}>
      <FormText fontType="B18">{`${displayPrice} ${getSymbolByContractOrDenom(
        tradeBaseContract
      )}`}</FormText>
    </Row>
  )
}

const OrderList = ({
  token,
  pairType,
  tradeBase,
  // dex,
  pairContract,
}: {
  token: TokenType
  pairType: PairType
  tradeBase: TokenKeyEnum
  // dex: DexEnum
  pairContract: ContractAddr
}): ReactElement => {
  // const { txList } = useTokenPairHistory({ tokenPairContract: pairContract })
  // const { isTabletWidth } = useLayout()
  // const { isMobileWidth } = useLayout()
  const tradeBaseContract = WHITELIST.tokenInfo[tradeBase].contractOrDenom
  // const tradeBaseSymbol = WHITELIST.tokenInfo[tradeBase].symbol
  const { limitOrder } = useNetwork()
  const connectedWallet = useConnectedWallet()
  const walletAddress = connectedWallet?.walletAddress as string
  // buyOrders, precision, refetch
  // console.log('OrderList', tradeBase, tradeBaseContract)
  const { sellOrders, buyOrders } = useAllOrders({
    limitOrderContract: limitOrder,
    bidderAddr: walletAddress,
    pairContract,
    unitTokenOrDenom: tradeBaseContract,
  })

  // const { limitOrderList, setOrderId, tokenForBuySymbol, tokenToBuySymbol } =
  //   orders

  // same amount in sell & buy orders
  const displayItem = 10

  return (
    <StyledCard>
      <View>
        <FormText fontType="B16">Limit Orders in queue</FormText>
      </View>
      <StyledListHeader>
        <Title
          title={`Price`}
          justifyContent={`flex-start`}
          sortBy={SortTypeEnum.price}
        />
        <Title title={`Amount(${token.symbol})`} sortBy={SortTypeEnum.price} />
        <Title title={'Total'} sortBy={SortTypeEnum.price} />
      </StyledListHeader>
      <StyledTokenItemBox>
        {_.map(
          sellOrders.slice(sellOrders.length - displayItem, displayItem),
          (item, index) => {
            // const uusdBn = UTIL.toBn(item.uusd)
            // const isPositive = uusdBn.isPositive()
            const isPositive = true
            // let action = 'BUY'
            // console.log(
            //   'tx',
            //   UTIL.formatAmount(item.amountIn?.amount.toString() as uToken),
            //   item.amountIn?.denom,
            //   UTIL.formatAmount(item.amountOut?.amount.toString() as uToken),
            //   item.amountOut?.denom,
            //   action,
            //   amount
            // )
            return (
              // <StyledTxInfoItem key={`txList-${index}`}>
              <StyledTokenItem key={`txList-${index}`}>
                <View style={{ alignItems: 'flex-start' }}>
                  <FormText fontType="R14">
                    $
                    {UTIL.formatAmount(
                      UTIL.microfy(item.unitPrice.toString() as Token),
                      { toFix: 3 }
                    )}
                  </FormText>
                </View>
                <View
                  style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                >
                  <FormText fontType="B14" color={COLOR.primary._400}>
                    {`${UTIL.formatAmount(item.offerAmount, { toFix: 3 })}`}
                  </FormText>
                </View>
                <View
                  style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                >
                  <FormText
                    fontType="B14"
                    color={isPositive ? COLOR.success : COLOR.error}
                  >
                    {`${UTIL.formatAmount(item.askAmount, { toFix: 3 })}`}
                  </FormText>
                </View>
              </StyledTokenItem>
            )
          }
        )}
      </StyledTokenItemBox>
      <StyledTokenPrice>
        <TokenPrice token={token} pairType={pairType} />
      </StyledTokenPrice>
      <StyledTokenItemBox>
        {_.map(buyOrders.slice(0, displayItem), (item, index) => {
          // const uusdBn = UTIL.toBn(item.uusd)
          // const isPositive = uusdBn.isPositive()
          const isPositive = true
          // let action = 'BUY'
          // console.log(
          //   'tx',
          //   UTIL.formatAmount(item.amountIn?.amount.toString() as uToken),
          //   item.amountIn?.denom,
          //   UTIL.formatAmount(item.amountOut?.amount.toString() as uToken),
          //   item.amountOut?.denom,
          //   action,
          //   amount
          // )
          return (
            // <StyledTxInfoItem key={`txList-${index}`}>
            <StyledTokenItem key={`txList-${index}`}>
              <View style={{ alignItems: 'flex-start' }}>
                <FormText fontType="R14">
                  $
                  {UTIL.formatAmount(
                    UTIL.microfy(item.unitPrice.toString() as Token),
                    { toFix: 3 }
                  )}
                </FormText>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
              >
                <FormText fontType="B14" color={COLOR.primary._400}>
                  {`${UTIL.formatAmount(item.askAmount, { toFix: 3 })}`}
                </FormText>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
              >
                <FormText
                  fontType="B14"
                  color={isPositive ? COLOR.success : COLOR.error}
                >
                  {`${UTIL.formatAmount(item.offerAmount, { toFix: 3 })}`}
                </FormText>
              </View>
            </StyledTokenItem>
          )
        })}
      </StyledTokenItemBox>
    </StyledCard>
  )
}

export default OrderList
