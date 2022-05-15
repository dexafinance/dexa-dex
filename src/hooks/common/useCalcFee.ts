import { useEffect, useState } from 'react'
import { CreateTxOptions, Fee } from '@terra-money/terra.js'
import { useDebouncedCallback } from 'use-debounce'
import usePostTx from './usePostTx'
import { useConnectedWallet } from '@terra-money/wallet-provider'

import { TerraResponse } from 'types'

const useCalcFee = ({
  isValid,
  txOptions,
}: {
  isValid: boolean
  txOptions: CreateTxOptions
}): {
  fee?: Fee
  networkResponse: TerraResponse
} => {
  const [fee, setFee] = useState<Fee>()
  const connectedWallet = useConnectedWallet()
  const { getFee } = usePostTx()
  let networkResponse = { code: 0, message: 'Ok' }
  const dbcGetFee = useDebouncedCallback(async () => {
    try {
      const txOptionsFee = await getFee({ txOptions })
      setFee(txOptionsFee)
    } catch (err: any) {
      // console.log(
      //   'err',
      //   err?.response?.data || { code: 999, message: 'Unknown error' }
      // )
      networkResponse = err?.response?.data || {
        code: 999,
        message: 'Unknown error',
      }
    } finally {
    }
  }, 400)

  useEffect(() => {
    fee && setFee(undefined)
    if (isValid) {
      dbcGetFee()
    } else {
      setFee(undefined)
    }
    return (): void => {
      dbcGetFee.cancel()
    }
  }, [txOptions, isValid, connectedWallet])

  return {
    fee,
    networkResponse,
  }
}

export default useCalcFee
