import { CSSProperties, ReactElement } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import { STYLE } from 'consts'

import Row from 'components/Row'
import FormText from 'components/FormText'

const StyledContainer = styled(Row)`
  border-radius: 6px;
  height: fit-content;
  @media ${STYLE.media.tablet} {
    width: 100%;
  }
`

const StyledTabItem = styled(FormText)<{ selected: boolean }>`
  ${STYLE.clickable}
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 13px;
  width: 104px;
  height: 28px;
  border-bottom: ${({ selected, theme }): string =>
    selected ? `2px solid ${theme.colors.borderFocused}` : ''};
  color: ${({ selected, theme }): string =>
    selected ? theme.colors.primaryText : theme.colors.secondaryText};
  margin-bottom: 12px;
`

const SelectTab = <T,>({
  options,
  selected,
  onSelect,
  containerStyle,
}: {
  options: { value: T; label: string }[]
  selected: T
  onSelect: (value: T) => void
  containerStyle?: CSSProperties
}): ReactElement => {
  return (
    <StyledContainer style={containerStyle}>
      {_.map(options, (option, index) => {
        return (
          <StyledTabItem
            key={`StyledTabItem-${index}`}
            selected={option.value === selected}
            onClick={(): void => {
              onSelect(option.value)
            }}
          >
            {option.label}
          </StyledTabItem>
        )
      })}
    </StyledContainer>
  )
}

export default SelectTab
