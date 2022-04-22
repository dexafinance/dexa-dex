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
  border: 2px solid ${({ theme }): string => theme.colors.background};
  &:hover {
    border: 2px solid ${({ theme }): string => theme.colors.borderFocused};
  }
`

const StyledInput = styled.input`
  flex: 1;
  padding: 0 12px;
  height: 30px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  min-width: 120px;
  color: ${({ theme }): string => theme.colors.primaryText};
  background-color: ${({ theme }): string => theme.colors.inputBackground};
  border: 2px solid ${({ theme }): string => theme.colors.inputBackground};
  :read-only {
    background-color: ${COLOR.gray._100};
    cursor: not-allowed;
  }
  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.6;
  }
  @media ${STYLE.media.tablet} {
    font-size: 16px;
  }
`
const StyledSuffixBox = styled(View)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid ${({ theme }): string => theme.colors.inputBackground};
  min-width: 80px;
  align-items: center;
  justify-content: center;
`

const StyledSuffixText = styled(Text)`
  padding: 0 16px;
  color: ${({ theme }): string => theme.colors.primaryText};
  font-weight: 400;
  font-size: 16px;
`

const FormInput = <T extends string>({
  number,
  inputProps,
  onChangeValue,
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
  }
  onChangeValue?: (value: T) => void
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
        <StyledInput
          {...inputProps}
          type={number ? 'number' : 'text'}
          onChange={({ target: { value } }): void => {
            onChangeValue?.(value as T)
          }}
          onWheel={({ currentTarget }): void => {
            currentTarget.blur()
          }}
          style={{
            borderRadius: suffix ? '4px 0 0 4px' : 4,
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
