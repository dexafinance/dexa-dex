import { ReactElement, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'

import { ASSET, STYLE, UTIL, COLOR } from 'consts'

import Select from 'react-select'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  FormText,
  FormLabel,
} from 'components'
import { TokenDenomEnum, uToken, Token } from 'types'
import { UseLimitOrderBuyReturn } from 'hooks/common/trade/useLimitOrderBuy'
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

const StyledTextButton = styled(Row)`
  ${STYLE.clickable}
  border:none;
  background-color: transparent;
  align-items: center;
  :hover {
    opacity: 0.8;
  }
`

const StyledSelectBox = styled(Row)`
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  @media ${STYLE.media.mobile} {
    flex-direction: column-reverse;
    align-items: inherit;
  }
`

type TextButtonProps = {
  value: uToken
  symbol?: string
  onClick: (value: uToken) => void
}

const TextButton = ({
  value,
  symbol,
  onClick,
}: TextButtonProps): ReactElement => (
  <StyledTextButton onClick={(): void => onClick(value)}>
    <FormText fontType="R14">{`Remaining ${UTIL.formatAmount(value, {
      toFix: UTIL.getFixed(+(UTIL.demicrofy(value) as string)),
    })}${symbol && symbol.length > 0 ? ' ' + symbol : ''}`}</FormText>
  </StyledTextButton>
)

const LimitOrderBuyForm = ({
  useLimitOrderBuyReturn,
}: {
  useLimitOrderBuyReturn: UseLimitOrderBuyReturn
}): ReactElement => {
  const {
    // askTokenPrice, // -> max value
    offerTokenSymbol,
    offerDenom,
    askTokenSymbol,

    offerAmount,
    updateOfferAmount,
    offerAmountErrMsg,

    askAmount,
    updateAskAmount,
    askAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    swapbackAskPrice,
    updateSwapbackAskPrice,
    swapbackAskPriceErrMsg,

    feeToken,
    feeTokenAmount,
    setFeeTokenAmount,
    feeTokenAmountErrMsg,

    fee,

    recurringTimes,
    setRecurringTimes,
  } = useLimitOrderBuyReturn

  const { balance: feeTokenBal } = useMyBalance({
    contractOrDenom: feeToken.contractOrDenom,
  })

  const { balance: offerTokenBal } = useMyBalance({
    contractOrDenom: offerDenom,
  })

  const theme = useTheme()
  let recurringOptions: any[] = []
  for (let i = 0; i <= 10; i++) {
    recurringOptions.push({
      value: i,
      label: i === 0 ? 'One time order' : `Loop ${i} times`,
    })
  }
  const colourStyles = {
    menuList: (provided: any, state: any): any => ({
      ...provided,
      height: 200,
    }),
    control: (styles: any): any => ({
      ...styles,
      backgroundColor: theme.colors.surfaceL2,
      border: theme.colors.surfaceL2,
      color: theme.colors.secondaryText,
    }),
    option: (styles: any, { data }: any): any => {
      return {
        ...styles,
        backgroundColor: theme.colors.surfaceL2,
      }
    },
    placeholder: (styles: any): any => ({
      ...styles,
      backgroundColor: theme.colors.surfaceL2,
      color: theme.colors.secondaryText,
    }),
    singleValue: (styles: any, { data }: any): any => ({
      ...styles,
      color: theme.colors.secondaryText,
    }),
  }
  const onChangeOption = (value: number): void => {
    setRecurringTimes(value)
  }

  const feeData = useMemo(
    () =>
      (fee
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
          ]
      ).concat([
        {
          title: `Price per ${askTokenSymbol}`,
          value: (
            <BalanceFormat
              value={UTIL.microfy(askPrice)}
              suffix={offerTokenSymbol}
            />
          ),
        },
        {
          title: `Price per ${offerTokenSymbol}`,
          value: (
            <BalanceFormat
              value={
                +askPrice > 0
                  ? UTIL.microfy(
                      UTIL.toBn(1)
                        .dividedBy(UTIL.toBn(askPrice))
                        .toString() as Token
                    )
                  : ('0' as uToken)
              }
              suffix={askTokenSymbol}
            />
          ),
        },
      ]),
    [fee, askPrice]
  )
  // https://reach.tech/slider/
  return (
    <>
      <StyledSection>
        <View>
          <StyledMaxBalance>
            {UTIL.toBn(offerAmount)
              .dividedBy(UTIL.demicrofy(offerTokenBal))
              .multipliedBy(100)
              .toNumber() > 75 ? (
              <TextButton
                value={
                  UTIL.toBn(offerTokenBal)
                    .minus(UTIL.microfy(offerAmount || ('0' as Token)))
                    .toString() as uToken
                }
                symbol={offerTokenSymbol}
                onClick={(value): void => {}}
              />
            ) : (
              <div></div>
            )}
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
            suffix={offerTokenSymbol}
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
            suffix={askTokenSymbol}
            onChangeValue={(value): void => {
              updateAskAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: askAmount,
            }}
            isError={!!askAmountErrMsg}
            helperText={askAmountErrMsg}
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
            suffix={offerTokenSymbol}
            onChangeValue={(value): void => {
              updateOfferAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: offerAmount,
            }}
            isError={!!askAmountErrMsg}
            helperText={askAmountErrMsg}
          />
        </StyledRow>
        <StyledRow style={{ alignItems: 'flex-end' }}>
          <StyledSelectBox>
            <View style={{ width: 200 }}>
              <Select
                options={recurringOptions}
                defaultValue={recurringOptions[0]}
                value={recurringOptions[recurringTimes]}
                styles={colourStyles}
                onChange={(sel): void => {
                  sel && onChangeOption(sel.value)
                }}
              />
            </View>
          </StyledSelectBox>
        </StyledRow>
        <StyledRow>
          {recurringTimes > 0 && (
            <FormInput
              number
              prefix="Sell price"
              suffix={offerTokenSymbol}
              onChangeValue={(value): void => {
                updateSwapbackAskPrice(value as Token)
              }}
              inputProps={{
                placeholder: '0',
                value: swapbackAskPrice,
              }}
              isError={!!swapbackAskPriceErrMsg}
              helperText={swapbackAskPriceErrMsg}
            />
          )}
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
                value={feeTokenBal}
                onClick={(value): void => {
                  setFeeTokenAmount(UTIL.demicrofy(value) as Token)
                }}
              />
            </StyledMaxBalance>
          </View>
        )}
        <View>
          {offerAmountErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {offerAmountErrMsg}
            </FormText>
          )}
        </View>
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

export default LimitOrderBuyForm
