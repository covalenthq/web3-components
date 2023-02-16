import { getDataFromCovalentAPI } from '../../utils/api'
import { useState, useEffect } from 'react'
import { Table, Descriptions } from 'antd'
import defaultLogo from '../../assets/default-logo.png'
import prunePortfolio from '../../utils/portfolioHelper'
import { Bar } from 'react-chartjs-2';

const PortfolioHistory = ({ chainId, walletAddress }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, getData] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetchData()
  }, [chainId, walletAddress])

  const handleImgError = (e) => {
    e.target.src = defaultLogo
  }

  const fetchData = () => {
    setError(false)
    setIsLoading(true)
    const URL = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/portfolio_v2/`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        setIsLoading(false)
        // console.log(response.data.items)
        const prunedDate = prunePortfolio(response.data.items)
        setFiltered(prunedDate)
        console.log(prunedDate)
        getData(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const summaryColumn = [
    {
      title: 'Logo',
      dataIndex: 'logo_url',
      key: 'logo_url',
      width: '5%',
      render: (text) => (
        <img
          src={text}
          onError={handleImgError}
          style={{ width: '30px', height: '30px', borderRadius: '10px' }}
        />
      )
    },
    {
      title: 'Contract Address',
      dataIndex: 'contract_address',
      key: 'contract_address',
      width: '15%'
    },
    {
      title: 'Name',
      dataIndex: 'contract_name',
      key: 'contract_name',
      width: '7%'
    },
    {
      title: 'Symbol',
      dataIndex: 'contract_ticker_symbol',
      key: 'contract_ticker_symbol',
      width: '5%'
    },
    {
      title: 'Check Last 30D data',
      dataIndex: 'contract_address',
      key: 'contract_address',
      width: '25%',
      render: (_, r) => {
        if (r) {
          console.log(r)
          console.log(filtered)
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }

          return (
            <>
              <Bar data={data} options={options}/>
              {/* {r.holdings.map((t, index) => {
                const content = (
                  <>
                    <Descriptions size={'small'} column={1} title="hh" bordered>
                      hhh
                    </Descriptions>
                  </>
                )
                return (
                  <Popover key={index} content={content} placement="rightBottom" trigger="click">
                    <Tag key={index} color="blue" style={{ cursor: 'pointer' }}>
                      gggg
                    </Tag>
                  </Popover>
                )
              })} */}
            </>
          )
        }
      }
    }
  ]

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) {
    return <Table loading={true} />
  } else if (!isLoading && data) {
    return (
      <>
        <Descriptions title="Portfolio History" bordered>
          <Descriptions.Item label="Wallet Address">{data.address}</Descriptions.Item>
          <Descriptions.Item label="Chain Id">{data.chain_id}</Descriptions.Item>
          <Descriptions.Item label="Token Count">{data.items?.length}</Descriptions.Item>
          <Descriptions.Item label="Updated at">{data.updated_at}</Descriptions.Item>
          <Descriptions.Item label="Chain Name">{data.chain_name}</Descriptions.Item>
          <Descriptions.Item label="Quote Currency">{data.quote_currency}</Descriptions.Item>
        </Descriptions>
        <Table columns={summaryColumn} dataSource={data.items} rowKey="contract_address" />
      </>
    )
  }
}

export default PortfolioHistory
