import { createGlobalStyle } from 'styled-components'
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }): string => theme.colors.background};
    color: ${({ theme }): string => theme.colors.secondaryText};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  `
