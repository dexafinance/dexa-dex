import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR } from 'consts'

const StyledSolidHr = styled.div`
  background-color: ${({ theme }): string => theme.colors.surface}};
  height: 1px;
`
const StyledDashedHr = styled.div`
  border-bottom: 1px dashed ${COLOR.gray._800};
  height: 1px;
`

const Hr = ({
  type = 'solid',
}: {
  type?: 'solid' | 'dashed'
}): ReactElement => {
  switch (type) {
    case 'dashed':
      return <StyledDashedHr />
    default:
      return <StyledSolidHr />
  }
}
export default Hr
