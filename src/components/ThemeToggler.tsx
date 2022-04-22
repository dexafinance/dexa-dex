import React, { ReactElement, useContext } from 'react'
// import { func, string } from 'prop-types'
import styled from 'styled-components'
import { DefaultTheme } from 'styled-components'
import { ThemeContext } from '../App'
import { View } from 'components'
import { withTheme } from 'styled-components'

import {
  IconBrightnessUp,
  IconMoonStars,
  // IconDeviceLaptop,
} from '@tabler/icons'

// import { COLOR } from 'consts'

// const Button = styled.button`
//   background: ${({ theme }): string => theme.colors.background};
//   border: 2px solid 1px;
//   color: ${({ theme }): string => theme.colors.onBackground};
//   border-radius: 30px;
//   cursor: pointer;
//   font-size:0.8rem;
//   padding: 0.6rem;
//   }
// `

const ToggleButton = styled(View)`
  -webkit-filter: brightness(100%);
  &:hover {
    -webkit-filter: brightness(150%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
`

const ThemeToggler = ({ theme }: { theme: DefaultTheme }): ReactElement => {
  const themeContext = useContext(ThemeContext)
  const themes = [
    { name: 'light', icon: IconBrightnessUp },
    { name: 'dark', icon: IconMoonStars },
  ]
  // assume always found theme
  const currentTheme = themes.filter((t) => t.name === themeContext?.theme)[0]

  return (
    <ToggleButton style={{ alignItems: 'center' }}>
      <currentTheme.icon
        color={theme.colors.onBackground}
        size={24}
        style={{
          marginLeft: 4,
          borderRadius: 15,
          cursor: 'pointer',
          backgroundColor: theme.colors.surface,
        }}
        onClick={(): void => {
          themeContext?.toggleTheme('')
        }}
      />
    </ToggleButton>
  )

  // return <Button onClick={themeContext?.toggleTheme}>Switch Theme</Button>
}

// ThemeToggler.propTypes = {
//   toggleTheme: func.isRequired,
// }
export default withTheme(ThemeToggler)
