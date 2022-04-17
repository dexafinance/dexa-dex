import { useMemo } from 'react'
import { useWallet } from '@terra-money/wallet-provider'

import { ASSET, UTIL, WHITELIST } from 'consts'

import {
  ContractAddr,
  TokenType,
  LpofLpType,
  LpStakingType,
  TokenDenomEnum,
  TokenInfoType,
} from 'types'

const useNetwork = (): {
  isMainnet: boolean
  chainId: string
  lcd: string
  whitelist: TokenType[]
  lpOfLpList: LpofLpType[]
  lpStakingList: LpStakingType[]
  limitOrder: ContractAddr
  getSymbolByContractOrDenom: (
    contractOrDenom: ContractAddr | TokenDenomEnum
  ) => string
  feeToken: TokenInfoType
  mantleApi: string
} => {
  const { network } = useWallet()
  const isMainnet = useMemo(
    () => /^columbus/.test(network.chainID),
    [network.chainID]
  )

  const mantleApi = useMemo(
    () =>
      isMainnet
        ? 'https://mantle.terra.dev'
        : 'https://bombay-mantle.terra.dev',
    [isMainnet]
  )

  const whitelist = useMemo(
    () => (isMainnet ? WHITELIST.mainnetTokenList : WHITELIST.testnetTokenList),
    [isMainnet]
  )

  const tokenInfo = useMemo(
    () => (isMainnet ? WHITELIST.tokenInfo : WHITELIST.testnetTokenInfo),
    [isMainnet]
  )

  const lpOfLpList = useMemo(
    () => (isMainnet ? WHITELIST.mainnetLpOfLpList : []),
    [isMainnet]
  )

  const lpStakingList = useMemo(
    () =>
      isMainnet
        ? WHITELIST.mainnetLpStakingList
        : WHITELIST.testnetLpStakingList,
    [isMainnet]
  )

  const limitOrder = useMemo(
    () =>
      isMainnet ? WHITELIST.mainnetLimitOrder : WHITELIST.testnetLimitOrder,
    [isMainnet]
  )

  const getSymbolByContractOrDenom = (
    contractOrDenom: ContractAddr | TokenDenomEnum
  ): string => {
    if (UTIL.isNativeDenom(contractOrDenom)) {
      return ASSET.symbolOfDenom[contractOrDenom as TokenDenomEnum]
    } else {
      return (
        whitelist.find((x) => x.contractOrDenom === contractOrDenom)?.symbol ||
        ''
      )
    }
  }

  // const miawToken = whitelist.find((x) => x.symbol === 'MIAW')! as TokenType
  // const feeToken = whitelist.find((x) => x.symbol === 'UST')! as TokenType
  const feeToken = tokenInfo.UST

  return {
    isMainnet,
    whitelist,
    lpOfLpList,
    lpStakingList,
    limitOrder,
    chainId: network.chainID,
    lcd: network.lcd,
    getSymbolByContractOrDenom,
    feeToken,
    mantleApi,
  }
}

export default useNetwork
