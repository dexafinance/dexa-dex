import { ReactElement, ReactNode, useMemo } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import {
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconStar,
  IconCheckbox,
  IconSquare,
} from '@tabler/icons'
// import ANCLogo from 'images/whitelist/ANC.png'
// import MIRLogo from 'images/whitelist/MIR.svg'
import { useTheme } from 'styled-components'

import { COLOR, STYLE, UTIL } from 'consts'

//FormImage,
import { FormText, Card, Row, View, FormInput } from 'components'

import { RoutePath, TokenInfoGoupEnum, TokenType, uToken } from 'types'
import useRoute from 'hooks/common/useRoute'
import {
  SortTypeEnum,
  UseTokenListReturn,
} from 'hooks/common/home/useTokenList'
import useFavoriteToken from 'hooks/common/useFavoriteToken'
import { ExtractPoolResponseType } from 'logics/pool'
import useNetwork from 'hooks/common/useNetwork'

const StyledCard = styled(Card)`
  min-width: 400px;
  margin-bottom: 12px;
  max-width: 600px;
  background: ${({ theme }): string => theme.colors.surface};
  @media ${STYLE.media.tablet} {
    max-width: 600px;
    width: fit-content;
  }
`

const StyledListHeader = styled(Row)`
  padding: 5px;
  border-top: 1px solid ${COLOR.gray._600};
  border-bottom: 1px solid ${COLOR.gray._600};
`

const StyledSort = styled(View)`
  ${STYLE.clickable}
`

const StyledTokenItem = styled(View)`
  ${STYLE.clickable}
  padding:8px 10px 10px 0px;
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
`
//display: none;
const StyledTokenItemBox = styled(View)`
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }): string => theme.colors.surfaceL2};
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media ${STYLE.media.mobile} {
    height: 250px;
  }
`

const StyledIconStar = styled(IconStar)`
  margin-right: 4px;
`

const TokenItem = ({
  token,
  poolInfo,
  closeModal,
}: {
  token: TokenType
  poolInfo: ExtractPoolResponseType
  closeModal?: () => void
}): ReactElement => {
  const { token_0_Price, token_1_PoolSize, token_1_ContractOrDenom } = poolInfo
  const { insertRouteParam } = useRoute<RoutePath.home>()
  const { getSymbolByContractOrDenom, tokenInfo } = useNetwork()
  const { addFavoriteList, removeFavoriteList, favoriteList } =
    useFavoriteToken()
  const theme = useTheme()

  const isFavorite = favoriteList.includes(token.symbol)

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price)
    if (token_0_PriceBn.isLessThan(0.01)) {
      return token_0_PriceBn.toFixed(6)
    }
    return token_0_PriceBn.toFixed(3)
  }, [token_0_Price])

  // const groupSrc = useMemo(() => {
  //   if (token.group === TokenInfoGoupEnum.mirror) {
  //     return MIRLogo
  //   }
  //   if (token.group === TokenInfoGoupEnum.anc) {
  //     return ANCLogo
  //   }
  // }, [token.group])

  const displayUstPoolSize = useMemo(() => {
    const bn = UTIL.toBn(token_1_PoolSize as string)

    return UTIL.formatAmount(bn.multipliedBy(2).toString() as uToken, {
      abbreviate: true,
      toFix: 0,
    })
  }, [token_1_PoolSize])

  const getPoolSizeSafty = useMemo(() => {
    const bn = UTIL.toBn(token_1_PoolSize as string)
    return bn.gte(10 * 1000 * 1000 * 1e6)
      ? COLOR.gray._300
      : bn.gte(1000 * 1000 * 1e6)
      ? COLOR.gray._300
      : bn.lt(1000 * 1e6)
      ? COLOR.rainbow.yellow
      : bn.lt(100 * 1000 * 1e6)
      ? COLOR.rainbow.yellow
      : COLOR.gray._300
  }, [token_1_PoolSize])

  return (
    <StyledTokenItem
      onClick={(): void => {
        insertRouteParam(
          'symbol',
          token.symbol + '_' + tokenInfo[token.pairList[0].base].symbol
        )
        closeModal && closeModal()
      }}
    >
      <View>
        <Row style={{ alignItems: 'center' }}>
          <StyledIconStar
            fill={isFavorite ? COLOR.rainbow.yellow : 'none'}
            color={isFavorite ? COLOR.rainbow.yellow : COLOR.gray._400}
            onClick={(event): void => {
              event.stopPropagation()
              isFavorite
                ? removeFavoriteList({ symbol: token.symbol })
                : addFavoriteList({ symbol: token.symbol })
            }}
          />
          {/* <View style={{ position: 'relative' }}>
          <FormImage
            src={token.logo}
            size={20}
            style={{
              borderRadius: 15,
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          {groupSrc && (
            <View style={{ position: 'absolute', right: -5, bottom: -5 }}>
              <FormImage
                src={groupSrc}
                size={16}
                style={{ borderRadius: '50%', border: '1px solid black' }}
              />
            </View>
          )}
        </View> */}
          <FormText fontType="R14" color={theme.colors.primaryText}>
            {token.symbol}
          </FormText>
          <FormText fontType="R14" color={theme.colors.tertiary}>
            /{getSymbolByContractOrDenom(token_1_ContractOrDenom)}
          </FormText>
        </Row>
      </View>
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <FormText fontType="R14">{displayPrice}</FormText>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <FormText fontType="R14" color={getPoolSizeSafty}>
          {displayUstPoolSize}
        </FormText>
      </View>
    </StyledTokenItem>
  )
}

