import React, { useState, useEffect } from 'react'
import { transform } from '../utils/transform'
import { categorizeTransaction } from '../utils/categorize'
import { Table } from 'antd'
import { blockExplorerURLs } from '../utils/blockExplorerURLs'
import { columns } from '../utils/columns'
import { getDataFromCovalentAPI } from '../utils/api'

const Transactions = ({ address, chainId, ascending = false, noLogs = false, pageSize = 99999, quoteCurrency = 'USD' }) => {
  const [txns, setTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const blockExplorer = blockExplorerURLs.filter(
    (item) => (parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId)
  )
  const blockexplorerURL = (blockExplorer?.length) ? blockExplorer[0].url : 'https://blockscan.com/'

  useEffect(() => {
    if (address) {
      fetchData()
    }
  }, [address, chainId, ascending, noLogs, pageSize, quoteCurrency])

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const transactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?quote-currency=${quoteCurrency}&format=JSON&block-signed-at-asc=${ascending}&no-logs=${noLogs}&page-size=${pageSize}`
    getDataFromCovalentAPI(transactionsEndpoint)
      .then((response) => {
        setIsLoading(false)
        const transformedTransactions = transform(
          response.data.items.filter((txn) => txn.log_events.length < 20)
        ) //remove spam

        const categorizedTransactions = transformedTransactions.map((txn) => {
          return categorizeTransaction(txn, address)
        })
        setTxns(categorizedTransactions)
      })
      .catch((e) => setError(true))
  }

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Table loading={true} />
  } else if (!isLoading && txns) {
    return <Table dataSource={txns} columns={columns(blockexplorerURL)} rowKey="txnHash" />
  }
}

export default Transactions
