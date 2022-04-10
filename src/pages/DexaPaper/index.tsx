import { ReactElement } from 'react'
import { Route } from 'react-router-dom'

import { RoutePath } from 'types'

import Main from './Main'

const DexaPaper = (): ReactElement => {
  return <Route exact path={RoutePath.aboutus} component={Main} />
}

export default DexaPaper
