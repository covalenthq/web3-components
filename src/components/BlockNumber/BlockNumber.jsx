import { useState, useEffect } from 'react'
import { getDataFromCovalentAPI } from '../../utils/api'

const BlockNumber = ({ chainId }) => {
  const [block, setBlock] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setBlock((prevTemp) => prevTemp + 1)
    }, 8000)
  }, [])

  useEffect(() => {
    if (chainId) {
      fetchData()
    }
  }, [block])

  const fetchData = () => {
    setError(false)
    const URL = `https://api.covalenthq.com/v1/${chainId}/block_v2/latest/?quote-currency=USD&format=JSON`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        // getChains(response.data.items)
        //console.log(response.data.items[0].height)
        setBlock(response.data.items[0].height)
      })
      .catch(() => setError(true))
    //console.log('fetch')
  }

  if (error) {
    return <p> Unable to fetch chains</p>
  } else if (block) {
    return (
      <>
        <div>{block}</div>
        {/* <div>{value.value}</div> */}
      </>
    )
  }
}

export default BlockNumber
