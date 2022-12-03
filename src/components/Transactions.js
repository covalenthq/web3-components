import React, { useState, useEffect } from 'react'
import { transform } from '../utils/transform'
import { categorizeTransaction } from '../utils/categorize'
import { Table } from 'antd'
import { blockExplorerURLs } from '../utils/blockExplorerURLs'
import { columns } from '../utils/columns'
import { getDataFromCovalentAPI } from '../utils/api'

const Transactions = ({ chainId, address }) => {
  const [txns, setTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const blockexplorerURL = blockExplorerURLs.filter(
    (item) => parseInt(item.chainId) === parseInt(chainId)
  )[0].url

  useEffect(() => {
    if (address) {
      fetchData()
    }
  }, [chainId, address])

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const transactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/`
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
