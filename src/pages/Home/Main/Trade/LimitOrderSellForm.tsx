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
  // FormText,
  FormLabel,
} from 'components'
import { TokenDenomEnum, uToken, Token } from 'types'
import { UseLimitOrderSellReturn } from 'hooks/common/trade/useLimitOrderSell'
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

const LimitOrderSellForm = ({
  useLimitOrderSellReturn,
}: {
  useLimitOrderSellReturn: UseLimitOrderSellReturn
}): ReactElement => {
  const {
    offerTokenSymbol,
    askTokenSymbol,
    offerContractOrDenom,

    offerAmount,
    updateOfferAmount,
    offerAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    askAmount,
    updateAskAmount,
    // askAmountErrMsg,

    feeToken,
    feeTokenAmount,
    setFeeTokenAmount,
    feeTokenAmountErrMsg,

    fee,
  } = useLimitOrderSellReturn

  const { balance: offerTokenBal } = useMyBalance({
    contractOrDenom: offerContractOrDenom,
  })

  const { balance: miawBal } = useMyBalance({
    contractOrDenom: feeToken.contractOrDenom,
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
        : [
            {
              title: 'Tx Fee',
              value: <BalanceFormat value={'0' as uToken} suffix={'UST'} />,
            },
          ],
    [fee]
  )

  return (
    <>
      <StyledSection>
        <View>
          <StyledMaxBalance>
            <div></div>
            <MaxButton
              value={offerTokenBal}
              symbol={offerTokenSymbol}
              onClick={(value): void => {
                updateOfferAmount(UTIL.demicrofy(value) as Token)
              }}
            />
          </StyledMaxBalance>
        </View>
        <StyledRow>
          <FormInput
            number
            prefix="Price"
            suffix={askTokenSymbol}
            onChangeValue={(value): void => {
              updateAskPrice(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: askPrice,
            }}
            isError={!!askPriceErrMsg}
            helperText={askPriceErrMsg}
          />
        </StyledRow>
        <StyledRow>
          <FormInput
            number
            prefix="Amount"
            suffix={offerTokenSymbol}
            onChangeValue={(value): void => {
              updateOfferAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: offerAmount,
            }}
            isError={!!offerAmountErrMsg}
            helperText={offerAmountErrMsg}
          />
        </StyledRow>
        <StyledSlider>
          <SliderInput
            value={UTIL.toBn(offerAmount)
              .dividedBy(UTIL.demicrofy(offerTokenBal))
              .multipliedBy(100)
              .integerValue()
              .toNumber()}
            onChange={(value): void => {
              updateOfferAmount(
                UTIL.toBn(UTIL.demicrofy(offerTokenBal))
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
        <StyledRow>
          <FormInput
            number
            prefix="Total"
            suffix={askTokenSymbol}
            onChangeValue={(value): void => {
              updateAskAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: askAmount,
            }}
          />
        </StyledRow>
        {false && (
          <View>
            <FormLabel>Fee for priority</FormLabel>
            <FormInput
              number
              suffix={feeToken.symbol}
              onChangeValue={(value): void => {
                setFeeTokenAmount(value as Token)
              }}
              inputProps={{
                placeholder: '0',
                value: feeTokenAmount,
              }}
              isError={!!feeTokenAmountErrMsg}
              helperText={feeTokenAmountErrMsg}
            />
            <StyledMaxBalance>
              <MaxButton
                value={miawBal}
                onClick={(value): void => {
                  setFeeTokenAmount(UTIL.demicrofy(value) as Token)
                }}
              />
            </StyledMaxBalance>
          </View>
        )}
      </StyledSection>

      <StyledSection>
        <Hr type="dashed" />
      </StyledSection>

      <View>
        <FormDataList data={feeData} />
      </View>
    </>
  )
}

export default LimitOrderSellForm
