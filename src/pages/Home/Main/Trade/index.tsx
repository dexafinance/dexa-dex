import { ReactElement, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { IconSquare, IconCheckbox } from '@tabler/icons'

import { COLOR, STYLE, WHITELIST } from 'consts'

import { FormText, Card, SelectTab, AuthButton, View } from 'components'
import useRoute from 'hooks/common/useRoute'
import useBuy, { UseBuyReturn } from 'hooks/common/trade/useBuy'
import useSell, { UseSellReturn } from 'hooks/common/trade/useSell'
import useLimitOrderBuy, {
  UseLimitOrderBuyReturn,
} from 'hooks/common/trade/useLimitOrderBuy'
import useLimitOrderSell, {
  UseLimitOrderSellReturn,
} from 'hooks/common/trade/useLimitOrderSell'
import useMyOrder from 'hooks/common/trade/useMyOrder'

import {
  TradeTypeEnum,
  RoutePath,
  TokenType,
  ContractAddr,
  DexEnum,
  TokenKeyEnum,
} from 'types'

import MyOrder from './MyOrder'
import BuyForm from './BuyForm'
import LimitOrderBuyForm from './LimitOrderBuyForm'
import LimitOrderSellForm from './LimitOrderSellForm'
import SellForm from './SellForm'

const StyledCard = styled(Card)`
  flex: 1;
`

const StyledLayout = styled(View)<{ isLimitOrder: boolean }>`
  display: grid;
  grid-template-columns: ${({ isLimitOrder }): string =>
    isLimitOrder ? '1fr 1fr' : '1fr'};
  column-gap: 20px;
  height: 100%;

  @media ${STYLE.media.mobile} {
    display: flex;
    flex-direction: column-reverse;
  }
`

const StyledLimitOrderButton = styled(FormText)`
  ${STYLE.clickable}
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${COLOR.gray._600};
  width: fit-content;
  padding: 5px 10px;
  margin-bottom: 12px;
`

// selectedPairToken.pairType.dex === DexEnum.terraswap
// try support limit order for all dex
const supportLimitOrder = (dex: DexEnum): boolean => true

const Buy = ({
  buyReturn,
  useLimitOrderBuyReturn,
  dex,
}: {
  buyReturn: UseBuyReturn
  useLimitOrderBuyReturn: UseLimitOrderBuyReturn
  dex: DexEnum
}): ReactElement => {
  const theme = useTheme()
  const {
    onClickBuy,
    invalidForm: invalidBuyForm,
    fee,
    submitErrMsg: buySubmitErrMsg,
  } = buyReturn

  const {
    onClickLimitOrderBuy,
    invalidForm: invalidLoBuyForm,
    fee: loFee,
    submitErrMsg: loBuySubmitErrMsg,
  } = useLimitOrderBuyReturn

  const [buyLimitOrder, setBuyLimitOrder] = useState(true)

  useEffect(() => {
    setBuyLimitOrder(true)
  }, [dex])
  //dex === DexEnum.terraswap
  return (
    <>
      {supportLimitOrder(dex) && (
        <View style={{ alignItems: 'flex-end' }}>
          <StyledLimitOrderButton
            // disabled={selectedPairToken.pairType.dex === DexEnum.terraswap}
            fontType="R16"
            color={
              buyLimitOrder
                ? theme.colors.primaryText
                : theme.colors.secondaryText
            }
            onClick={(): void => {
              setBuyLimitOrder(!buyLimitOrder)
            }}
          >
            {buyLimitOrder ? <IconCheckbox /> : <IconSquare />}
            Limit order
          </StyledLimitOrderButton>
        </View>
      )}
      {buyLimitOrder ? (
        <>
          <LimitOrderBuyForm useLimitOrderBuyReturn={useLimitOrderBuyReturn} />
          {loBuySubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {loBuySubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            kind="primary"
            backgroundColor={theme.colors.orderList.buyColor}
            color={theme.colors.onPrimary}
            onClick={onClickLimitOrderBuy}
            disabled={invalidLoBuyForm || !loFee || !!loBuySubmitErrMsg}
          >
            BUY
          </AuthButton>
        </>
      ) : (
        <>
          <BuyForm buyReturn={buyReturn} />
          {buySubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {buySubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            backgroundColor={theme.colors.orderList.buyColor}
            color={theme.colors.onPrimary}
            kind="primary"
            onClick={onClickBuy}
            disabled={invalidBuyForm || !fee || !!buySubmitErrMsg}
          >
            BUY
          </AuthButton>
        </>
      )}
    </>
  )
}

const Sell = ({
  sellReturn,
  useLimitOrderSellReturn,
  dex,
}: {
  sellReturn: UseSellReturn
  useLimitOrderSellReturn: UseLimitOrderSellReturn
  dex: DexEnum
}): ReactElement => {
  const theme = useTheme()

  const {
    onClickSell,
    invalidForm: invalidSellForm,
    fee: sellFee,
    submitErrMsg: sellSubmitErrMsg,
  } = sellReturn

  const {
    onClickLimitOrderSell,
    invalidForm: invalidLoSellForm,
    fee: loFee,
    submitErrMsg: loSellSubmitErrMsg,
  } = useLimitOrderSellReturn

  const [sellLimitOrder, setSellLimitOrder] = useState(true)

  useEffect(() => {
    setSellLimitOrder(true)
  }, [dex])

  return (
    <>
      {supportLimitOrder(dex) && (
        <View style={{ alignItems: 'flex-end' }}>
          <StyledLimitOrderButton
            fontType="R16"
            color={
              sellLimitOrder
                ? theme.colors.primaryText
                : theme.colors.secondaryText
            }
            onClick={(): void => {
              setSellLimitOrder(!sellLimitOrder)
            }}
          >
            {sellLimitOrder ? <IconCheckbox /> : <IconSquare />}
            Limit order
          </StyledLimitOrderButton>
        </View>
      )}

      {sellLimitOrder ? (
        <>
          <LimitOrderSellForm
            useLimitOrderSellReturn={useLimitOrderSellReturn}
          />
          {loSellSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {loSellSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickLimitOrderSell}
            kind="primary"
            backgroundColor={theme.colors.orderList.sellColor}
            color={theme.colors.onPrimary}
            disabled={invalidLoSellForm || !loFee || !!loSellSubmitErrMsg}
          >
            SELL
          </AuthButton>
        </>
      ) : (
        <>
          <SellForm sellReturn={sellReturn} />
          {sellSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {sellSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            kind="primary"
            backgroundColor={theme.colors.orderList.sellColor}
            color={theme.colors.onPrimary}
            onClick={onClickSell}
            disabled={invalidSellForm || !sellFee || !!sellSubmitErrMsg}
          >
            SELL
          </AuthButton>
        </>
      )}
    </>
  )
}

const Trade = ({
  token,
  tradeBase,
  pairContract,
  dex,
}: {
  token: TokenType
  tradeBase: TokenKeyEnum
  pairContract: ContractAddr
  dex: DexEnum
}): ReactElement => {
  const { insertRouteParam, routeParams } = useRoute<RoutePath.home>()
  const tradeType = routeParams?.tradeType || TradeTypeEnum.buy
  const tradeBaseContract = WHITELIST.tokenInfo[tradeBase].contractOrDenom
  const tradeBaseSymbol = WHITELIST.tokenInfo[tradeBase].symbol
  const buyReturn = useBuy({
    fromTokenContractOrDenom: tradeBaseContract,
    toTokenContractOrDenom: token.contractOrDenom,
    fromTokenSymbol: tradeBaseSymbol,
    toTokenSymbol: token.symbol,
    pairContract,
  })

  const useLimitOrderBuyReturn = useLimitOrderBuy({
    offerDenom: tradeBaseContract,
    askContractOrDenom: token.contractOrDenom,
    offerTokenSymbol: tradeBaseSymbol,
    askTokenSymbol: token.symbol,
    pairContract,
  })

  const sellReturn = useSell({
    fromTokenContractOrDenom: token.contractOrDenom,
    toTokenContractOrDenom: tradeBaseContract,
    fromTokenSymbol: token.symbol,
    toTokenSymbol: tradeBaseSymbol,
    pairContract,
  })

  const useLimitOrderSellReturn = useLimitOrderSell({
    offerContractOrDenom: token.contractOrDenom,
    askDenom: tradeBaseContract,
    offerTokenSymbol: token.symbol,
    askTokenSymbol: tradeBaseSymbol,
    pairContract,
  })

  const myOrderReturn = useMyOrder({
    forBuyDenom: tradeBaseContract,
    toBuyContractOrDenom: token.contractOrDenom,
    tokenForBuySymbol: tradeBaseSymbol,
    tokenToBuySymbol: token.symbol,
    pairContract,
  })

  return (
    <StyledCard>
      <StyledLayout isLimitOrder={supportLimitOrder(dex)}>
        {supportLimitOrder(dex) && <MyOrder myOrderReturn={myOrderReturn} />}
        <View style={{ flex: 1 }}>
          <SelectTab
            options={[
              { value: TradeTypeEnum.buy, label: 'BUY' },
              { value: TradeTypeEnum.sell, label: 'SELL' },
            ]}
            onSelect={(value): void => {
              insertRouteParam('tradeType', value)
            }}
            selected={tradeType}
          />

          {tradeType === TradeTypeEnum.buy ? (
            <Buy
              buyReturn={buyReturn}
              useLimitOrderBuyReturn={useLimitOrderBuyReturn}
              dex={dex}
            />
          ) : (
            <Sell
              sellReturn={sellReturn}
              useLimitOrderSellReturn={useLimitOrderSellReturn}
              dex={dex}
            />
          )}
        </View>
      </StyledLayout>
    </StyledCard>
  )
}

export default Trade
