import { useState, useEffect } from 'react'
import { Table } from 'antd'
import defaultLogo from '../assets/default-logo.png'
import { getDataFromCovalentAPI } from '../utils/api'

const TokenHolders = ({ tokenAddress, chainId, blockHeight = 'latest', pageSize = 99999, quoteCurrency = 'USD' }) => {
  const [data, getData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (tokenAddress) {
      fetchData()
    }
  }, [tokenAddress, chainId, blockHeight, pageSize, quoteCurrency])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const URL = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenAddress}/token_holders/?quote-currency=${quoteCurrency}&format=JSON&block-height=${blockHeight}&page-size=${pageSize}`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        setIsLoading(false)
        getData(response.data.items)
      })
      .catch((e) => setError(true))
  }

  const summaryColumn = [
    {
      title: '',
      dataIndex: 'logo_url',
      key: 'logo_url',
      render: (text) => (
        <img src={text} onError={handleImgError} style={{ width: '40px', height: '40px' }} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'contract_name',
      key: 'contract_name'
    },
    {
      title: 'Symbol',
      dataIndex: 'contract_ticker_symbol',
      key: 'contract_ticker_symbol'
    },
    {
      title: 'Token Address',
      dataIndex: 'contract_address',
      key: 'contract_address'
    },
    {
      title: 'Total Supply',
      dataIndex: 'total_supply',
      key: 'total_supply'
    },
    {
      title: 'Block Height',
      dataIndex: 'block_height',
      key: 'block_height'
    }
  ]

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Balance / Token ID',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
      render: (_, item) =>
        Number.isInteger(item.balance / 10 ** item.contract_decimals)
          ? item.balance / 10 ** item.contract_decimals
          : (item.balance / 10 ** item.contract_decimals).toFixed(4)
    }
  ]

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Table loading={true} />
  } else if (!isLoading && data) {
    return (
      <>
        <Table
          columns={summaryColumn}
          dataSource={data.slice(0, 1)}
          pagination={false}
          rowKey="contract_address"
        />
        <Table columns={columns} dataSource={data} rowKey="address" />
      </>
    )
  }
}

export default TokenHolders
