import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'
import { View } from 'components'
// const StyledSolidVr = styled.div`
//   background-color: ${COLOR.gray._900};
//   width: 1px;
// `
// const StyledDashedVr = styled.div`
//   border-bottom: 1px dashed ${COLOR.gray._900};
//   width: 1px;
// `

const Banner = styled(View)`
  min-height: 100%;
  width: 100%;
  background: ${({ theme }): string => theme.colors.banner};
  color: ${({ theme }): string => theme.colors.onBanner};
  text-align: center;
  padding: 4px 20px;
  display: inline-block;
  @media ${STYLE.media.tablet} {
    padding: 4px 8px;
    margin-bottom: 12px;
  }
`
// const StyledAnnouncement = styled(View)`
//   padding: 0px 20px;
// `

const InlineLink = styled.a`
  display: inline-block;
  color: ${({ theme }): string => theme.colors.onBanner};
  &:hover {
    color: ${({ theme }): string => theme.colors.onBackground};
    -webkit-filter: brightness(150%);
  }
`

const Announcement = ({ url = '' }: { url?: string }): ReactElement => {
  return (
    <Banner>
      <InlineLink href={url} target="_blank" rel="noopener noreferrer">
        Dexa Finance beta launch just went live from 2022 April 17th, see more
        here
      </InlineLink>
    </Banner>
  )
}
export default Announcement
