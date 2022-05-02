import ListOrders from './ListOrders'
import { ReactElement } from 'react'

import useNetwork from 'hooks/common/useNetwork'

import {
  // LpProvideTypeEnum,
  // RoutePath,
  TokenType,
  ContractAddr,
  TokenKeyEnum,
} from 'types'

import useMyOrder from 'hooks/common/trade/useMyOrder'

// const StyledCard = styled(Card)`
//   flex: 1;
// `

const Orders = ({
  token,
  tradeBase,
  pairContract,
  lpContract,
}: {
  token: TokenType
  tradeBase: TokenKeyEnum
  pairContract: ContractAddr
  lpContract: ContractAddr
}): ReactElement => {
  // const { insertRouteParam, routeParams } = useRoute<RoutePath.home>()
  // const { routeParams } = useRoute<RoutePath.home>()
  // const type = routeParams?.lpType || LpProvideTypeEnum.provide
  const { tokenInfo } = useNetwork()
  const tradeBaseContract = tokenInfo[tradeBase].contractOrDenom
  const tradeBaseSymbol = tokenInfo[tradeBase].symbol
  // const lpProvideReturn = useLpProvide({
  //   pairContract,
  //   token_0_ContractOrDenom: token.contractOrDenom,
  //   token_1_ContractOrDenom: tradeBaseContract,
  //   token_0_Symbol: token.symbol,
  //   token_1_Symbol: tradeBaseSymbol,
  // })
  // const lpWithdrawReturn = useLpWithdraw({
  //   pairContract,
  //   lpContract,
  //   token_0_ContractOrDenom: token.contractOrDenom,
  //   token_1_ContractOrDenom: tradeBaseContract,
  //   token_0_Symbol: token.symbol,
  //   token_1_Symbol: tradeBaseSymbol,
  // })
  // const {
  //   onClickLpProvide,
  //   invalidForm: invalidStakeForm,
  //   fee: provideFee,
  //   submitErrMsg: provideSubmitErrMsg,
  // } = lpProvideReturn
  // const {
  //   onClickLpWithdraw,
  //   invalidForm: invalidUnStakeForm,
  //   fee: withdrawFee,
  //   submitErrMsg: withdrawSubmitErrMsg,
  // } = lpWithdrawReturn

  const myOrderReturn = useMyOrder({
    forBuyDenom: tradeBaseContract,
    toBuyContractOrDenom: token.contractOrDenom,
    tokenForBuySymbol: tradeBaseSymbol,
    tokenToBuySymbol: token.symbol,
    pairContract,
  })

  return (
    <>
      <ListOrders myOrderReturn={myOrderReturn} />
    </>
  )
}

export default Orders
