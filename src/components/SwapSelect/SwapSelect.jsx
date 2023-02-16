import { useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'

const SwapSelect = ({ setCurrentSwap }) => {
  const [options, setOptions] = useState([])
  const [error, setError] = useState(false)

  const handleChange = (value) => {
    setCurrentSwap(value)
  }

  const fetchExchanges = useCallback(() => {
    setError(false)
    const chainsUrl = `https://api.covalenthq.com/v1/chains/`
    const swapUrl = `https://api.covalenthq.com/v1/xy=k/supported_dexes/`

    fetchData(chainsUrl, swapUrl)
  }, [])

  const fetchData = async (chainUrl, swapUrl) => {
    let [chainRes, swapRes] = await Promise.all([
      getDataFromCovalentAPI(chainUrl),
      getDataFromCovalentAPI(swapUrl)
    ])
    const chain = chainRes.data.items
    const swap = swapRes.data.items
    const chainAndSwap = chain.map((chain) => {
      const { label } = chain
      const options = swap
        .filter((r) => r.chain_id === chain.chain_id)
        .map((res) => ({
          label: res.dex_name,
          value: `${chain.chain_id}-${res.dex_name}`
        }))
      return { label, options }
    })
    let finalData = chainAndSwap.filter((option) => option.options.length > 0)
    setOptions(finalData)
  }

  useEffect(() => {
    fetchExchanges()
  }, [fetchExchanges])

  if (error) {
    return <p> Unable to fetch Swap</p>
  } else if (options && !error)
    return (
      <Select
        defaultValue="Uniswap-V2"
        style={{
          width: 500
        }}
        onChange={handleChange}
        options={options}
      />
    )
}

export default SwapSelect
