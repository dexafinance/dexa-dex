import { ButtonHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR } from 'consts'

const StyledDefaultButton = styled.button<ButtonProps>`
  width: 100%;
  font-size: 18px;
  text-align: center;
  border-style: none;
  box-sizing: border-box;
  user-select: none;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.3px;
  border-radius: 21px;
  height: 36px;
  cursor: pointer;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const StyledPrimaryButton = styled(StyledDefaultButton)<ButtonProps>`
  color: ${({ color }): string => (color ? color : COLOR.gray._50)};
  background: ${({ backgroundColor }): string =>
    backgroundColor ? backgroundColor : COLOR.brandColor.primary._400};
  -webkit-filter: brightness(100%);
  :hover {
    -webkit-filter: brightness(130%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
  :active {
    -webkit-filter: brightness(110%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
  :disabled {
    opacity: 0.6;
    animation: none;
  }
`

const StyledOutlineButton = styled(StyledDefaultButton)<ButtonProps>`
  color: ${COLOR.gray._800};
  background: transparent;
  border: 1px solid ${COLOR.gray._800};

  :hover {
    color: ${COLOR.gray._950};
    border: 1px solid ${COLOR.brandColor.primary._400};
  }
  :active {
    color: ${COLOR.gray._600};
    background: transparent;
  }
`

export type ButtonProps = {
  kind?: 'primary' | 'outline'
  color?: string
  backgroundColor?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ kind = 'primary', ...rest }: ButtonProps): ReactElement => {
  switch (kind) {
    case 'outline':
      return <StyledOutlineButton type="button" {...rest} />
    default:
      return <StyledPrimaryButton type="button" {...rest} />
  }
}

export default Button
