import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'
import _ from 'lodash'

import { COLOR, UTIL, STYLE } from 'consts'

import { FormText, View, Row } from 'components'
// import { UseMyOrderReturn } from 'hooks/common/trade/useMyOrder'
import { IconCircleX, IconMoodEmpty } from '@tabler/icons'
// import { addressTokenMap, testnetAddressTokenMap } from 'consts/whitelist'
import {
  TradeTypeEnum,
  TokenKeyEnum,
  TokenType,
  DexEnum,
  ContractAddr,
} from 'types'

import useNetwork from 'hooks/common/useNetwork'
import useMyOrder from 'hooks/common/trade/useMyOrder'

const StyledContainer = styled(View)`
  @media ${STYLE.media.mobile} {
    margin-top: 20px;
  }
`

const StyledOrderList = styled(View)`
  height: 100%;
  padding: 15px;
`

const StyledOrderItem = styled(Row)`
  padding: 5px 0;
`

const StyledCancleButton = styled(View)`
  ${STYLE.clickable}
  padding:5px;
`

const MyOrder = ({
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
  //tokenForBuySymbol, tokenToBuySymbol
  // const { limitOrderList, setOrderId } = myOrderReturn
  const { contractOrDenomMap, tokenInfo } = useNetwork()
  // const addrTokenMap = isMainnet ? addressTokenMap : testnetAddressTokenMap
  const theme = useTheme()

  const tradeBaseContract = tokenInfo[tradeBase].contractOrDenom
  const tradeBaseSymbol = tokenInfo[tradeBase].symbol

  const { limitOrderList, setOrderId } = useMyOrder({
    forBuyDenom: tradeBaseContract,
    toBuyContractOrDenom: token.contractOrDenom,
    tokenForBuySymbol: tradeBaseSymbol,
    tokenToBuySymbol: token.symbol,
    pairContract,
  })

  return (
    <StyledContainer>
      <FormText fontType={'B18'} style={{ paddingBottom: 10 }}>
        My Limit Orders
      </FormText>
      <StyledOrderList>
        {limitOrderList.length > 0 ? (
          <Row style={{ borderBottom: `1px solid ${COLOR.gray._300}` }}>
            <View style={{ alignItems: 'center' }}>
              <FormText fontType="B18">Type</FormText>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FormText fontType="B18">Price</FormText>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FormText fontType="B18">Order</FormText>
            </View>
            <View style={{ width: 30 }} />
          </Row>
        ) : (
          <Row style={{ alignItems: 'center' }}>
            <IconMoodEmpty
              color={COLOR.gray._400}
              style={{ paddingRight: 5 }}
            />
            <FormText fontType="R16" color={COLOR.gray._400}>
              No Active Orders
            </FormText>
          </Row>
        )}
        {_.map(limitOrderList, (item, index) => {
          return (
            <StyledOrderItem key={`limitOrderList-${index}`}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormText
                  color={
                    item.type === TradeTypeEnum.buy
                      ? theme.colors.orderList.buyColor
                      : theme.colors.orderList.sellColor
                  }
                >
                  {item.type}
                </FormText>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormText>
                  {UTIL.formatAmount(UTIL.microfy(item.price), { toFix: 6 })}
                </FormText>
                {item.totalLoop > 0 && (
                  <FormText>
                    {`(${item.remainingLoop}/${item.totalLoop})`}
                  </FormText>
                )}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <FormText>{`${UTIL.formatAmount(item.toBuyAmount)} ${
                  item.type === TradeTypeEnum.buy
                    ? contractOrDenomMap[item.askContractOrDenom]
                    : contractOrDenomMap[item.offerContractOrDenom]
                }`}</FormText>
                <FormText fontType="R14">{`(${UTIL.formatAmount(
                  item.toSellAmount
                )} ${
                  item.type === TradeTypeEnum.buy
                    ? contractOrDenomMap[item.offerContractOrDenom]
                    : contractOrDenomMap[item.askContractOrDenom]
                })`}</FormText>
              </View>
              <StyledCancleButton
                onClick={(): void => {
                  setOrderId(item.orderId)
                }}
              >
                <IconCircleX color={COLOR.error} />
              </StyledCancleButton>
            </StyledOrderItem>
          )
        })}
      </StyledOrderList>
    </StyledContainer>
  )
}

export default MyOrder
