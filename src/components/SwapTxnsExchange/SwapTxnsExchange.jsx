import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'
import transformSwapTxnExchange from '../../utils/swapTxnExchangeHelper'
import truncateEthAddress from 'truncate-eth-address'
import { blockExplorerURLs } from '../../utils/blockExplorerURLs'

const SwapTxnsExchange = ({ chainId, swapName, exchangeAddress }) => {
  const [swapTxns, setswapTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (swapName && chainId && exchangeAddress) {
      fetchData()
    }
  }, [chainId, swapName, exchangeAddress])

  const blockExplorer = blockExplorerURLs.filter(
    (item) => parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId
  )
  const blockexplorerURL = blockExplorer?.length ? blockExplorer[0].url : 'https://blockscan.com/'

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const swapTransactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/xy=k/${swapName}/pools/address/${exchangeAddress}/transactions/?format=JSON`
    getDataFromCovalentAPI(swapTransactionsEndpoint)
      .then((response) => {
        console.log(response.data)
        const transform = transformSwapTxnExchange(response.data.items)
        console.log(transform)
        setswapTxns(transform)
        setIsLoading(false)
      })
      .catch(() => setError(true))
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'time',
      key: 'time',
      width: '10%'
    },
    {
      title: 'Txn Action',
      dataIndex: 'act',
      key: 'act',
      width: '38%',
      render: (text, record) =>
        record.act === 'SWAP' ? (
          <p> SWAP</p>
        ) : record.act === 'ADD_LIQUIDITY' ? (
          <p>
            Supplied Liquidity with{' '}
            <a
              href={blockexplorerURL + 'address/' + record.token0.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.token0.contract_ticker_symbol}
            </a>{' '}
            {(record.amount0 / 10 ** record.token0.contract_decimals).toPrecision(6)} and{' '}
            <a
              href={blockexplorerURL + 'address/' + record.token1.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.token1.contract_ticker_symbol}
            </a>{' '}
            {(record.amount1 / 10 ** record.token1.contract_decimals).toPrecision(6)}
          </p>
        ) : (
          <p>
            Removed Liquidity with{' '}
            <a
              href={blockexplorerURL + 'address/' + record.token0.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.token0.contract_ticker_symbol}
            </a>{' '}
            {(record.amount0 / 10 ** record.token0.contract_decimals).toPrecision(6)} and{' '}
            <a
              href={blockexplorerURL + 'address/' + record.token1.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.token1.contract_ticker_symbol}
            </a>{' '}
            {(record.amount1 / 10 ** record.token1.contract_decimals).toPrecision(6)}
          </p>
        )
    },
    {
      title: 'ACTION',
      dataIndex: 'act',
      key: 'act',
      width: '30%',
      render: (text, record) => (
        <>
          <p>{record.act}</p>
        </>
      )
    },
    {
      title: 'Total Value',
      dataIndex: 'total',
      key: 'total',
      width: '15%',
      render: (text, record) => {
        const compact = Intl.NumberFormat('en', { notation: 'compact' }).format(record.total)
        return <p>{record.currency + ' ' + compact}</p>
      }
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => (
        <a
          href={blockexplorerURL + 'address/' + record.user}
          target="_blank"
          rel="noopener noreferrer">
          {truncateEthAddress(text)}
        </a>
      )
    },
    {
      title: 'Transaction',
      dataIndex: 'txnHash',
      key: 'txnHash',
      render: (txnHash) => (
        <a href={blockexplorerURL + 'tx/' + txnHash} target="_blank" rel="noopener noreferrer">
          {' '}
          View Transaction
        </a>
      )
    }
  ]

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Table loading={true} />
  } else if (!isLoading && swapTxns) {
    return <Table dataSource={swapTxns} columns={columns} rowKey="txnHash" />
  }
}

export default SwapTxnsExchange
