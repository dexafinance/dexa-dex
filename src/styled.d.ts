// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    colors: {
      primary: string
      secondary: string
      tertiary: string
      background: string
      surface: string
      banner: string
      inputBackground: string
      border: string
      borderFocused: string
      onPrimary: string
      onSecondary: string
      onBackground: string
      onSurface: string
      onBanner: string
      primaryText: string
      secondaryText: string
      orderList: {
        buyColor: string
        sellColor: string
      }
    }
  }
}
