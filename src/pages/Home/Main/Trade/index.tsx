import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

import { UTIL, COLOR, STYLE } from 'consts'

import _ from 'lodash'

import {
  FormText,
  SelectTab,
  AuthButton,
  View,
  Card,
  Row,
  FormImage,
} from 'components'
import useRoute from 'hooks/common/useRoute'
import useBuy, { UseBuyReturn } from 'hooks/common/trade/useBuy'
import useSell, { UseSellReturn } from 'hooks/common/trade/useSell'
import useLimitOrderBuy, {
  UseLimitOrderBuyReturn,
} from 'hooks/common/trade/useLimitOrderBuy'
import useLimitOrderSell, {
  UseLimitOrderSellReturn,
} from 'hooks/common/trade/useLimitOrderSell'
import useNetwork from 'hooks/common/useNetwork'
import useTokenPairsList, {
  SortedTokenPairType,
} from 'hooks/common/home/useTokenPairsList'

import terraswapLogo from 'images/terraswap.svg'
import astroportLogo from 'images/astroport.svg'
import prismLogo from 'images/prism.svg'
import loopLogo from 'images/loop.png'

import {
  TradeTypeEnum,
  TradeKindEnum,
  RoutePath,
  TokenType,
  ContractAddr,
  DexEnum,
  TokenKeyEnum,
  PairType,
} from 'types'

import BuyForm from './BuyForm'
import LimitOrderBuyForm from './LimitOrderBuyForm'
import LimitOrderSellForm from './LimitOrderSellForm'
import SellForm from './SellForm'

const factoryLogos: Record<DexEnum, string> = {
  [DexEnum.terraswap]: terraswapLogo,
  [DexEnum.astroport]: astroportLogo,
  [DexEnum.prism]: prismLogo,
  [DexEnum.loop]: loopLogo,
}

const factoryNames: Record<DexEnum, string> = {
  [DexEnum.terraswap]: 'Terraswap',
  [DexEnum.astroport]: 'Astroport',
  [DexEnum.prism]: 'Prism',
  [DexEnum.loop]: 'Loop',
}

const StyledCard = styled(Card)`
  background-color: ${({ theme }): string => theme.colors.surface};
  border: 1px solid ${({ theme }): string => theme.colors.surface};
  flex: 1;
`

const StyledLayout = styled(View)<{ isLimitOrder: boolean }>`
  height: 100%;
`

const StyledDexDenomItem = styled(Row)<{ selected: boolean }>`
  ${STYLE.clickable}
  padding: 3px 10px;
  margin-right: 10px;
  margin-bottom: 4px;
  align-items: center;
  font-size: 12px;
  border: 2px solid
    ${({ selected, theme }): string =>
      selected ? theme.colors.borderFocused : theme.colors.border};
  opacity: ${({ selected }): number => (selected ? 1 : 0.8)};
  border-radius: 8px;
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
  const { routeParams } = useRoute<RoutePath.home>()
  const tradeKind = routeParams?.tradeKind || TradeKindEnum.limitOrder

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

  const buyLimitOrder = tradeKind === TradeKindEnum.limitOrder

  return (
    <>
      {buyLimitOrder ? (
        <>
          <LimitOrderBuyForm useLimitOrderBuyReturn={useLimitOrderBuyReturn} />
          {loBuySubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {loBuySubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            style={{
              marginTop: 8,
            }}
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
  const { routeParams } = useRoute<RoutePath.home>()
  const tradeKind = routeParams?.tradeKind || TradeKindEnum.limitOrder

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

  const sellLimitOrder = tradeKind === TradeKindEnum.limitOrder

  return (
    <>
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
            style={{
              marginTop: 8,
            }}
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

const SwapBase = ({
  pairList,
  pairType,
  setSelectedPairToken,
}: {
  pairList: SortedTokenPairType[]
  pairType: PairType
  setSelectedPairToken: React.Dispatch<
    React.SetStateAction<
      | {
          token: TokenType
          pairType: PairType
        }
      | undefined
    >
  >
}): ReactElement => {
  return (
    <View>
      {/* <StyledFormText fontType="B14">Select Dex / Denom</StyledFormText> */}
      <Row>
        {_.map(pairList, (x, i) => {
          const dexSrc = factoryLogos[x.token.dex]
          const selected = pairType.pair === x.token.pair
          return (
            <StyledDexDenomItem
              key={`pairList-${i}`}
              onClick={(): void => {
                setSelectedPairToken((ori) => {
                  if (ori) {
                    return { ...ori, pairType: x.token }
                  }
                })
              }}
              selected={selected}
            >
              <View>
                <Row style={{ alignItems: 'center' }}>
                  <FormImage src={dexSrc} size={18} />
                  <FormText style={{ padding: '0 4px', fontSize: 12 }}>
                    {factoryNames[x.token.dex]}
                  </FormText>
                  {x.poolInfo && (
                    <FormText fontType="R10">
                      {UTIL.formatAmount(x.poolInfo.total_PoolSize!, {
                        abbreviate: true,
                        toFix: 0,
                      })}
                    </FormText>
                  )}
                </Row>
                {/* {supportLimitOrder(x.dex) && (
                  <View>
                    <FormText fontType="R14">Limit order</FormText>
                  </View>
                )} */}
                {/* <View></View> */}
              </View>
            </StyledDexDenomItem>
          )
        })}
      </Row>
    </View>
  )
}

const Trade = ({
  token,
  tradeBase,
  pairContract,
  dex,
  pairType,
  setSelectedPairToken,
}: {
  token: TokenType
  tradeBase: TokenKeyEnum
  pairContract: ContractAddr
  dex: DexEnum
  pairType: PairType
  setSelectedPairToken: React.Dispatch<
    React.SetStateAction<
      | {
          token: TokenType
          pairType: PairType
        }
      | undefined
    >
  >
}): ReactElement => {
  const { insertRouteParams, routeParams } = useRoute<RoutePath.home>()
  const { tokenInfo } = useNetwork()
  const tradeType = routeParams?.tradeType || TradeTypeEnum.buy
  const tradeKind = routeParams?.tradeKind || TradeKindEnum.limitOrder
  const tradeBaseContract = tokenInfo[tradeBase].contractOrDenom
  const tradeBaseSymbol = tokenInfo[tradeBase].symbol
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

  const tokenListReturn = useTokenPairsList(token)
  const { sortedList } = tokenListReturn

  return (
    <StyledCard>
      <StyledLayout isLimitOrder={supportLimitOrder(dex)}>
        <View style={{ flex: 1 }}>
          <SelectTab
            options={[
              {
                value: TradeTypeEnum.buy,
                value2: TradeKindEnum.limitOrder,
                label: 'Buy',
              },
              {
                value: TradeTypeEnum.sell,
                value2: TradeKindEnum.limitOrder,
                label: 'Sell',
              },
              {
                value: TradeTypeEnum.buy,
                value2: TradeKindEnum.instant,
                label: 'Inst. Buy',
              },
              {
                value: TradeTypeEnum.sell,
                value2: TradeKindEnum.instant,
                label: 'Inst. Sell',
              },
            ]}
            onSelect={(value, value2): void => {
              insertRouteParams([
                { key: 'tradeType', value: value },
                { key: 'tradeKind', value: value2 },
              ])
            }}
            selected={{ value: tradeType, value2: tradeKind }}
          />

          <SwapBase
            pairList={sortedList}
            pairType={pairType}
            setSelectedPairToken={setSelectedPairToken}
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
