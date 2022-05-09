import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'

import logo from 'images/dexa/dexa_logo.png'

import { COLOR, STYLE } from 'consts'

import { FormText, Row, FormImage, View, Modal } from 'components'

import { RoutePath, TokenKeyEnum } from 'types'
import useRoute from 'hooks/common/useRoute'
import useLayout from 'hooks/common/useLayout'
import { IconChevronDown } from '@tabler/icons'

import { TradeTypeEnum, TradeKindEnum, LpProvideTypeEnum } from 'types'
import { useTheme } from 'styled-components'

const StyledContainer = styled(Row)`
  align-items: center;
`

const StyledBrand = styled(Row)`
  ${STYLE.clickable};
  align-items: center;
`

const StyledMenu = styled(Row)`
  padding-left: 10px;
`
const StyledMenuItem = styled(Row)`
  ${STYLE.clickable};
  align-items: center;
  padding-right: 19px;
  text-transform: uppercase;

  @media ${STYLE.media.tablet} {
    padding-right: 0;
    padding: 20px 0;
    justify-content: space-between;
  }
`

const Menu = (): ReactElement => {
  const { push } = useRoute()
  const location = useLocation()
  const { pathname } = location
  const { isTabletWidth } = useLayout()
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
  const theme = useTheme()

  let menuList = [
    // {
    //   to: RoutePath.lpTower,
    //   title: 'Lp Tower',
    // },
    {
      to: RoutePath.aboutus,
      title: 'About Us',
    },
    {
      to: RoutePath.how_it_works,
      title: 'How it works',
      type: 'EXTERNAL_URL',
      url: 'https://buttery-elderberry-89d.notion.site/How-it-works-db3352b233574f7b9433985223b04d36',
    },
  ]

  const selectedMenu = menuList.find((x) =>
    x.to.includes(pathname.split('/')[1])
  )

  return isTabletWidth ? (
    <>
      <Row style={{ alignItems: 'center' }}>
        <FormImage src={logo} size={26} style={{ marginRight: 6 }} />
        <Row
          onClick={(): void => {
            setIsOpenMobileMenu(true)
          }}
          style={{ alignItems: 'center' }}
        >
          <FormText fontType="B14" color={theme.colors.onBackground}>
            {selectedMenu?.title || 'Menu'}
          </FormText>

          <IconChevronDown
            color={COLOR.gray._900}
            size={21}
            style={{
              marginLeft: 4,
              border: `2px solid ${COLOR.gray._900}`,
              borderRadius: 8,
            }}
          />
        </Row>
      </Row>
      <Modal isOpen={isOpenMobileMenu}>
        <View style={{ backgroundColor: COLOR.white }}>
          <Row
            style={{ alignItems: 'center', height: 60, padding: '0 16px' }}
            onClick={(): void => {
              push(RoutePath.home, {
                tradeType: TradeTypeEnum.buy,
                tradeKind: TradeKindEnum.limitOrder,
                lpType: LpProvideTypeEnum.provide,
                // limitOrder: 1,
                // dex: DexEnum.astroport,
                symbol: TokenKeyEnum.LUNA + '_' + TokenKeyEnum.UST,
              })
              setIsOpenMobileMenu(false)
            }}
          >
            <FormImage src={logo} size={30} style={{ marginRight: 6 }} />
            <FormText fontType="B14" style={{ color: '#313148' }}>
              Dexa Finance
            </FormText>
          </Row>
          <View style={{ padding: '0 22px' }}>
            {_.map(menuList, (menu, index) => {
              const isActive = menu.to.includes(pathname.split('/')[1])
              if (menu.type !== 'EXTERNAL_URL') {
                return (
                  <StyledMenuItem
                    key={`menuList-${index}`}
                    onClick={(): void => {
                      push(menu.to)
                      setIsOpenMobileMenu(false)
                    }}
                  >
                    <FormText
                      fontType="B16"
                      style={{
                        borderBottom: isActive
                          ? `1px solid ${COLOR.brandColor.primary._600}`
                          : '1px solid #eeeeee00',
                      }}
                    >
                      {menu.title}
                    </FormText>
                  </StyledMenuItem>
                )
              } else {
                return (
                  <StyledMenuItem
                    key={`menuList-${index}`}
                    // onClick={(): void => {
                    //   push(menu.to)
                    //   setIsOpenMobileMenu(false)
                    // }}
                  >
                    <a
                      href={menu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormText
                        fontType="B16"
                        style={{
                          borderBottom: isActive
                            ? `1px solid ${COLOR.brandColor.primary._600}`
                            : '1px solid #eeeeee00',
                        }}
                      >
                        {menu.title}
                      </FormText>
                    </a>
                  </StyledMenuItem>
                )
              }
            })}
          </View>
        </View>
      </Modal>
    </>
  ) : (
    <StyledContainer>
      <StyledBrand
        onClick={(): void =>
          push(RoutePath.home, {
            tradeType: TradeTypeEnum.buy,
            tradeKind: TradeKindEnum.limitOrder,
            lpType: LpProvideTypeEnum.provide,
            // limitOrder: 1,
            // dex: DexEnum.astroport,
            symbol: TokenKeyEnum.LUNA + '_' + TokenKeyEnum.UST,
          })
        }
      >
        <FormImage src={logo} size={30} style={{ marginRight: 6 }} />
        <FormText
          fontType={{ default: 'B24', mobile: 'B20' }}
          color={theme.colors.onBackground}
        >
          Dexa Finance
        </FormText>
      </StyledBrand>

      <StyledMenu>
        {_.map(menuList, (menu, index) => {
          const isActive = menu.to.includes(pathname.split('/')[1])

          if (menu.type !== 'EXTERNAL_URL') {
            return (
              <StyledMenuItem
                key={`menuList-${index}`}
                onClick={(): void => {
                  push(menu.to)
                }}
              >
                <FormText
                  fontType="B16"
                  color={theme.colors.primary}
                  style={{
                    borderBottom: isActive
                      ? `1px solid ${theme.colors.onBackground}`
                      : '1px solid #eeeeee00',
                  }}
                >
                  {menu.title}
                </FormText>
              </StyledMenuItem>
            )
          } else {
            return (
              <StyledMenuItem key={`menuList-${index}`}>
                <a href={menu.url} target="_blank" rel="noopener noreferrer">
                  <FormText
                    fontType="B16"
                    color={theme.colors.primary}
                    style={{
                      borderBottom: isActive
                        ? `1px solid ${COLOR.brandColor.primary._600}`
                        : '1px solid #eeeeee00',
                    }}
                  >
                    {menu.title}
                  </FormText>
                </a>
              </StyledMenuItem>
            )
          }
        })}
      </StyledMenu>
    </StyledContainer>
  )
}

export default Menu
