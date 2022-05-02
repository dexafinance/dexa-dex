import { ReactElement, ReactNode, useMemo, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import styled from 'styled-components'
import _ from 'lodash'

import { SortTypeEnum } from 'hooks/common/home/useTokenList'

// import { UseMyOrderReturn } from 'hooks/common/trade/useMyOrder'
import useAllOrders from 'hooks/query/limitOrder/useAllOrders'
import useNetwork from 'hooks/common/useNetwork'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import usePool from 'hooks/query/pair/usePool'

import useTokenPairHistory from 'hooks/query/token/useCwTransactions'

import { STYLE, UTIL, COLOR } from 'consts'
// import { COLOR } from 'consts'
import postTxStore from 'store/postTxStore'

//LinkFinder,FormImage
import { FormText, Row, View, Card } from 'components'
//uToken, Token
import { ContractAddr, uToken, Token, PairType, TradeTypeEnum } from 'types'
// import { ContractAddr, uToken  } from 'types'
// import useLayout from 'hooks/common/useLayout'
// import useTokenPairHistory from 'hooks/query/token/useCw20History'
// import useTokenPairHistory from 'hooks/query/token/useCwTransactions'
// import { Coin } from '@terra-money/terra.js'
// import { FormText, Card, FormImage, Row, LinkA, View } from 'components'

//DexEnum,
import { TokenKeyEnum, TokenType, PostTxStatus } from 'types'
// const StyledContainer = styled(Card)``

// const StyledTxInfoItem = styled(Row)`
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid ${COLOR.gray._100};
// `
// margin-top: 12px;
//  min-width: 250px;
const StyledCard = styled(Card)`
  margin-bottom: 12px;
`

const StyledListHeader = styled(Row)`
  padding: 4px;
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

const TokenPrice = ({
  token,
  pairType,
}: {
  token: TokenType
  pairType: PairType
}): ReactElement => {
  const pairContract = pairType.pair
  const { getSymbolByContractOrDenom, tokenInfo } = useNetwork()
  const tradeBaseContract = tokenInfo[pairType.base].contractOrDenom
  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: token.contractOrDenom,
  })

  const token_0_Price = poolInfo?.token_0_Price || ('0' as Token)

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price).toNumber()
    return UTIL.formatAmount(UTIL.microfy(token_0_Price!), {
      toFix: UTIL.getFixed(token_0_PriceBn),
    })
  }, [token_0_Price])

  return (
    <Row style={{ alignItems: 'center', paddingRight: 10 }}>
      <FormText fontType="B18">{`${displayPrice} ${getSymbolByContractOrDenom(
        tradeBaseContract
      )}`}</FormText>
    </Row>
  )
}

const OrderItem = ({
  indexPrefix,
  index,
  hasOwnBidding,
  unitPrice,
  offerAmount,
  askAmount,
}: {
  indexPrefix: string
  index: number
  hasOwnBidding: boolean
  unitPrice: number
  offerAmount: uToken
  askAmount: uToken
}): ReactElement => {
  return (
    <StyledTokenItem key={`${indexPrefix}-${index}`}>
      <View style={{ alignItems: 'flex-start' }}>
        <FormText
          fontType={hasOwnBidding ? 'B14' : 'R14'}
          color={COLOR.brandColor.primary._600}
        >
          $
          {UTIL.formatAmount(UTIL.microfy(unitPrice.toString() as Token), {
            toFix: UTIL.getFixed(unitPrice),
          })}
        </FormText>
      </View>
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <FormText fontType="R14" color={COLOR.brandColor.primary._400}>
          {`${UTIL.formatAmount(offerAmount, { toFix: 3 })}`}
        </FormText>
      </View>
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <FormText fontType="R14" color={COLOR.brandColor.primary._400}>
          {`${UTIL.formatAmount(askAmount, { toFix: 3 })}`}
        </FormText>
      </View>
    </StyledTokenItem>
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
  const { limitOrder, tokenInfo } = useNetwork()
  const tradeBaseContract = tokenInfo[tradeBase].contractOrDenom
  const connectedWallet = useConnectedWallet()
  const walletAddress = connectedWallet?.walletAddress as string
  // buyOrders, precision, refetch
  const { sellOrders, buyOrders, refetch } = useAllOrders({
    limitOrderContract: limitOrder,
    bidderAddr: walletAddress,
    pairContract,
    unitTokenOrDenom: tradeBaseContract,
  })

  const postTxResult = useRecoilValue(postTxStore.postTxResult)

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      refetch()
    }
    const interval = setInterval(() => {
      refetch()
    }, 3000)

    return (): void => clearInterval(interval)
  }, [postTxResult.status])

  // get latest BUY / SELL order to show on the order list so that user have good reference price
  const { txList } = useTokenPairHistory({
    tokenPairContract: pairContract,
    baseContractOrDenom: tradeBaseContract as ContractAddr,
    otherContractOrDenom: token.contractOrDenom as ContractAddr,
    offset: 0,
    limit: 100,
  })

  let buyTxs = txList.filter((t) => t.action === TradeTypeEnum.buy)
  if (buyTxs && buyTxs.length > 0) {
    buyTxs = buyTxs.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
  }
  let sellTxs = txList.filter((t) => t.action === TradeTypeEnum.sell)
  if (sellTxs && sellTxs.length > 0) {
    sellTxs = sellTxs.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
  }

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
          (item, index) => (
            <OrderItem
              indexPrefix="txListSell"
              hasOwnBidding={item.hasOwnBidding}
              index={index}
              unitPrice={item.unitPrice}
              offerAmount={item.offerAmount}
              askAmount={item.askAmount}
            />
          )
        )}
        {sellTxs && sellTxs.length > 0 && (
          <OrderItem
            indexPrefix="txListSell"
            hasOwnBidding={false}
            index={displayItem}
            unitPrice={sellTxs[0].unitPrice}
            offerAmount={sellTxs[0].amountIn.amount.toString() as uToken}
            askAmount={sellTxs[0].amountIn.amount.toString() as uToken}
          />
        )}
      </StyledTokenItemBox>
      <StyledTokenPrice>
        <TokenPrice token={token} pairType={pairType} />
      </StyledTokenPrice>
      <StyledTokenItemBox>
        {buyTxs && buyTxs.length > 0 && (
          <OrderItem
            indexPrefix="txListBuy"
            hasOwnBidding={false}
            index={displayItem}
            unitPrice={buyTxs[0].unitPrice}
            offerAmount={buyTxs[0].amountOut.amount.toString() as uToken}
            askAmount={buyTxs[0].amountOut.amount.toString() as uToken}
          />
        )}
        {_.map(buyOrders.slice(0, displayItem), (item, index) => {
          return (
            <OrderItem
              indexPrefix="txListBuy"
              hasOwnBidding={item.hasOwnBidding}
              index={index}
              unitPrice={item.unitPrice}
              offerAmount={item.askAmount}
              askAmount={item.offerAmount}
            />
          )
        })}
      </StyledTokenItemBox>
    </StyledCard>
  )
}

export default OrderList
