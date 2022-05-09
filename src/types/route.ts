// import { DexEnum } from 'types'

export enum RoutePath {
  home = '/home',

  lpTower = '/lpTower',

  dexa_paper = '/dexa_paper',

  aboutus = '/about-us',

  how_it_works = '/how-it-works',

  send = '/send',
}

export enum TradeTypeEnum {
  buy = 'buy',
  sell = 'sell',
}

export enum TradeKindEnum {
  instant = 'instant',
  limitOrder = 'lo',
  p2p = 'p2p',
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
    tradeKind: TradeKindEnum
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
  [RoutePath.how_it_works]: undefined
  [RoutePath.send]: undefined
}
