
import { useState, useEffect, useCallback } from 'react'
import { Table, Button } from 'antd'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export const ExchangeChart = ({
  chainId,
  exchangeName
}) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [period, setPeriod] = useState('7d')

  const fetchData = useCallback(() => {
    if (!(chainId && exchangeName)) {
      setData([])
      setError(false)
    }

    setError(false)
    setIsLoading(true)

    const URL = `https://api.covalenthq.com/v1/${chainId}/xy=k/${exchangeName}/ecosystem/`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        setIsLoading(false)
        setData(response.data.items)
      })
      .catch(() => setError(true))
  }, [chainId, exchangeName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return <Table loading={true} />
  }

  if (error || data.length === 0) {
    return <p> Unable to fetch data</p>
  }

  const togglePeriod = () => {
    setPeriod(period => period === '7d' ? '30d' : '7d')
  }

  const { liquidity_chart_7d, liquidity_chart_30d, volume_chart_7d, volume_chart_30d } = data[0]

  const liquidityChart7d = (period === '7d' ? liquidity_chart_7d : liquidity_chart_30d).map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.liquidity_quote
    return { x, y }
  })

  const volumeChart7d = (period === '7d' ? volume_chart_7d : volume_chart_30d).map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.volume_quote
    return { x, y }
  })

  const liquidityChart7dData = {
    datasets: [
      {
        label: 'Liquidity',
        data: liquidityChart7d,
        yAxisID: 'y',
        borderColor: '#ff0000',
      },
      {
        label: 'Volume',
        data: volumeChart7d,
        yAxisID: 'y2',
        borderColor: '#3275a8',
      }
    ]
  }

  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <Button.Group>
          <Button rounded disabled={period === '7d'} onClick={togglePeriod}>7d</Button>
          <Button rounded disabled={period === '30d'} onClick={togglePeriod}>30d</Button>
        </Button.Group>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <Line
          height={100}
          data={liquidityChart7dData}
          options={{
            scales: {
              y: {
                type: 'linear',
                position: 'left',
              },
              y2: {
                type: 'linear',
                position: 'right',
              },
            }
          }}
        />
      </div>
    </div>
  )
}

export default ExchangeChart
