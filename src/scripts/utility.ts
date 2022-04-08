import { Coin } from '@terra-money/terra.js'

export const DEFAULT_CURRENCY = `uusd`
export const BASE_DENOM = `uluna`
export const ASSET_URL = 'https://assets.terra.money'
export const TERRA_ADDRESS_REGEX = /(terra[0-9][a-z0-9]{38})/g

export const splitCoinData = (
  coin: string
): { amount: string; denom: string } => {
  try {
    const coinData = Coin.fromString(coin)
    const amount = coinData.amount.toString()
    const denom = coinData.denom
    return { amount, denom }
  } catch {
    const denom = coin.match(TERRA_ADDRESS_REGEX)?.[0]
    const amount = coin.replace(TERRA_ADDRESS_REGEX, '')
    if (denom && amount) {
      return { amount, denom }
    }
  }

  return { amount: '0', denom: '' }
}

export const isIbcDenom = (string = ''): boolean => string.startsWith('ibc/')
