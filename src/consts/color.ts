import { DefaultTheme } from 'styled-components'

const white = '#ffffff'

const gray = {
  _950: '#020203',
  _930: '#181A1B',
  _900: '#292B2D',
  _800: '#303336',
  _600: '#45494E',
  _400: '#6B7178',
  _300: '#858C94',
  _100: '#ebeef1',
  _50: '#fafafa',
}

// const primary = {
//   _600: '#272639',
//   _500: '#313047',
//   _400: '#5a596c',
//   _200: '#adacb5',
// }

const rainbow = {
  red: '#FF6663',
  orang: '#FEB144',
  yellow: '#ffd400',
  green: '#9EE09E',
  blue: '#507AD0',
  navy: '#393986',
  violet: '#CC99C9',
}

const gold = '#ffd700'
const siver = '#c0c0c0'
const bronze = '#cd7f32'

const error = '#FE5E53'

const success = '#52C858'

const warning = '#f6b54a'

const text = gray._600

const placebo = {
  primary_1: '#7dddec',
  primary_2: '#216c75',
}

// tool to generate tint & shade https://maketintsandshades.com/#313047, base ~ tone 500, each step is two
const brandColor = {
  primary: {
    default: '#5a596c',
    dark: '#272639',
    light: '#adacb5',
    _600: '#272639',
    _400: '#5a596c',
    _200: '#adacb5',
  },
  secondary: {
    default: gray._600,
    _600: gray._600,
    _400: gray._400,
    _300: gray._300,
  },
}

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    primary: brandColor.primary.default,
    secondary: brandColor.secondary.default,
    tertiary: brandColor.secondary._300,
    background: gray._50,
    surface: white,
    banner: '#fcd535',
    inputBackground: gray._100,
    border: gray._600,
    borderFocused: brandColor.primary.default,
    onPrimary: white,
    onSecondary: gray._800,
    onBackground: gray._800,
    onSurface: gray._800,
    onBanner: gray._800,
    primaryText: brandColor.primary.default,
    secondaryText: brandColor.secondary.default,
    orderList: {
      buyColor: '#0db774',
      sellColor: '#ac3141',
    },
  },
}

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    primary: gray._50,
    secondary: gray._100,
    tertiary: gray._100,
    background: '#14151a',
    surface: gray._800,
    inputBackground: '#292d35',
    border: gray._600,
    borderFocused: '#f0b90b',
    banner: '#1e2025',
    onPrimary: gray._50,
    onSecondary: gray._50,
    onBackground: '#fcd535',
    onSurface: gray._50,
    onBanner: '#848e9c',
    primaryText: '#eaecef',
    secondaryText: '#b7bdc6',
    orderList: {
      buyColor: '#0db774',
      sellColor: '#f6465d',
    },
  },
}

export default {
  brandColor,
  white,

  gray,

  error,
  success,
  warning,

  text,

  rainbow,
  gold,
  siver,
  bronze,

  placebo,
}
