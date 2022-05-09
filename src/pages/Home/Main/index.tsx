import { ReactElement, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'

import { View, Modal } from 'components'

import {
  PairType,
  RoutePath,
  TokenType,
  TradeTypeEnum,
  TokenKeyEnum,
} from 'types'

import useRoute from 'hooks/common/useRoute'
// import useLayout from 'hooks/common/useLayout'
import useTokenList from 'hooks/common/home/useTokenList'

// import Announcement from './Announcement'

import TokenInfo from './TokenInfo'
import Trade from './Trade'
import MyOrder from './Trade/MyOrder'

// import OrderList from './OrderList'
// import LpProvide from './LpProvide'
import TokenList from './TokenList'
import NoTokenSelected from './NoTokenSelected'
// import TxInfoNew from './TxInfoNew'
import TxInfoSplitView from './TxInfoSplitView'
// import AnalyticsCandle from './AnalyticsCandle'

import useNetwork from 'hooks/common/useNetwork'
// padding: 0 20px;
const StyledContainer = styled(View)`
  z-index: 0;
  max-width: 1440px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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
  grid-template-columns: minmax(200px, 400px) minmax(300px, 500px) 1fr;
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

// const StyledModal = styled(Modal)`
//   z-index: 999;
// `
// const SearchBox = styled(View)`
//   margin-bottom: 12px;
//   display: grid;
//   padding: 12px;
//   grid-template-columns: minmax(300px, 400px) minmax(300px, 500px) 1fr;
//   column-gap: 20px;
//   background-color: ${({ theme }): string => theme.colors.surface};
//   @media ${STYLE.media.tablet} {
//     padding: 0;
//     grid-template-columns: 300px auto;
//   }

//   @media ${STYLE.media.mobile} {
//     padding: 0;
//     grid-template-columns: 1fr;
//   }
// `

// const SearchBox = styled(View)`
//   padding: 12px;
//   background-color: ${({ theme }): string => theme.colors.surface};
//   grid-template-rows: max-content;
//   border-radius: 8px;
// `

// grid-template-rows: auto 1fr;
// const StyledTokenInfoBox = styled(View)`
//   width: 100%;
// `
const StyledTokenListBox = styled(View)``

const Main = (): ReactElement => {
  const { routeParams } = useRoute<RoutePath.home>()
  const tokenSymbol =
    routeParams?.symbol || TokenKeyEnum.LUNA + '_' + TokenKeyEnum.UST

  // const { isTabletWidth, isMobileWidth } = useLayout()
  const { tokenInfo } = useNetwork()
  const [showList, setShowList] = useState(false)

  const closeModal = (): void => {
    setShowList(false)
  }

  const tokenListReturn = useTokenList()
  const { sortedList, setFilter } = tokenListReturn

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
      {/* <Announcement url="https://buttery-elderberry-89d.notion.site/Beta-launching-announcement-d9eab80fbe054e6481b5d7583dbefee6"></Announcement> */}

      {selectedPairToken ? (
        <>
          <TokenInfo
            {...selectedPairToken}
            setShowList={setShowList}
            setFilter={setFilter}
          />
        </>
      ) : (
        <NoTokenSelected />
      )}
      {selectedPairToken && (
        <StyledLayout>
          <MyOrder
            token={selectedPairToken.token}
            tradeBase={selectedPairToken.pairType.base}
            pairContract={selectedPairToken.pairType.pair}
            dex={selectedPairToken.pairType.dex}
          />
          <View>
            <Trade
              {...selectedPairToken}
              tradeBase={selectedPairToken.pairType.base}
              pairContract={selectedPairToken.pairType.pair}
              dex={selectedPairToken.pairType.dex}
              setSelectedPairToken={setSelectedPairToken}
            />
            {/* <AnalyticsCandle
                token={selectedPairToken.token}
                pairContract={selectedPairToken.pairType.pair}
                tradeBase={selectedPairToken.pairType.base}
              /> */}
          </View>
          <StyledTokenListBox>
            {/* <OrderList
              tradeBase={selectedPairToken.pairType.base}
              pairContract={selectedPairToken.pairType.pair}
              {...selectedPairToken}
            /> */}
            {routeParams?.tradeType === TradeTypeEnum.sell && (
              <TxInfoSplitView
                title="Recent selling transaction"
                tradeType={TradeTypeEnum.sell}
                {...selectedPairToken}
              ></TxInfoSplitView>
            )}
            {routeParams?.tradeType === TradeTypeEnum.buy && (
              <TxInfoSplitView
                title="Recent buying transaction"
                tradeType={TradeTypeEnum.buy}
                {...selectedPairToken}
              ></TxInfoSplitView>
            )}
          </StyledTokenListBox>

          {/* <LpProvide
                  token={selectedPairToken.token}
                  tradeBase={selectedPairToken.pairType.base}
                  pairContract={selectedPairToken.pairType.pair}
                  lpContract={selectedPairToken.pairType.lp}
                /> */}
          <Modal
            isOpen={showList}
            style={{
              content: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <TokenList
              closeModal={closeModal}
              tokenListReturn={tokenListReturn}
            />
          </Modal>
        </StyledLayout>
      )}
    </StyledContainer>
  )
}

export default Main
