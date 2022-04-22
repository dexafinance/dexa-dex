import { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'
// import catFootprintPng from 'images/cat_footprint.png'
import QrCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

import { STYLE, WHITELIST } from 'consts'

import { View, Card, FormText, LinkA } from 'components'
//IconSquareCheck
import { IconSquare, IconSquareCheck } from '@tabler/icons'

const StyledContainer = styled(View)`
  ${STYLE.setMediaWidth()}
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`

//  background-image: url(${catFootprintPng});
//  background-size: cover;

const StyledCard = styled(Card)``

const StyledSection = styled(View)`
  margin-bottom: 12px;
`

const StyledMainTitle = styled(FormText)``

const StyledSubTitle = styled(FormText)``
const StyledDesc = styled(FormText)`
  flex-direction: row;
  align-items: center;
  white-space: pre-wrap;
  word-break: normal;
  background-color: ${({ theme }): string => theme.colors.background};
  color: ${({ theme }): string => theme.colors.primaryText};
  width: fit-content;
  padding: 0 5px;
`

const Main = (): ReactElement => {
  const theme = useTheme()
  return (
    <StyledContainer>
      <StyledMainTitle fontType="B32">About us</StyledMainTitle>
      <StyledCard>
        <StyledSection>
          <StyledSubTitle fontType="B24">What is Dexa Finance</StyledSubTitle>
          <StyledDesc>
            Hey #LUNAtics! Tired of monitoring price all day for trading in DEXs
            such as terraswap, astroport? We have your back. Introducing Dexa
            Finance - the DEX on Terra Blockchain that allows limit order. We
            are in final stage to publish beta version.
          </StyledDesc>
          <StyledDesc>
            Dexa Finance was made by an engineer turned product manager, who
            loves the Terra ecosystem and its stablecoin $UST concept. I'm also
            a frequent trader and have tried several trading platform, from CEXs
            such as Binance to various DEXs. While it is superior to keep UST in
            our own non-custodial wallet for security and also easy to put to
            Anchor Protocol to earn yield, when we want to buy or sell tokens it
            is not easy to buy or sell at a good price. Several times I had to
            transfer my LUNA or UST to CEXs to trade. Furthermore, being a
            product manager and working very closely with several product
            designers for several years, I think there are many opportunity to
            add value to DeFi in term of usability especially for non-tech.
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">
            Alternatives for limit order on Terra
          </StyledSubTitle>
          <StyledDesc>
            The only option we have right now is Miaw Trader at
            https://miaw-trader.com I have used it for some times but found it
            still lack behind compared to experience on CEXs. Below are some
            limitation I find from community feedbacks
          </StyledDesc>
          <StyledDesc>
            1/ Limit order is only supported on #terraswap pools which has very
            high slippage due to its low liquidity. More pools should be added
            especially #astroport with low slippage
          </StyledDesc>
          <StyledDesc>
            2/ Having to pay fee in MIAW create a friction point. CEXs/DEXs
            usually allow to pay fee in trading pair in form of slippage fee or
            maker fee. How about being able to pay fee in $UST?
          </StyledDesc>
          <StyledDesc>
            3/ Lack of information on how it works and lack of audit for smart
            contract risks.
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">Join our waiting list</StyledSubTitle>
          <StyledDesc>We're all ears from you. </StyledDesc>
          <StyledDesc>
            <LinkA link="https://docs.google.com/forms/d/e/1FAIpQLScRnfOUbe2lSAWnmUDSMaezg_42WXVLM9CU8iUW28GxKFiBKg/viewform">
              <FormText
                fontType={'R18'}
                color={theme.colors.orderList.buyColor}
              >
                Click here to join our waiting list and give early feedback so
                we can serve you better
              </FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>Or</StyledDesc>
          <StyledDesc>
            <LinkA link="https://discord.gg/ngQ3fVJD">
              <FormText
                fontType={'R18'}
                color={theme.colors.orderList.buyColor}
              >
                Join our Discord for further discussion.
              </FormText>
            </LinkA>
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">
            Token Distribution plan
          </StyledSubTitle>
          <StyledDesc>
            No plan in beta launching, revenues will be used for security,
            audit, team, operations. Our target is to gradually convert to DAO
            with sustainable revenue streams for operation with best interest
            for #LUNAtics community.
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">
            Roadmap for Dexa Finance
          </StyledSubTitle>
          {/* IconSquareCheck */}
          <StyledDesc>
            As miaw-trader team seems inactive and have little maintainence and
            improvements, we have decided to step up to help Terra ecosystem
            grow even more. At initial stage, we have forked both limit order
            and web fronend from miaw-trader and make some important
            improvements. Kudos and really appreciate miaw-team for their work.
            If you are from miaw-trader team don't hesitate to contact us
            through twitter or discord for possible cooperation.
          </StyledDesc>
          <br />
          <StyledDesc>Following are what on our roadmap:</StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={theme.colors.secondaryText} /> Support limit
            order on astroport pool with many new pairs (PRISM, xASTRO, MARS,
            LOCAL, KUJI, ...)
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={theme.colors.secondaryText} /> Fee payment
            in UST, orders with higher fee will be prioritized to get executed
            first
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={theme.colors.secondaryText} /> Improve UX,
            includes
          </StyledDesc>
          <StyledDesc>
            - Candlestick chart for price movement visualization
          </StyledDesc>
          <StyledDesc>- Show all limit orders on selected pair</StyledDesc>
          <StyledDesc>- Easy fee payment option</StyledDesc>
          <StyledDesc>- Dark mode 🙌</StyledDesc>
          <StyledDesc>
            <IconSquare color={theme.colors.secondaryText} /> Smart contract
            executor for small delay time
          </StyledDesc>
          <StyledDesc>
            <IconSquare color={theme.colors.secondaryText} /> Adding testcases
            and security audit
          </StyledDesc>
          <StyledDesc>
            <IconSquare color={theme.colors.secondaryText} /> More to be defined
            and collection from community feedbacks
          </StyledDesc>
          <StyledDesc>
            <LinkA link="https://docs.google.com/forms/d/e/1FAIpQLScRnfOUbe2lSAWnmUDSMaezg_42WXVLM9CU8iUW28GxKFiBKg/viewform">
              <FormText fontType={'R18'}>
                Again, click here to join our waiting list and give your
                brilliant ideas so we can serve you better
              </FormText>
            </LinkA>
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">Transparancy</StyledSubTitle>
          <StyledDesc>
            Cryptocurrencies and blockchain technologies are still in early
            stage with many risks, to earn trust from community we put
            transparency and security at best, that's why we opensourced all our
            source codes and anyone can build the smart contract themselves and
            check the checksum of deployed smart contract to make sure the
            deployed version is in synced with the published source code. To
            address security, part of the revenue streams are allocated for
            following purposes:
          </StyledDesc>
          <StyledDesc>- Security audit</StyledDesc>
          <StyledDesc>
            - Insurance for users interacting with smart contract
          </StyledDesc>
          <StyledDesc>- Bug bounty programs</StyledDesc>
          <br />
          <StyledDesc>Related source codes can be found at:</StyledDesc>
          <LinkA link="https://github.com/dexafinance/dexa-limit-order">
            <FormText>- dexa-limit-order smart contract source code</FormText>
          </LinkA>
          <LinkA link="https://github.com/dexafinance/dexa-dex">
            <FormText>- dexa-dex web frontend source code</FormText>
          </LinkA>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">Need support?</StyledSubTitle>
          <StyledDesc>
            <LinkA link="https://discord.gg/ngQ3fVJD">
              <FormText fontType={'R18'}>- Discord</FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>
            <LinkA link="https://github.com/dexafinance/dexa-dex/issues">
              <FormText fontType={'R18'}>- Github issues</FormText>
            </LinkA>
          </StyledDesc>
        </StyledSection>
        <StyledSection>
          <StyledSubTitle fontType="B24">Support Developer</StyledSubTitle>

          <CopyToClipboard
            text={WHITELIST.address.dexaDeveloper}
            onCopy={(): void => {
              toast(`Copied address!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            }}
          >
            <StyledDesc>
              {`- ${WHITELIST.address.dexaDeveloper} (click to copy)`}
            </StyledDesc>
          </CopyToClipboard>
          <br />
          <QrCode value={WHITELIST.address.dexaDeveloper} size={200} />
        </StyledSection>
      </StyledCard>
    </StyledContainer>
  )
}

export default Main
