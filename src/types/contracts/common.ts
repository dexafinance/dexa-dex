import { NominalType } from '../common'

export type ContractAddr = string & NominalType<'ContractAddr'>

export type TokenAssetInfo = { token: { contract_addr: ContractAddr } }
export type NativeAssetInfo = { native_token: { denom: string } }

export type PrismTokenAssetInfo = { cw20: ContractAddr }
export type PrismNativeAssetInfo = { native: string }

export type AssetInfo =
  | TokenAssetInfo
  | NativeAssetInfo
  | PrismTokenAssetInfo
  | PrismNativeAssetInfo
