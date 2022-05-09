import useLCD from '../useLCD'
import { ContractAddr, TokenDenomEnum, terraswap, uToken, uUST } from 'types'
import { UTIL } from 'consts'
import useNetwork from '../../common/useNetwork'

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
    return wasmFetch<
      terraswap.Simulation<uToken>,
      terraswap.SimulationResponse<uUST>
    >({
      contract: pairContract,
      msg: {
        simulation: {
          offer_asset: {
            amount,
            info: UTIL.getAssetInfo(
              tokenContract,
              pairContractMap[pairContract].dex
            ),
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
    return wasmFetch<
      terraswap.ReverseSimulation<uToken>,
      terraswap.ReverseSimulationResponse<T, RT>
    >({
      contract: pairContract,
      msg: {
        reverse_simulation: {
          ask_asset: {
            amount,
            info: UTIL.getAssetInfo(
              tokenContract,
              pairContractMap[pairContract].dex
            ),
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
