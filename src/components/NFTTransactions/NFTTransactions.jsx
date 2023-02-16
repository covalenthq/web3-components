import React, { useState, useEffect } from 'react'
import { Table, Tag, Popover, Descriptions } from 'antd'
import { getDataFromCovalentAPI } from '../../utils/api'
import { blockExplorerURLs } from '../../utils/blockExplorerURLs'
import nftTxnHelper from '../../utils/nftTxnHelper'
import truncateEthAddress from 'truncate-eth-address'

const NFTTransactions = ({
  chainId,
  contractAddress,
  tokenId,
  ascending = false,
  quoteCurrency = 'USD'
}) => {
  const [nftTxns, setnftTxns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const blockExplorer = blockExplorerURLs.filter(
    (item) => parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId
  )
  const blockexplorerURL = blockExplorer?.length ? blockExplorer[0].url : 'https://blockscan.com/'

  useEffect(() => {
    if (contractAddress) {
      fetchData()
    }
  }, [contractAddress, chainId, tokenId, ascending])

  const fetchData = () => {
    setError(false)
    setIsLoading(true)

    const nftTransactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_transactions/${tokenId}/?quote-currency=${quoteCurrency}&format=JSON&block-signed-at-asc=${ascending}`
    getDataFromCovalentAPI(nftTransactionsEndpoint)
      .then((response) => {
        const responseFilter = response.data.items[0].nft_transactions.filter(
          (x) => x.log_events.length < 20
        )
        const transformedTransactions = nftTxnHelper.transform(responseFilter) //remove spam
        const finalData = nftTxnHelper.pruneNftTxn(transformedTransactions)
        setnftTxns(finalData)

        setIsLoading(false)
      })
      .catch(() => setError(true))
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'txnDate',
      key: 'txnDate'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text) => (
        <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">
          {truncateEthAddress(text)}
        </a>
      )
    },
    {
      title: 'Methods',
      dataIndex: 'method',
      key: 'method',
      width: '25%',
      render: (_, record) => {
        if (record.logEvents.length > 0) {
          return (
            <>
              {record.logEvents.map((logEvent, index) => {
                if (logEvent) {
                  let color = logEvent.name.length > 5 ? 'geekblue' : 'green'
                  if (logEvent.name === 'Transfer') {
                    color = 'volcano'
                  }
                  const content = (
                    <>
                      <Descriptions size={'small'} column={1} title={logEvent.name} bordered>
                        {Object.entries(logEvent).map((item) => {
                          return (
                            <Descriptions.Item key={item[0]} label={item[0]}>
                              {item[1]}
                            </Descriptions.Item>
                          )
                        })}
                      </Descriptions>
                    </>
                  )
                  return (
                    <Popover key={index} content={content} placement="rightBottom" trigger="click">
                      <Tag color={color} key={index} style={{ cursor: 'pointer' }}>
                        {logEvent.name.toUpperCase()}
                      </Tag>
                    </Popover>
                  )
                }
              })}
            </>
          )
        }
      }
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (text, record) => {
        if (!record.isMultipleTransfers) {
          return (
            <a
              href={blockexplorerURL + 'address/' + text}
              target="_blank"
              rel="noopener noreferrer">
              {truncateEthAddress(text)}
            </a>
          )
        } else {
          //This is the content that we provide to the popover table.
          const multiTxnsContent = (
            <>
              <Table
                dataSource={record.multipleTransfers}
                columns={nftTxnHelper.multiTxnsTableColumns(blockExplorerURLs)}
              />
              <em> There are multiple transfer events in this single transaction.</em>
            </>
          )
          return (
            <Popover placement="rightBottom" content={multiTxnsContent} trigger="click">
              <Tag color="blue" style={{ cursor: 'pointer' }}>
                Multiple
              </Tag>
            </Popover>
          )
        }
      }
    },
    {
      title: 'Gas Fee',
      dataIndex: 'gasSpent',
      key: 'gasSpent',
      width: '10%',
      render: (text, record) => {
        const gasFee = (record.gasSpent * record.gasPrice) / 10 ** 18
        const gasFeeQuote = (gasFee * record.gasQuoteRate).toFixed(2)
        return (
          <div style={{ fontSize: '1.3em' }}>
            <p>
              {gasFee.toFixed(6)} ETH{' '}
              <img
                alt=""
                src="https://res.cloudinary.com/dl4murstw/image/upload/v1668511869/gas-station_ydpfe5.png"
                height="14"
              />
            </p>
            <p>(${gasFeeQuote})</p>
          </div>
        )
      }
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
  } else if (!isLoading && nftTxns) {
    return <Table dataSource={nftTxns} columns={columns} rowKey="txnHash" />
  }
}

export default NFTTransactions
