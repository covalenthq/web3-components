import { useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import { getDataFromCovalentAPI } from '../utils/api'

const ExchangeSelector = ({ setCurrentDex }) => {
  const [options, setOptions] = useState([])
  const [error, setError] = useState(false)

  const fetchExchanges = useCallback(() => {
    setError(false)
    const chainsUrl = `https://api.covalenthq.com/v1/chains/`
    const dexesUrl = `https://api.covalenthq.com/v1/xy=k/supported_dexes/`

    Promise.all([
      getDataFromCovalentAPI(chainsUrl),
      getDataFromCovalentAPI(dexesUrl)
    ]).then(([chainsResponse, dexesResponse]) => {
        const chains = chainsResponse.data.items
        const dexes = dexesResponse.data.items.filter(dex => !!dex.dex_name)

        const chainAndDexes = chains.map(chain => {
          const { label } = chain
          const options = dexes.filter(dex => dex.chain_id === chain.chain_id).map(dex => ({
            label: dex.dex_name,
            value: `${chain.chain_id}-${dex.dex_name}`
          }))

          return { label, options }
        })
        setOptions(chainAndDexes.filter(option => option.options.length > 0))
      })
      .catch(() => setError(true))
  }, [])

  const handleChange = (value) => {
    setCurrentDex(value)
  }

  useEffect(() => {
    fetchExchanges()
  }, [fetchExchanges])

  if (error) {
    return <p> Unable to fetch exchanges</p>
  }

  return (
    <Select
      style={{
        width: 250,
      }}
      onChange={handleChange}
      options={options}
    />
  )
}

export default ExchangeSelector
