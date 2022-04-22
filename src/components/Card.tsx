import styled from 'styled-components'

// import { COLOR } from 'consts'
import View from './View'

const Card = styled(View)`
  padding: 12px;
  border: 1px solid ${({ theme }): string => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  background-color: ${({ theme }): string => theme.colors.background};
`

export default Card
