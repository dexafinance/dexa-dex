import { ReactElement, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { IconList } from '@tabler/icons'

import { STYLE, COLOR } from 'consts'

import { View, Modal, FormText, Row } from 'components'

import {
  PairType,
  RoutePath,
  TokenType,
  TradeTypeEnum,
  TokenKeyEnum,
} from 'types'

import useRoute from 'hooks/common/useRoute'
import useLayout from 'hooks/common/useLayout'
import useTokenList from 'hooks/common/home/useTokenList'

import Announcement from './Announcement'

import TokenInfo from './TokenInfo'
import Trade from './Trade'
// import OrderList from './OrderList'
// import LpProvide from './LpProvide'
import TokenList from './TokenList'
import NoTokenSelected from './NoTokenSelected'
// import TxInfoNew from './TxInfoNew'
import TxInfoSplitView from './TxInfoSplitView'
import AnalyticsCandle from './AnalyticsCandle'

import useNetwork from 'hooks/common/useNetwork'
// padding: 0 20px;
const StyledContainer = styled(View)`
  max-width: 100%;
  @media ${STYLE.media.tablet} {
  }
`

// grid-template-columns: ${({ isLimitOrder }): string =>
//     isLimitOrder ? '2fr 1fr' : '1fr 1fr'};
//   column-gap: 20px;

// const StyledTradeBox = styled(View)<{ isLimitOrder: boolean }>`
//   display: grid;

//   @media ${STYLE.media.tablet} {
//     grid-template-columns: 1fr;
//     row-gap: 20px;
//   }
// `

const StyledLayout = styled(View)`
  display: grid;
  padding: 20px;
  grid-template-columns: minmax(200px, 300px) 1fr 300px;
  column-gap: 12px;

  @media ${STYLE.media.tablet} {
    padding: 0;
    grid-template-columns: 300px auto;
  }

  @media ${STYLE.media.mobile} {
    padding: 0;
    grid-template-columns: 1fr;
  }
`

// grid-template-rows: auto 1fr;
const StyledTokenInfoBox = styled(View)`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 12px;
`
const StyledTokenListBox = styled(View)``

const Main = (): ReactElement => {
  const { routeParams } = useRoute<RoutePath.home>()
  const tokenSymbol =
    routeParams?.symbol || TokenKeyEnum.LUNA + '_' + TokenKeyEnum.UST
  // const dex = routeParams?.dex || DexEnum.astroport
  // const limitOrder = routeParams?.limitOrder || 1

  const { isTabletWidth, isMobileWidth } = useLayout()
  const { tokenInfo } = useNetwork()
  const [showList, setShowList] = useState(false)

  const closeModal = (): void => {
    setShowList(false)
  }

  const tokenListReturn = useTokenList()
  const { sortedList } = tokenListReturn

  const symbols = tokenSymbol.split('_')

  const selectedToken = useMemo(() => {
    return sortedList.find(
      (x) =>
        x.token.symbol === symbols[0] &&
        tokenInfo[x.token.pairList[0].base].symbol === symbols[1]
    )
  }, [sortedList, tokenSymbol])

  const [selectedPairToken, setSelectedPairToken] = useState<{
    token: TokenType
    pairType: PairType
  }>()

  useEffect(() => {
    if (selectedToken?.token) {
      const list = selectedToken.token.pairList

      // default to first pool as it is sorted as the biggest liquidity pool
      setSelectedPairToken({
        ...selectedToken,
        pairType: list[0],
      })
    }
  }, [selectedToken?.token])

  // selectedPairToken.pairType.dex === DexEnum.terraswap
  // try support limit order for all dex
  // const supportLimitOrder = (dex: DexEnum): boolean => true

  return (
    <StyledContainer>
      <Announcement url="https://buttery-elderberry-89d.notion.site/Beta-launching-announcement-d9eab80fbe054e6481b5d7583dbefee6"></Announcement>
      {isTabletWidth && (
        <Row
          onClick={(): void => {
            setShowList(true)
          }}
          style={{
            border: `1px solid ${COLOR.gray._800}`,
            width: 'fit-content',
            padding: '3px 8px',
            borderRadius: 8,
            backgroundColor: COLOR.white,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <IconList size={14} />
          <FormText fontType="R14">Show token list</FormText>
        </Row>
      )}
      <StyledLayout>
        {selectedPairToken && (
          <StyledTokenListBox>
            {/* <OrderList
              tradeBase={selectedPairToken.pairType.base}
              pairContract={selectedPairToken.pairType.pair}
              {...selectedPairToken}
            /> */}
            <TxInfoSplitView
              title="Recent selling transaction"
              tradeType={TradeTypeEnum.sell}
              {...selectedPairToken}
            ></TxInfoSplitView>
            <TxInfoSplitView
              title="Recent buying transaction"
              tradeType={TradeTypeEnum.buy}
              {...selectedPairToken}
            ></TxInfoSplitView>
          </StyledTokenListBox>
        )}
        <StyledTokenInfoBox>
          {selectedPairToken ? (
            <>
              <TokenInfo
                {...selectedPairToken}
                setSelectedPairToken={setSelectedPairToken}
              />
              {false === isMobileWidth && (
                <AnalyticsCandle
                  token={selectedPairToken.token}
                  pairContract={selectedPairToken.pairType.pair}
                  tradeBase={selectedPairToken.pairType.base}
                />
              )}

              <Trade
                token={selectedPairToken.token}
                tradeBase={selectedPairToken.pairType.base}
                pairContract={selectedPairToken.pairType.pair}
                dex={selectedPairToken.pairType.dex}
              />
              {/* <LpProvide
                  token={selectedPairToken.token}
                  tradeBase={selectedPairToken.pairType.base}
                  pairContract={selectedPairToken.pairType.pair}
                  lpContract={selectedPairToken.pairType.lp}
                /> */}
            </>
          ) : (
            <NoTokenSelected />
          )}
        </StyledTokenInfoBox>
        {isTabletWidth ? (
          <Modal isOpen={showList}>
            <TokenList
              closeModal={closeModal}
              tokenListReturn={tokenListReturn}
            />
            {/* {selectedPairToken && <TxInfoNew {...selectedPairToken} />} */}
          </Modal>
        ) : (
          <StyledTokenListBox>
            <TokenList tokenListReturn={tokenListReturn} />
            {/* {selectedPairToken && <TxInfoNew {...selectedPairToken} />} */}
          </StyledTokenListBox>
        )}
      </StyledLayout>
    </StyledContainer>
  )
}

export default Main
