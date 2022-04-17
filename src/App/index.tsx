import { ReactElement } from 'react'
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

const StyledContainer = styled(View)`
  min-height: 100%;
  background: linear-gradient(${COLOR.gray._50}, #f8e5d0);
`
const Banner = styled(View)`
  min-height: 100%;
  background: ${COLOR.warning};
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

const App = (): ReactElement => {
  return (
    <AppProvider>
      <InitializeApp />
    </AppProvider>
  )
}

export default App
