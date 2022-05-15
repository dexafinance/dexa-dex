import { useState } from 'react'
import { TerraResponse } from 'types'

export type UseTerraResponse = {
  terraResponse: TerraResponse
  setTerraResponse: (terraResponse: TerraResponse) => void
}

const useTerraResponse = (): UseTerraResponse => {
  const [terraResponse, setTerraResponse] = useState({ code: 0, message: 'Ok' })

  return { terraResponse, setTerraResponse }
}

export default useTerraResponse
