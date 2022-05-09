import BigNumber from 'bignumber.js'
import _ from 'lodash'
import {
  Token,
  uToken,
  DexEnum,
  TokenDenomEnum,
  AssetInfo,
  ContractAddr,
} from 'types'

import asset from './asset'
import currency from './currency'

const truncate = (text: string = '', [h, t]: number[] = [8, 6]): string => {
  const head = text.slice(0, h)
  const tail = text.slice(-1 * t, text.length)
  return text.length > h + t ? [head, tail].join('...') : text
}

const jsonTryParse = <T>(value: string): T | undefined => {
  try {
    return JSON.parse(value) as T
  } catch {
    return undefined
  }
}

const setComma = (str: string | number): string => {
  const parts = _.toString(str).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const delComma = (str: string | number): string => {
  return _.toString(str).replace(/,/g, '')
}

const extractNumber = (str: string): string => str.replace(/\D+/g, '')

const isNativeTerra = (str: string): boolean =>
  str.startsWith('u') &&
  currency.currencies.includes(str.slice(1).toUpperCase())

const isNativeDenom = (str: string): boolean =>
  str === 'uluna' || isNativeTerra(str)

const getAssetInfo = (
  contractOrDenom: TokenDenomEnum | ContractAddr,
  dex: DexEnum = DexEnum.terraswap
): AssetInfo => {
  const info = isNativeDenom(contractOrDenom)
    ? {
        native_token: {
          denom: contractOrDenom as TokenDenomEnum,
        },
      }
    : {
        token: { contract_addr: contractOrDenom as ContractAddr },
      }

  const prismInfo = isNativeDenom(contractOrDenom)
    ? {
        native: contractOrDenom as TokenDenomEnum,
      }
    : {
        cw20: contractOrDenom as ContractAddr,
      }
  return dex === DexEnum.prism ? prismInfo : info
}

const isNumberString = (value: number | string): boolean =>
  false === new BigNumber(value || '').isNaN()

const toBn = (value?: number | string): BigNumber => new BigNumber(value || 0)

const isEven = (value: number): boolean => value % 2 === 0

const isOdd = (value: number): boolean => !isEven(value)

const getFixed = (value: number): number => (value > 2 ? 3 : 5)

const microfy = (value: Token): uToken =>
  toBn(value).multipliedBy(asset.TERRA_DECIMAL).toString(10) as uToken

const demicrofy = (value: uToken): Token =>
  toBn(value).div(asset.TERRA_DECIMAL).toString(10) as Token

const formatAmount = (
  value: uToken,
  option?: {
    abbreviate?: boolean
    toFix?: number
  }
): string => {
  const demicrofyValue = toBn(demicrofy(value))
  let strValue = '0'
  strValue = demicrofyValue.toFixed(
    option?.toFix || getFixed(demicrofyValue.toNumber())
  )

  if (option?.abbreviate) {
    const abbreviated = abbreviateNumber(strValue)
    return `${setComma(abbreviated.value)}${abbreviated.unit}`
  }
  return setComma(strValue)
}

const formatNumber = (
  value: string,
  option?: {
    abbreviate?: boolean
    toFix?: number
    demicrofy?: boolean
    separator?: boolean
  }
): string => {
  const demicrofyValue = toBn(
    option?.demicrofy ? demicrofy(value as uToken) : value
  )
  let strValue = '0'
  strValue = demicrofyValue.toFixed(
    option?.toFix || getFixed(demicrofyValue.toNumber())
  )

  if (option?.abbreviate) {
    const abbreviated = abbreviateNumber(strValue)
    return `${setComma(abbreviated.value)}${abbreviated.unit}`
  }
  return option?.separator ? setComma(strValue) : strValue
}

const abbreviateNumber = (value: string): { value: string; unit: string } => {
  const bn = toBn(value)
  if (bn.isGreaterThan(1e12)) {
    return { value: bn.div(1e12).toFixed(2), unit: 'T' }
  } else if (bn.isGreaterThan(1e9)) {
    return { value: bn.div(1e9).toFixed(2), unit: 'B' }
  } else if (bn.isGreaterThan(1e6)) {
    return { value: bn.div(1e6).toFixed(2), unit: 'M' }
  } else if (bn.isGreaterThan(1e3)) {
    return { value: bn.div(1e3).toFixed(2), unit: 'K' }
  }
  return { value, unit: '' }
}

const getPriceChange = ({
  from,
  to,
}: {
  from: BigNumber
  to: BigNumber
}): {
  isIncreased: boolean
  rate: BigNumber
} => {
  const isIncreased = to.isGreaterThanOrEqualTo(from)
  const rate = isIncreased
    ? to.div(from).minus(1)
    : new BigNumber(1).minus(to.div(from))
  return {
    isIncreased,
    rate,
  }
}

const toBase64 = (value: string): string =>
  Buffer.from(value).toString('base64')

const fromBase64 = (value: string): string =>
  Buffer.from(value, 'base64').toString()

const formatPercentage = (per: BigNumber): string => {
  return per.lt(0.01)
    ? '<0.01'
    : per.gt(99.9)
    ? '>99.9'
    : per.multipliedBy(100).toFixed(2)
}

export default {
  truncate,
  jsonTryParse,
  setComma,
  delComma,
  extractNumber,
  isNativeTerra,
  isNativeDenom,
  getAssetInfo,
  isNumberString,
  toBn,
  isEven,
  isOdd,
  microfy,
  demicrofy,
  formatAmount,
  formatNumber,
  abbreviateNumber,
  getPriceChange,
  toBase64,
  fromBase64,
  formatPercentage,
  getFixed,
}
