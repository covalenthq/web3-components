import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'
import truncateEthAddress from 'truncate-eth-address'
import { blockExplorerURLs } from '../../utils/blockExplorerURLs'
import transformSwapTxnExchange from '../../utils/swapTxnExchangeHelper'

const SwapTxnsToken = ({
  chainId,
  swapName,
  tokenAddress,
  pageSize = 99999,
  quoteCurrency = 'USD'
}) => {
  const [swapTxns, setswapTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (swapName && chainId && tokenAddress) {
      fetchData()
    }
  }, [chainId, swapName, tokenAddress])

  const blockExplorer = blockExplorerURLs.filter(
    (item) => parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId
  )
  const blockexplorerURL = blockExplorer?.length ? blockExplorer[0].url : 'https://blockscan.com/'

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const swapTransactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/xy=k/${swapName}/tokens/address/${tokenAddress}/transactions/?quote-currency=${quoteCurrency}&format=JSON&&page-size=${pageSize}`
    getDataFromCovalentAPI(swapTransactionsEndpoint)
      .then((response) => {
        const filtered = response.data.items.filter((r) => r.token_0 != null && r.token_1 != null)
        const transform = transformSwapTxnExchange(filtered)
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
          <p>
            Swapped{' '}
            <a
              href={blockexplorerURL + 'address/' + record.swapTokenIn.token.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.swapTokenIn.token.contract_ticker_symbol}
            </a>{' '}
            {(
              record.swapTokenIn.amount /
              10 ** record.swapTokenIn.token.contract_decimals
            ).toPrecision(6)}{' '}
            for{' '}
            <a
              href={blockexplorerURL + 'address/' + record.swapTokenOut.token.contract_address}
              target="_blank"
              rel="noopener noreferrer">
              {record.swapTokenOut.token.contract_ticker_symbol}
            </a>{' '}
            {(
              record.swapTokenOut.amount /
              10 ** record.swapTokenOut.token.contract_decimals
            ).toPrecision(6)}
          </p>
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
    // return <div>sjkbcvjsfbjvsb</div>
  }
}

export default SwapTxnsToken
