import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'
import transformedPool from '../../utils/swapHelper'
import defaultLogo from '../../assets/default-logo.png'

const SwapPool = ({ chainId, swapName }) => {
  const [swapPool, setswapPool] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  useEffect(() => {
    if (swapName && chainId) {
      fetchData()
    }
  }, [swapName, chainId])

  const fetchData = () => {
    setError(false)
    setIsLoading(true)

    const nftTransactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/xy=k/${swapName}/pools/`
    getDataFromCovalentAPI(nftTransactionsEndpoint)
      .then((response) => {
        console.log(response.data.items)
        const transformedResponse = transformedPool(response.data.items)
        //console.log(transformedResponse)
        setswapPool(transformedResponse)
        setIsLoading(false)
      })
      .catch(() => setError(true))
  }

  const columns = [
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: 'tvl',
      width: '10%',
      render: (text, record) => {
        const compact = Intl.NumberFormat('en', { notation: 'compact' }).format(record.tvl)
        return <p>{compact}</p>
      }
    },
    {
      title: 'Name',
      dataIndex: 'poolName',
      key: 'poolName',
      width: '20%',
      render: (text, record) => (
        <>
          <p>{record.poolName}</p>
        </>
      )
    },
    {
      title: 'Logo',
      dataIndex: 'token0',
      key: 'token0',
      width: '5%',
      render: (text, record) => (
        <>
          <img
            alt="token0_logo"
            src={record.token0.logo_url}
            onError={handleImgError}
            height="18"
          />
          <img
            alt="token0_logo"
            src={record.token1.logo_url}
            onError={handleImgError}
            height="18"
          />
        </>
      )
    },
    {
      title: 'Volume(7D)',
      dataIndex: 'volume7D',
      key: 'volume7D',
      width: '12%',
      render: (text, record) => {
        const compact_volume7D = Intl.NumberFormat('en', { notation: 'compact' }).format(
          record.volume7D
        )
        return <p>{compact_volume7D}</p>
      }
    },
    {
      title: 'Fee(7D)',
      dataIndex: 'fee7D',
      key: 'fee7D',
      width: '12%',
      render: (text, record) => {
        const compact_fee7D = Intl.NumberFormat('en', { notation: 'compact' }).format(record.fee7D)
        return <p>{compact_fee7D}</p>
      }
    },
    {
      title: 'Swap Count',
      dataIndex: 'swapCount',
      key: 'swapCount',
      width: '10%',
      render: (text, record) => {
        const compact_swapCount = Intl.NumberFormat('en', { notation: 'compact' }).format(
          record.swapCount
        )
        return <p>{compact_swapCount}</p>
      }
    }
  ]

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Table loading={true} />
  } else if (!isLoading && swapPool) {
    return <Table dataSource={swapPool} columns={columns} rowKey="tvl" />
  }
}

export default SwapPool
