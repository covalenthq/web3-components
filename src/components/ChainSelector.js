import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { getDataFromCovalentAPI } from '../utils/api'

const ChainSelector = ({setChainName}) => {
  const [chains, getChains] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (value) => {
    setChainName(value)
  }

  const fetchData = () => {
    setError(false)
    const URL = `https://api.covalenthq.com/v1/chains/`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        getChains(response.data.items)
      })
      .catch((e) => setError(true))
  }

  const options = chains.map(chain => ({
    label: chain.label,
    value: chain.name
  }))

  if (error) {
    return <p> Unable to fetch chains</p>
  } else if (chains) {
    return (
      <>
        <Select
          defaultValue='eth-mainnet'
          style={{
            width: 250,
          }}
          onChange={handleChange}
          options = {options}
        />
      </>
    )
  }
}

export default ChainSelector
