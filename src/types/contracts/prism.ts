import { AssetInfo } from '.'
import { uToken } from '../currencies'
import { ContractAddr } from './common'

export namespace prism {
  export interface Config {
    config: {}
  }

  export interface ConfigResponse {
    amp: number
  }

  export interface Pair {
    pair: {
      asset_infos: [AssetInfo, AssetInfo]
    }
  }

  export interface PairResponse {
    asset_infos: [AssetInfo, AssetInfo]

    /** Pair contract address */
    contract_addr: ContractAddr

    /** LP contract address */
    liquidity_token: ContractAddr
  }

  export interface Pool {
    pool: {}
  }

  export interface PoolResponse<T extends uToken> {
    total_share: string
    assets: [
      {
        amount: T
        info: AssetInfo
      },
      {
        amount: T
        info: AssetInfo
      }
    ]
  }

  export interface Simulation<T extends uToken> {
    simulation: {
      offer_asset: {
        info: AssetInfo
        amount: T
      }
    }
  }

  export interface SimulationResponse<T extends uToken, RT extends uToken = T> {
    commission_amount: T
    return_amount: RT
    spread_amount: T
  }
  export interface ReverseSimulation<T extends uToken> {
    reverse_simulation: {
      ask_asset: {
        info: AssetInfo
        amount: T
      }
    }
  }

  export interface ReverseSimulationResponse<
    T extends uToken,
    RT extends uToken = T
  > {
    commission_amount: T
    offer_amount: RT
    spread_amount: T
  }
}
