// import { DexEnum } from 'types'

export enum RoutePath {
  home = '/home',

  lpTower = '/lpTower',

  dexa_paper = '/dexa_paper',

  aboutus = '/about-us',

  send = '/send',
}

export enum TradeTypeEnum {
  buy = 'buy',
  sell = 'sell',
}

export enum LpProvideTypeEnum {
  provide = 'provide',
  withdraw = 'withdraw',
}

export enum LpStakeTypeEnum {
  stake = 'stake',
  unstake = 'unstake',
}

export type RouteParams = {
  [RoutePath.home]: {
    tradeType: TradeTypeEnum
    lpType: LpProvideTypeEnum
    // limitOrder: number
    // dex: DexEnum
    symbol: string
  }
  [RoutePath.lpTower]: {
    lpProvideType: LpProvideTypeEnum
    lpStakeType: LpStakeTypeEnum
    lpOfLpIndex: string
    lpStakingIndex: string
  }
  [RoutePath.dexa_paper]: undefined
  [RoutePath.aboutus]: undefined
  [RoutePath.send]: undefined
}
