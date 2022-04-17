import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  IconChartBar,
  IconCircle,
  IconCircleCheck,
  IconCopy,
  IconLayout,
} from '@tabler/icons'
import { toast } from 'react-toastify'
import _ from 'lodash'

import terraswapLogo from 'images/terraswap.svg'
import astroportLogo from 'images/astroport.svg'

import { UTIL, STYLE, COLOR, APIURL, WHITELIST } from 'consts'

import { FormText, Card, FormImage, Row, LinkA, View } from 'components'
import { DexEnum, PairType, TokenType, Token } from 'types'
import useLayout from 'hooks/common/useLayout'

import usePool from 'hooks/query/pair/usePool'
import useNetwork from 'hooks/common/useNetwork'

const StyledContainer = styled(Card)``

const StyledFormText = styled(FormText)`
  margin-bottom: 4px;
`

const StyledSymbolPrice = styled(Row)`
  align-items: center;
`

const StyledNameAddress = styled(Row)`
  align-items: center;
  @media ${STYLE.media.tablet} {
    justify-content: center;
  }
  @media ${STYLE.media.mobile} {
    flex-direction: column;
  }
`

const StyledTokenLogo = styled(Row)`
  align-items: center;
  @media ${STYLE.media.tablet} {
    flex-direction: column;
  }
`

const StyledCopy = styled(Row)`
  ${STYLE.clickable}
`

const StyledLinkBox = styled(Row)`
  @media ${STYLE.media.tablet} {
    justify-content: space-around;
  }
`

const StyledDexDenomItem = styled(Row)<{ selected: boolean }>`
  ${STYLE.clickable}
  border-radius: 8px;
  padding: 3px 10px;
  align-items: center;
  border: 2px solid
    ${({ selected }): string =>
      selected ? COLOR.primary._400 : COLOR.gray._300};
  opacity: ${({ selected }): number => (selected ? 1 : 0.8)};
  margin-right: 10px;
`
// selectedPairToken.pairType.dex === DexEnum.terraswap
// try support limit order for all dex
// const supportLimitOrder = (dex: DexEnum):boolean => true

const SwapBase = ({
  pairList,
  pairType,
  setSelectedPairToken,
}: {
  pairList: PairType[]
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
    <View style={{ borderTop: `1px solid gray`, paddingTop: 6, marginTop: 6 }}>
      <StyledFormText fontType="B14">Select Dex / Denom</StyledFormText>
      <Row>
        {_.map(pairList, (x, i) => {
          const dexSrc =
            x.dex === DexEnum.terraswap ? terraswapLogo : astroportLogo
          const denomSrc = WHITELIST.tokenInfo[x.base].logo
          const selected = pairType.pair === x.pair
          return (
            <StyledDexDenomItem
              key={`pairList-${i}`}
              onClick={(): void => {
                setSelectedPairToken((ori) => {
                  if (ori) {
                    return { ...ori, pairType: x }
                  }
                })
              }}
              selected={selected}
            >
              <View style={{ paddingRight: 6 }}>
                {selected ? (
                  <IconCircleCheck color={COLOR.primary._400} />
                ) : (
                  <IconCircle color={COLOR.gray._300} />
                )}
              </View>
              <View>
                <Row style={{ alignItems: 'center' }}>
                  <FormImage src={dexSrc} size={26} />
                  <FormText style={{ padding: '0 4px' }}>/</FormText>
                  <FormImage src={denomSrc} size={30} />
                </Row>
                {/* {supportLimitOrder(x.dex) && (
                  <View>
                    <FormText fontType="R14">Limit order</FormText>
                  </View>
                )} */}
                <View>
                  <FormText fontType="R14">
                    {x.dex === DexEnum.terraswap ? 'Terraswap' : 'Astroport'}
                  </FormText>
                </View>
              </View>
            </StyledDexDenomItem>
          )
        })}
      </Row>
    </View>
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

  const token_0_Price = poolInfo?.token_0_Price || ('0' as Token)

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price).toNumber()
    return UTIL.formatAmount(UTIL.microfy(token_0_Price), {
      toFix: UTIL.getFixed(token_0_PriceBn),
    })
  }, [token_0_Price])

  return (
    <Row style={{ alignItems: 'center', paddingRight: 10 }}>
      <FormText fontType="B20">{`${displayPrice} ${getSymbolByContractOrDenom(
        tradeBaseContract
      )}`}</FormText>
    </Row>
  )
}

const TokenInfo = ({
  token,
  pairType,
  setSelectedPairToken,
}: {
  token: TokenType
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
  const { isMobileWidth } = useLayout()
  const pairContract = pairType.pair

  const chartLink = APIURL.getCoinhallLink({ pairContract })
  const dashboardLink = APIURL.getDashboardLink({ pairContract })

  return (
    <StyledContainer>
      <StyledTokenLogo>
        <StyledSymbolPrice>
          <Row style={{ alignItems: 'center' }}>
            <FormImage
              src={token.logo}
              size={32}
              style={{ paddingRight: 10 }}
            />
            {false === isMobileWidth && (
              <FormText
                fontType={{ default: 'B24', mobile: 'B18' }}
                style={{ paddingRight: 10 }}
              >
                {token.symbol}
              </FormText>
            )}
          </Row>
          <TokenPrice token={token} pairType={pairType} />
        </StyledSymbolPrice>
      </StyledTokenLogo>
      <StyledNameAddress>
        <FormText fontType="R16">{token.name}</FormText>
        <CopyToClipboard
          text={token.contractOrDenom}
          onCopy={(): void => {
            toast(`Copied ${token.symbol} address!`, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }}
        >
          <StyledCopy style={{ alignItems: 'center' }}>
            <FormText
              fontType={{ default: 'R16', mobile: 'R14' }}
              color={COLOR.gray._400}
            >
              {`(${UTIL.truncate(token.contractOrDenom, [10, 10])}`}
            </FormText>
            <IconCopy size={18} color={COLOR.gray._400} />
            <FormText
              fontType={{ default: 'R16', mobile: 'R14' }}
              color={COLOR.gray._400}
            >
              {')'}
            </FormText>
          </StyledCopy>
        </CopyToClipboard>
      </StyledNameAddress>
      <StyledLinkBox>
        {chartLink && (
          <Row style={{ alignItems: 'center', paddingRight: 10 }}>
            <IconChartBar
              size={14}
              color={COLOR.primary._400}
              style={{ paddingRight: 4 }}
            />
            <LinkA link={chartLink}>
              <FormText fontType={'R16'} color={COLOR.primary._400}>
                {isMobileWidth ? 'Chart' : 'Coinhall Chart'}
              </FormText>
            </LinkA>
          </Row>
        )}
        {dashboardLink && (
          <Row style={{ alignItems: 'center' }}>
            <IconLayout
              size={14}
              color={COLOR.primary._400}
              style={{ paddingRight: 4 }}
            />
            <LinkA link={dashboardLink}>
              <FormText fontType={'R16'} color={COLOR.primary._400}>
                {isMobileWidth ? 'Dashboard' : 'Terra Swap Dashboard'}
              </FormText>
            </LinkA>
          </Row>
        )}
      </StyledLinkBox>
      <SwapBase
        pairList={token.pairList}
        pairType={pairType}
        setSelectedPairToken={setSelectedPairToken}
      />
    </StyledContainer>
  )
}

export default TokenInfo
