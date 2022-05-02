import useLCD from '../useLCD'
import { ContractAddr, TokenDenomEnum, terraswap, uToken, uUST } from 'types'
import { UTIL } from 'consts'
import useNetwork from 'hooks/common/useNetwork'
import { DexEnum } from 'types'

const useSimulate = (): {
  simulate: (props: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }) => Promise<terraswap.SimulationResponse<uUST>>
  reverseSimulate: <T extends uToken, RT extends uToken = T>(props: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }) => Promise<terraswap.ReverseSimulationResponse<T, RT>>
} => {
  const { wasmFetch } = useLCD()
  const { pairContractMap } = useNetwork()

  const simulate = ({
    amount,
    pairContract,
    tokenContract,
  }: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }): Promise<terraswap.SimulationResponse<uUST>> => {
    const isPrismProtocol = pairContractMap[pairContract].dex === DexEnum.prism
    const info = UTIL.isNativeDenom(tokenContract)
      ? {
          native_token: {
            denom: tokenContract as TokenDenomEnum,
          },
        }
      : {
          token: { contract_addr: tokenContract as ContractAddr },
        }

    const prismInfo = UTIL.isNativeDenom(tokenContract)
      ? {
          native: tokenContract as TokenDenomEnum,
        }
      : {
          cw20: tokenContract as ContractAddr,
        }

    return wasmFetch<
      terraswap.Simulation<uToken>,
      terraswap.SimulationResponse<uUST>
    >({
      contract: pairContract,
      msg: {
        simulation: {
          offer_asset: {
            amount,
            info: isPrismProtocol ? prismInfo : info,
          },
        },
      },
    })
  }

  const reverseSimulate = <T extends uToken, RT extends uToken = T>({
    amount,
    pairContract,
    tokenContract,
  }: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }): Promise<terraswap.ReverseSimulationResponse<T, RT>> => {
    const isPrismProtocol = pairContractMap[pairContract].dex === DexEnum.prism
    const info = UTIL.isNativeDenom(tokenContract)
      ? {
          native_token: {
            denom: tokenContract as TokenDenomEnum,
          },
        }
      : {
          token: { contract_addr: tokenContract as ContractAddr },
        }

    const prismInfo = UTIL.isNativeDenom(tokenContract)
      ? {
          native: tokenContract as TokenDenomEnum,
        }
      : {
          cw20: tokenContract as ContractAddr,
        }

    return wasmFetch<
      terraswap.ReverseSimulation<uToken>,
      terraswap.ReverseSimulationResponse<T, RT>
    >({
      contract: pairContract,
      msg: {
        reverse_simulation: {
          ask_asset: {
            amount,
            info: isPrismProtocol ? prismInfo : info,
          },
        },
      },
    })
  }

  return {
    simulate,
    reverseSimulate,
  }
}

export default useSimulate
