import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconExternalLink } from '@tabler/icons'
import _ from 'lodash'

import { UTIL, COLOR } from 'consts'
// import { COLOR } from 'consts'

import { FormText, Row, LinkFinder, View, Card } from 'components'
import { ContractAddr, uToken, Token, TradeTypeEnum } from 'types'
// import { ContractAddr, uToken  } from 'types'
import useLayout from 'hooks/common/useLayout'
// import useTokenPairHistory from 'hooks/query/token/useCw20History'
import useTokenPairHistory from 'hooks/query/token/useCwTransactions'
import { Coin } from '@terra-money/terra.js'

const StyledContainer = styled(Card)``

const StyledTxInfoItem = styled(Row)`
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.gray._100};
`

const TxInfo = ({
  selectedToken,
  pairContract,
}: {
  selectedToken: string
  pairContract: ContractAddr
}): ReactElement => {
  const { txList } = useTokenPairHistory({
    tokenPairContract: pairContract,
    baseContractOrDenom: selectedToken as ContractAddr,
    offset: 0,
    limit: 100,
  })
  const { isTabletWidth } = useLayout()

  if (txList.length < 1) {
    return <View />
  }
  return (
    <StyledContainer>
      {_.map(txList.slice(0, 10), (item, index) => {
        // const uusdBn = UTIL.toBn(item.uusd)
        // const isPositive = uusdBn.isPositive()
        const isPositive = true
        let action = TradeTypeEnum.buy
        let amount: Coin = item.amountIn
        let forAmount: Coin = item.amountOut
        if (item.amountIn?.denom === selectedToken) {
          // Sell selected token
          action = TradeTypeEnum.sell
          amount = item.amountOut
          forAmount = item.amountIn
        }
        // console.log(
        //   'tx',
        //   UTIL.formatAmount(item.amountIn?.amount.toString() as uToken),
        //   item.amountIn?.denom,
        //   UTIL.formatAmount(item.amountOut?.amount.toString() as uToken),
        //   item.amountOut?.denom,
        //   action,
        //   amount
        // )
        return (
          <StyledTxInfoItem key={`txList-${index}`}>
            {isTabletWidth ? (
              <>
                <View>
                  <LinkFinder
                    type="tx"
                    address={item.txhash}
                    title={
                      <>
                        <Row style={{ alignItems: 'baseline' }}>
                          <FormText fontType={'R14'} color={COLOR.primary._400}>
                            {action.toUpperCase()}
                          </FormText>
                          <IconExternalLink
                            size={12}
                            style={{ paddingLeft: 3 }}
                          />
                        </Row>
                        <FormText
                          fontType="B16"
                          color={isPositive ? COLOR.success : COLOR.error}
                        >
                          {/* {`${UTIL.formatAmount(
                            item.amountIn.amount as uToken
                          )} UST`} */}
                          {`${UTIL.formatAmount(
                            amount?.amount.toString() as uToken
                          )} ${amount?.denom}`}
                        </FormText>
                      </>
                    }
                  />
                </View>

                <FormText fontType="R14">{item.timestamp.fromNow()}</FormText>
              </>
            ) : (
              <>
                {/* <View style={{ width: 250 }}></View> */}

                <Row style={{ flex: 1 }}>
                  <LinkFinder
                    type="tx"
                    address={item.txhash}
                    title={
                      <Row style={{ alignItems: 'baseline' }}>
                        <FormText fontType={'R14'} color={COLOR.primary._400}>
                          {action.toUpperCase()}
                        </FormText>
                        <IconExternalLink
                          size={12}
                          style={{ paddingLeft: 3 }}
                        />
                      </Row>
                    }
                  />
                  <FormText
                    fontType="B16"
                    color={isPositive ? COLOR.success : COLOR.error}
                  >
                    {`${UTIL.formatAmount(
                      UTIL.microfy(
                        amount?.amount
                          .dividedBy(forAmount?.amount)
                          .toString() as Token
                      ).toString() as uToken,
                      { toFix: 3 }
                    )} ${amount?.denom}`}
                  </FormText>
                  <FormText
                    fontType="B16"
                    color={isPositive ? COLOR.success : COLOR.error}
                  >
                    {`${UTIL.formatAmount(
                      forAmount?.amount.toString() as uToken,
                      { toFix: 3 }
                    )} ${forAmount?.denom}`}
                  </FormText>
                </Row>
                <FormText fontType="R16">{item.timestamp.fromNow()}</FormText>
              </>
            )}
          </StyledTxInfoItem>
        )
      })}
    </StyledContainer>
  )
}

export default TxInfo
