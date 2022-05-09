import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  IconChartBar,
  IconCopy,
  // IconLayout,
} from '@tabler/icons'
import { toast } from 'react-toastify'

import { UTIL, STYLE, COLOR, APIURL } from 'consts'

import {
  FormText,
  Card,
  FormImage,
  Row,
  LinkA,
  FormInput,
  View,
} from 'components'
import { PairType, TokenType, Token, RoutePath } from 'types'
import useLayout from 'hooks/common/useLayout'
import useRoute from 'hooks/common/useRoute'

import usePool from 'hooks/query/pair/usePool'
import useNetwork from 'hooks/common/useNetwork'

const StyledContainer = styled(Card)`
  display: grid;
  background-color: ${({ theme }): string => theme.colors.surface};
  border: 1px solid ${({ theme }): string => theme.colors.surface};
  grid-template-columns: minmax(300px, 500px) 1fr;
  z-index: 99999;
  @media ${STYLE.media.mobile} {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
`

// const StyledFormText = styled(FormText)`
//   margin-bottom: 4px;
// `

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

const SearchBox = styled(View)`
  display: grid;
  grid-template-rows: auto;
  row-gap: 12px;
`

const StyledPair = styled(FormText)`
  margin-right: 8px;
  :hover {
    color: ${({ theme }): string => theme.colors.primaryText};
    cursor: pointer;
  }
`

// selectedPairToken.pairType.dex === DexEnum.terraswap
// try support limit order for all dex
// const supportLimitOrder = (dex: DexEnum):boolean => true

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

const QuickPairs = (): ReactElement => {
  const { insertRouteParam } = useRoute<RoutePath.home>()
  return (
    <Row style={{ paddingLeft: 12 }}>
      <StyledPair
        onClick={(): void => {
          insertRouteParam('symbol', 'LUNA_UST')
        }}
      >
        <div>
          <b>LUNA</b>
          -UST
        </div>
      </StyledPair>
      <StyledPair
        onClick={(): void => {
          insertRouteParam('symbol', 'bLUNA_LUNA')
        }}
      >
        <div>
          <b>bLUNA</b>
          -LUNA
        </div>
      </StyledPair>
      <StyledPair
        onClick={(): void => {
          insertRouteParam('symbol', 'ASTRO_UST')
        }}
      >
        <div>
          <b>ASTRO</b>
          -UST
        </div>
      </StyledPair>
      <StyledPair
        onClick={(): void => {
          insertRouteParam('symbol', 'PRISM_UST')
        }}
      >
        <div>
          <b>PRISM</b>
          -UST
        </div>
      </StyledPair>
    </Row>
  )
}

const TokenInfo = ({
  token,
  pairType,
  setShowList,
  setFilter,
}: {
  token: TokenType
  pairType: PairType
  setShowList: React.Dispatch<React.SetStateAction<boolean>>
  setFilter: (prevState: string) => void
}): ReactElement => {
  const { isMobileWidth } = useLayout()
  const pairContract = pairType.pair

  const chartLink = APIURL.getCoinhallLink({ pairContract })
  // const dashboardLink = APIURL.getDashboardLink({ pairContract })

  return (
    <StyledContainer>
      <View>
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
              <IconChartBar size={14} style={{ paddingRight: 4 }} />
              <LinkA link={chartLink}>
                <FormText fontType={'R16'}>
                  {isMobileWidth ? 'Chart' : 'Coinhall Chart'}
                </FormText>
              </LinkA>
            </Row>
          )}
        </StyledLinkBox>
      </View>
      <SearchBox>
        <View>
          <FormInput
            autoFocus={false}
            onClick={(): void => {
              setFilter('')
              setShowList(true)
            }}
            inputProps={{
              placeholder: 'Enter symbol or pair',
              value: '',
              readOnly: true,
            }}
            onChangeValue={(): void => {
              setFilter('')
              setShowList(true)
            }}
          />
        </View>
        <QuickPairs />
      </SearchBox>
    </StyledContainer>
  )
}

export default TokenInfo
