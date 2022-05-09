import { ReactElement, createContext } from 'react'
import styled from 'styled-components'
import routes from 'routes'

import { COLOR } from 'consts'

import { View } from 'components'

import AppProvider from './AppProvider'
import NavMenu from './NavMenu'
import Footer from './Footer'
import SelectWallet from './SelectWallet'
import PostTxResult from './PostTxResult'

import useNetwork from '../hooks/common/useNetwork'

import useApp from './useApp'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from 'components/GlobalStyles'
import { lightTheme, darkTheme } from 'consts/color'
import { useDarkMode } from 'components/useDarkMode'

//background: linear-gradient(${COLOR.gray._950}, #f8e5d0);
const StyledContainer = styled(View)`
  min-height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`
const Banner = styled(View)`
  min-height: 100%;
  background: ${COLOR.warning};
  color: ${COLOR.gray._950};
  text-align: center;
`

const StyledBody = styled(View)`
  flex: 1;
`

const InitializeApp = (): ReactElement => {
  const { initComplete } = useApp()
  const { isMainnet } = useNetwork()

  return (
    <>
      {initComplete && (
        <StyledContainer>
          {!isMainnet && <Banner>TESTNET</Banner>}
          <NavMenu />
          <StyledBody>{routes()}</StyledBody>
          <Footer />
        </StyledContainer>
      )}
      <SelectWallet />
      <PostTxResult />
    </>
  )
}

interface ThemeContextInterface {
  theme: string
  toggleTheme: (forceTheme: string) => void
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null)

const App = (): ReactElement => {
  // const [theme, setTheme] = useState('light')
  // const themeToggler = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light')
  // }
  const [theme, toggleTheme, mountedComponent] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if (!mountedComponent) return <div />

  return (
    <AppProvider>
      <ThemeProvider theme={themeMode}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <GlobalStyles />
          <InitializeApp />
        </ThemeContext.Provider>
      </ThemeProvider>
    </AppProvider>
  )
}

export default App
