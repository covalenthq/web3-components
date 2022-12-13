import { useState, useEffect } from 'react'
import { Table, Popover, Button } from 'antd'
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons'
import erc20TransfersHelper from '../utils/erc20TransfersHelper'
import { blockExplorerURLs } from '../utils/blockExplorerURLs'
import truncateEthAddress from 'truncate-eth-address'
import defaultLogo from '../assets/default-logo.png'
import { getDataFromCovalentAPI } from '../utils/api'

const ERC20Transfers = ({ address, chainId, ascending = false, noLogs = false, quoteCurrency = 'USD' }) => {
  const blockExplorer = blockExplorerURLs.filter(
    (item) => (parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId)
  )
  const blockexplorerURL = (blockExplorer?.length) ? blockExplorer[0].url : 'https://blockscan.com/'
  const [txnData, setTxnData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (address) {
      fetchData()
    }
  }, [address, chainId, ascending, noLogs, quoteCurrency])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?quote-currency=${quoteCurrency}&format=JSON&block-signed-at-asc=${ascending}&no-logs=${noLogs}`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        const transfersData = erc20TransfersHelper.filterForTransfers(response)
        const transfers = erc20TransfersHelper.pruneTransfers(transfersData, address)
        setIsLoading(false)
        setTxnData(transfers)
      })
      .catch((e) => setError(true))
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
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
          const multiTransfersContent = (
            <>
              <Table
                dataSource={record.multipleTransfers}
                columns={erc20TransfersHelper.multiTransfersTableColumns(blockexplorerURL)}
              />
              <InfoCircleOutlined />
              <em> There are multiple transfer events in this single transaction.</em>
            </>
          )
          return (
            <Popover placement="rightBottom" content={multiTransfersContent} trigger="focus">
              <Button>
                {' '}
                <span>
                  <WarningOutlined style={{ fontSize: '1em' }} /> Multiple
                </span>
              </Button>
            </Popover>
          )
        }
      }
    },
    {
      title: 'Flow',
      dataIndex: 'transferFlow',
      key: 'transferFlow'
    },
    {
      title: 'Token Address',
      dataIndex: 'tokenAddress',
      key: 'tokenAddress',
      render: (text) => (
        <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">
          {truncateEthAddress(text)}
        </a>
      )
    },
    {
      title: 'Token Logo',
      dataIndex: 'tokenLogo',
      key: 'tokenLogo',
      render: (text) => <img alt="token logo" onError={handleImgError} src={text} width="40" />
    },
    {
      title: 'Token Name',
      dataIndex: 'tokenName',
      key: 'tokenName'
    },
    {
      title: 'Token Symbol',
      dataIndex: 'tokenSymbol',
      key: 'tokenSymbol'
    },
    {
      title: 'Amount',
      dataIndex: 'transferValue',
      key: 'transferValue'
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
  } else if (!isLoading && txnData) {
    console.log('txnData', txnData)
    return <Table dataSource={txnData} columns={columns} rowKey="txnHash" />
  }
}

export default ERC20Transfers
