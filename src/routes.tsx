import { ReactElement } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from 'pages/Home'
import LpTowerPage from 'pages/LpTower'
import DexaPaperPage from 'pages/DexaPaper'
import SendMiawPage from 'pages/SendMiaw'

import { RoutePath } from 'types'

const SwitchPages = (): ReactElement => {
  return (
    <Switch>
      <Redirect exact from="/" to={RoutePath.home + '?symbol=Luna'} />
      <Route path={RoutePath.home} component={HomePage} />
      <Route path={RoutePath.lpTower} component={LpTowerPage} />
      <Route path={RoutePath.dexa_paper} component={DexaPaperPage} />
      <Route path={RoutePath.send} component={SendMiawPage} />
    </Switch>
  )
}
export default SwitchPages
