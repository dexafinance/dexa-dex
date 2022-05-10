import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'

import { ASSET, UTIL, COLOR } from 'consts'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  SlippageToleranceButton,
} from 'components'
import { TokenDenomEnum, uToken, Native, Token } from 'types'
import { UseBuyReturn } from 'hooks/common/trade/useBuy'
import useMyBalance from 'hooks/common/useMyBalance'
import {
  // Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker,
} from '@reach/slider'
import '@reach/slider/styles.css'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledRow = styled(View)`
  padding-bottom: 8px;
`

const StyledSlider = styled(View)`
  padding: 4px 8px 12px 8px;
  [data-reach-slider-track] {
    background-color: ${({ theme }): string => theme.colors.surfaceL2};
  }
  [data-reach-slider-range] {
    background-color: ${COLOR.gray._300};
  }
  [data-reach-slider-marker] {
    z-index: 0;
    border-radius: 12px;
    width: 12px;
    background-color: ${({ theme }): string => theme.colors.surfaceL2};
    border: solid 2px ${({ theme }): string => theme.colors.surface};
  }
  [data-reach-slider-marker][data-state='under-value'] {
    background-color: ${COLOR.gray._300};
  }
  [data-reach-slider-marker][data-state='at-value'] {
    background-color: ${({ theme }): string => theme.colors.surface};
    border: solid 4px;
  }
  [data-reach-slider-handle] {
    background-color: ${COLOR.gray._300};
  }
`

const StyledMaxBalance = styled(Row)`
  justify-content: space-between;
  padding-bottom: 8px;
  color: ${({ theme }): string => theme.colors.primaryText};
`

const BuyForm = ({ buyReturn }: { buyReturn: UseBuyReturn }): ReactElement => {
  const {
    fromTokenContractOrDenom,
    // toTokenContractOrDenom,
    fromTokenSymbol,
    toTokenSymbol,

    fromAmount,
    updateFromAmount,
    fromAmountErrMsg,
    toAmount,
    updateToAmount,
    toAmountErrMsg,
    fee,
    simulation,
    slippage,
    updateSlippage,
  } = buyReturn

  const { balance: fromTokenBal } = useMyBalance({
    contractOrDenom: fromTokenContractOrDenom,
  })

  // const { balance: toTokenBal } = useMyBalance({
  //   contractOrDenom: toTokenContractOrDenom,
  // })

  const feeData = useMemo(
    () =>
      fee
        ? fee.amount.map((f) => ({
            title: 'Tx Fee',
            value: (
              <BalanceFormat
                value={f.amount.toString() as uToken}
                suffix={ASSET.symbolOfDenom[f.denom as TokenDenomEnum]}
              />
            ),
          }))
        : [],
    [fee]
  )

  const simulationData = useMemo(() => {
    if (simulation) {
      console.log(simulation.beliefPrice)
      return [
        {
          title: `Price per ${toTokenSymbol}`,
          value: (
            <BalanceFormat
              value={simulation.beliefPrice}
              suffix={fromTokenSymbol}
            />
          ),
        },
        {
          title: `Price per ${fromTokenSymbol}`,
          value: (
            <BalanceFormat
              value={UTIL.microfy(
                UTIL.toBn(1000000)
                  .dividedBy(UTIL.toBn(simulation.beliefPrice))
                  .toString() as Token
              )}
              suffix={toTokenSymbol}
            />
          ),
        },
        {
          title: 'Minimum Received',
          value: (
            <BalanceFormat
              value={simulation.minimumReceived}
              suffix={toTokenSymbol}
            />
          ),
        },
      ]
    }
    return []
  }, [simulation])

  return (
    <>
      <StyledSection>
        <View>
          <StyledMaxBalance>
            <div></div>
            <MaxButton
              value={fromTokenBal}
              symbol={fromTokenSymbol}
              onClick={(value): void => {
                updateFromAmount(UTIL.demicrofy(value))
              }}
            />
          </StyledMaxBalance>
        </View>
        <StyledRow>
          <FormInput
            number
            prefix="Mrk. Price"
            suffix={fromTokenSymbol}
            // onChangeValue={(value): void => {
            //   updateAskPrice(value as Token)
            // }}
            inputProps={{
              readOnly: true,
              placeholder: '0',
              value:
                simulation && simulation.beliefPrice
                  ? UTIL.formatNumber(
                      UTIL.demicrofy(simulation?.beliefPrice)
                    ).toString()
                  : '',
            }}
          />
        </StyledRow>
        <StyledRow>
          <FormInput
            number
            prefix="You pay"
            suffix={fromTokenSymbol}
            onChangeValue={(value): void => {
              updateFromAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: fromAmount,
            }}
            isError={!!fromAmountErrMsg}
            helperText={fromAmountErrMsg}
          />
        </StyledRow>
        <StyledSlider>
          <SliderInput
            value={UTIL.toBn(fromAmount)
              .dividedBy(UTIL.demicrofy(fromTokenBal))
              .multipliedBy(100)
              .integerValue()
              .toNumber()}
            onChange={(value): void => {
              updateFromAmount(
                UTIL.toBn(UTIL.demicrofy(fromTokenBal))
                  .multipliedBy(value)
                  .dividedBy(100)
                  .dp(6)
                  .toString(10) as Token
              )
            }}
          >
            <SliderTrack>
              <SliderRange />
              <SliderMarker value={0} />
              <SliderMarker value={25} />
              <SliderMarker value={50} />
              <SliderMarker value={75} />
              <SliderMarker value={100} />
              <SliderHandle />
            </SliderTrack>
          </SliderInput>
        </StyledSlider>
        <View>
          <FormInput
            number
            prefix="You receive"
            suffix={toTokenSymbol}
            onChangeValue={(value): void => {
              updateToAmount(value as Native)
            }}
            inputProps={{
              placeholder: '0',
              value: toAmount,
            }}
            isError={!!toAmountErrMsg}
            helperText={toAmountErrMsg}
          />
        </View>
      </StyledSection>

      <StyledSection>
        <SlippageToleranceButton
          slippage={slippage}
          updateSlippage={updateSlippage}
        />
      </StyledSection>

      <StyledSection>
        <Hr type="dashed" />
      </StyledSection>

      {fee && simulation && (
        <StyledSection>
          <FormDataList data={simulationData.concat(feeData)} />
        </StyledSection>
      )}
    </>
  )
}

export default BuyForm
