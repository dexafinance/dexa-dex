import { ReactElement, ReactNode, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { COLOR, STYLE } from 'consts'

import Row from './Row'
import View from './View'
import Text from './Text'
import FormText from './FormText'
import { useTheme } from 'styled-components'

const StyledContainer = styled(View)`
  margin: 0 -2px;
`

const StyledInputContainer = styled(Row)`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${({ theme }): string => theme.colors.surfaceL2};
  &:hover {
    border: 2px solid ${({ theme }): string => theme.colors.borderFocused};
  }
`

const StyledInput = styled.input`
  flex: 1;
  text-align: right;
  padding: 0 12px;
  height: 30px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  min-width: 120px;
  color: ${({ theme }): string => theme.colors.primaryText};
  border: 2px solid ${({ theme }): string => theme.colors.surfaceL2};
  background-color: ${({ theme }): string => theme.colors.surfaceL2};
  :read-only {
    color: ${({ theme }): string => theme.colors.onSurfaceL2Secondary};
  }
  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.6;
    color: ${({ theme }): string => theme.colors.onSurfaceL2Secondary};
  }
  @media ${STYLE.media.tablet} {
    font-size: 16px;
  }
`
const StyledPrefixBox = styled(View)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 2px solid ${({ theme }): string => theme.colors.surfaceL2};
  background-color: ${({ theme }): string => theme.colors.surfaceL2};
  min-width: 80px;
  align-items: center;
  justify-content: center;
`

const StyledPrefixText = styled(Text)`
  padding: 0 16px;
  color: ${({ theme }): string => theme.colors.secondaryText};
  font-weight: 400;
  font-size: 16px;
`

const StyledSuffixBox = styled(View)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid ${({ theme }): string => theme.colors.surfaceL2};
  background-color: ${({ theme }): string => theme.colors.surfaceL2};
  min-width: 80px;
  align-items: center;
  justify-content: center;
`

const StyledSuffixText = styled(Text)`
  padding: 0 16px;
  color: ${({ theme }): string => theme.colors.primaryText};
  text-align: right;
  font-weight: 400;
  font-size: 16px;
`

const FormInput = <T extends string>({
  number,
  inputProps,
  onClick,
  onChangeValue,
  autoFocus,
  prefix,
  suffix,
  isError,
  helperText,
}: {
  number?: boolean
  inputProps?: {
    placeholder?: string
    value?: T
    readOnly?: boolean
    type?: string
    maxLength?: number
    ref?: any
  }
  onClick?: () => void
  onChangeValue?: (value: T) => void
  autoFocus?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  isError?: boolean
  helperText?: string
}): ReactElement => {
  const readOnly = inputProps?.readOnly
  const theme = useTheme()

  const containerStyle: CSSProperties = {}
  let helperTextStyle
  const [onFocus, setOnFocus] = useState(false)
  if (isError) {
    containerStyle.border = `2px solid ${COLOR.error}`
    helperTextStyle = COLOR.error
  } else if (onFocus) {
    containerStyle.border = `2px solid ${theme.colors.borderFocused}`
    helperTextStyle = COLOR.brandColor.primary._400
  }

  return (
    <StyledContainer>
      <StyledInputContainer style={containerStyle}>
        {prefix && (
          <StyledPrefixBox>
            {typeof prefix === 'string' ? (
              <StyledPrefixText>{prefix}</StyledPrefixText>
            ) : (
              prefix
            )}
          </StyledPrefixBox>
        )}
        <StyledInput
          {...inputProps}
          type={number ? 'number' : 'text'}
          autoFocus={autoFocus ? true : false}
          onClick={(): void => {
            onClick?.()
          }}
          onChange={({ target: { value } }): void => {
            onChangeValue?.(value as T)
          }}
          onWheel={({ currentTarget }): void => {
            currentTarget.blur()
          }}
          style={{
            borderRadius: `${prefix ? '0' : '4px'} ${suffix ? '0' : '4px'} ${
              suffix ? '0' : '4px'
              }${prefix ? '0' : '4px'}`,
            textAlign: number? 'right' : 'left'
          }}
          onFocus={(): void => {
            !readOnly && setOnFocus(true)
          }}
          onBlur={(): void => {
            setOnFocus(false)
          }}
        />

        {suffix && (
          <StyledSuffixBox>
            {typeof suffix === 'string' ? (
              <StyledSuffixText>{suffix}</StyledSuffixText>
            ) : (
              suffix
            )}
          </StyledSuffixBox>
        )}
      </StyledInputContainer>
      <FormText fontType={'R14'} color={helperTextStyle}>
        {helperText}
      </FormText>
    </StyledContainer>
  )
}

export default FormInput