const SortTitle = ({
  title,
  sortBy,
  selectedSortBy,
  sortDesc,
  onClickSort,
}: {
  title: ReactNode
  sortBy: SortTypeEnum
  selectedSortBy: SortTypeEnum
  sortDesc: boolean
  onClickSort: (value: SortTypeEnum) => void
}): ReactElement => {
  return (
    <StyledSort
      style={{ flex: 1 }}
      onClick={(): void => {
        onClickSort(sortBy)
      }}
    >
      <Row
        style={{
          alignItems: 'flex-start',
          justifyContent: sortBy === 'price' ? 'flex-end' : 'center',
        }}
      >
        {typeof title === 'string' ? (
          <FormText fontType="R14">{title}</FormText>
        ) : (
          title
        )}
        <View style={{ paddingTop: 5, paddingLeft: 5 }}>
          {sortBy === selectedSortBy &&
            (sortDesc ? (
              <IconChevronDown size={14} />
            ) : (
              <IconChevronUp size={14} />
            ))}
        </View>
      </Row>
    </StyledSort>
  )
}

const StyledGroupFilter = styled(Row)`
  ${STYLE.clickable}
  align-items: center;
`

const GroupFilter = ({
  selected,
  title,
  group,
  setGroupFilter,
}: {
  selected: boolean
  title: string
  group: TokenInfoGoupEnum
  setGroupFilter: React.Dispatch<React.SetStateAction<TokenInfoGoupEnum[]>>
}): ReactElement => {
  const theme = useTheme()
  return (
    <StyledGroupFilter
      onClick={(): void => {
        setGroupFilter((ori) => {
          if (selected) {
            return ori.filter((x) => x !== group)
          }

          return ori.concat([group])
        })
      }}
    >
      {selected ? (
        <IconCheckbox color={theme.colors.secondary} />
      ) : (
        <IconSquare />
      )}
      <FormText
        color={selected ? theme.colors.primaryText : theme.colors.secondary}
      >
        {title}
      </FormText>
    </StyledGroupFilter>
  )
}

const TokenList = ({
  closeModal,
  tokenListReturn,
}: {
  closeModal?: () => void
  tokenListReturn: UseTokenListReturn
}): ReactElement => {
  const {
    filter,
    setFilter,
    sortBy,
    sortDesc,
    sortedList,
    onClickSort,
    groupFilter,
    setGroupFilter,
  } = tokenListReturn

  const { favoriteList } = useFavoriteToken()

  const favoriteSortedList = _.filter(sortedList, (x) =>
    favoriteList.includes(x.token.symbol)
  )
  const remainSortedList = _.filter(
    sortedList,
    (x) => false === favoriteList.includes(x.token.symbol)
  )

  return (
    <StyledCard>
      <Row style={{ paddingBottom: 12, alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 4 }}>
          <FormInput
            autoFocus
            inputProps={{
              value: filter,
              placeholder: 'Symbol, Name',
            }}
            onChangeValue={(value): void => setFilter(value)}
          />
        </View>
        {closeModal && <IconX onClick={closeModal} size={24} />}
      </Row>
      <Row style={{ justifyContent: 'flex-end', marginBottom: 8 }}>
        <View style={{ paddingRight: 10 }}>
          <GroupFilter
            title="ANC"
            selected={groupFilter.includes(TokenInfoGoupEnum.anc)}
            group={TokenInfoGoupEnum.anc}
            setGroupFilter={setGroupFilter}
          />
        </View>
        <GroupFilter
          title="MIRROR"
          selected={groupFilter.includes(TokenInfoGoupEnum.mirror)}
          group={TokenInfoGoupEnum.mirror}
          setGroupFilter={setGroupFilter}
        />
      </Row>
      <StyledListHeader>
        <SortTitle
          title={'Token'}
          sortBy={SortTypeEnum.name}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
        <SortTitle
          title={<FormText fontType="R14">Price</FormText>}
          sortBy={SortTypeEnum.price}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
        <SortTitle
          title={'TVL'}
          sortBy={SortTypeEnum.poolSize}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
      </StyledListHeader>
      <StyledTokenItemBox>
        {_.map(favoriteSortedList.concat(remainSortedList), (item, index) => {
          if (item.poolInfo) {
            return (
              <TokenItem
                key={`sortedList-${index}`}
                poolInfo={item.poolInfo}
                token={item.token}
                closeModal={closeModal}
              />
            )
          }
        })}
      </StyledTokenItemBox>
    </StyledCard>
  )
}

export default TokenList
