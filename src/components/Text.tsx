import { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

// import { COLOR } from 'consts'
import View from './View'

const StyledText = styled(View)`
  color: ${({ theme }): string => theme.colors.secondaryText};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
`

const Text = (props: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return <StyledText {...props} />
}

export default Text
