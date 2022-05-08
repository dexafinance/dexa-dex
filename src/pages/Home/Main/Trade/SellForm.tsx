import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'

import { ASSET, COLOR, UTIL } from 'consts'
import BigNumber from 'bignumber.js'

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
import { TokenDenomEnum, uToken, Token, Native } from 'types'
import { UseSellReturn } from 'hooks/common/trade/useSell'
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
    background-color: ${({ theme }): string => theme.colors.inputBackground};
  }
  [data-reach-slider-range] {
    background-color: ${COLOR.gray._300};
  }
  [data-reach-slider-marker] {
    border-radius: 12px;
    width: 12px;
    background-color: ${({ theme }): string => theme.colors.inputBackground};
    border: solid 2px ${({ theme }): string => theme.colors.background};
  }
  [data-reach-slider-marker][data-state='under-value'] {
    background-color: ${COLOR.gray._300};
  }
  [data-reach-slider-marker][data-state='at-value'] {
    background-color: ${({ theme }): string => theme.colors.inputBackground};
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

const SellForm = ({
  sellReturn,
}: {
  sellReturn: UseSellReturn
}): ReactElement => {
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
  } = sellReturn

  const { balance: fromTokenBal } = useMyBalance({
    contractOrDenom: fromTokenContractOrDenom,
  })

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
            suffix={toTokenSymbol}
            // onChangeValue={(value): void => {
            //   updateAskPrice(value as Token)
            // }}
            inputProps={{
              readOnly: true,
              placeholder: '0',
              value:
                simulation && simulation.beliefPrice
                  ? UTIL.formatNumber(
                      new BigNumber(1)
                        .dividedBy(
                          UTIL.toBn(UTIL.demicrofy(simulation?.beliefPrice))
                        )
                        .toString()
                    )
                  : '',
            }}
          />
        </StyledRow>
        <StyledRow>
          <FormInput
            number
            prefix="You give"
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

export default SellForm
