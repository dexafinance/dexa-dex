import { TokenDenomEnum } from 'types'
import { ContractAddr } from './contracts'

export enum TokenKeyEnum {
  ATLO = 'ATLO',
  GLOW = 'GLOW',
  aUST = 'aUST',
  XTRA = 'XTRA',
  MIAW = 'MIAW',
  UST = 'UST',
  LUNA = 'LUNA',
  bLUNA = 'bLUNA',
  TWD = 'TWD',
  STT = 'STT',
  LOTA = 'LOTA',
  bETH = 'bETH',
  ANC = 'ANC',
  MIR = 'MIR',
  mAAPL = 'mAAPL',
  mABNB = 'mABNB',
  mAMC = 'mAMC',
  mAMD = 'mAMD',
  mAMZN = 'mAMZN',
  mBABA = 'mBABA',
  mBTC = 'mBTC',
  mCOIN = 'mCOIN',
  mDOT = 'mDOT',
  mETH = 'mETH',
  mFB = 'mFB',
  mGLXY = 'mGLXY',
  mGME = 'mGME',
  mGOOGL = 'mGOOGL',
  mGS = 'mGS',
  mIAU = 'mIAU',
  mMSFT = 'mMSFT',
  mNFLX = 'mNFLX',
  mQQQ = 'mQQQ',
  mSLV = 'mSLV',
  mSPY = 'mSPY',
  mSQ = 'mSQ',
  mTSLA = 'mTSLA',
  mTWTR = 'mTWTR',
  mUSO = 'mUSO',
  mVIXY = 'mVIXY',
  DPH = 'DPH',
  MINE = 'MINE',
  SPEC = 'SPEC',
  VKR = 'VKR',
  PSI = 'PSI',
  KUJI = 'KUJI',
  sKUJI = 'sKUJI',
  ALTE = 'ALTE',
  ASTRO = 'ASTRO',
  xASTRO = 'xASTRO',
  WHALE = 'WHALE',
  APOLLO = 'APOLLO',
  LUNI = 'LUNI',
  TLAND = 'TLAND',
  ORNE = 'ORNE',
  PLY = 'PLY',
  tSHIBA = 'tSHIBA',
  LOCAL = 'LOCAL',
  MARS = 'MARS',
  LUNAX = 'LUNAX',
  PRISM = 'PRISM',
  xPRISM = 'xPRISM',
  cLUNA = 'cLUNA',
  pLUNA = 'pLUNA',
  yLUNA = 'yLUNA',
  stLUNA = 'stLUNA',
  kUST = 'kUST',
}

export type AddressMap = {
  lotaToken: ContractAddr
  lotaUstPair: ContractAddr
  lotaUstLPToken: ContractAddr
}

// this value will be used to store in smart contract so do not modify unless has been carefully considered
export enum DexEnum {
  terraswap = 'Terraswap',
  astroport = 'Astroport',
  loop = 'Loop',
  prism = 'Prism',
}

export type PairType = {
  dex: DexEnum
  base: TokenKeyEnum
  otherToken: TokenKeyEnum
  pair: ContractAddr
  lp: ContractAddr
}

export enum TokenInfoGoupEnum {
  mirror = 'mirror',
  anc = 'anc',
}

export type TokenInfoType = {
  symbol: string
  name: string
  logo: string
  contractOrDenom: ContractAddr | TokenDenomEnum
  group?: TokenInfoGoupEnum
}

export type TokenType = TokenInfoType & {
  pairList: PairType[]
}

export type LpofLpType = {
  lpOfLp_LpTicker: string
  token_0_LogoList: [string, string]
  token_0_Contract: ContractAddr
  token_0_Pair: ContractAddr
  token_0_Combined: (ContractAddr | TokenDenomEnum)[]
  token_0_Symbol: string
  token_0_ProvideSymbol?: string
  token_1_LogoList: [string, string]
  token_1_Contract: ContractAddr
  token_1_Pair: ContractAddr
  token_1_Combined: (ContractAddr | TokenDenomEnum)[]
  token_1_Symbol: string
  token_1_ProvideSymbol?: string
  lpOfLp_Lp: ContractAddr
  lpOfLp_Pair: ContractAddr
}

export type LpStakingType = {
  tokenLogo: string
  tokenContract: ContractAddr
  nativeDenomLogo: string
  nativeDenom: TokenDenomEnum
  lpContract: ContractAddr
  lpPair: ContractAddr
  lpStaking: ContractAddr
}

export type TerraResponse = {
  code: number
  message: string
}