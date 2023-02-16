import { getDataFromCovalentAPI } from '../../utils/api'
import { useState, useEffect, useCallback } from 'react'
import { Table, Button } from 'antd'
// import { Line } from '@ant-design/plots'
import { pruneData } from '../../utils/swapEcosystemChartHelper'

const SwapEcosystemChart = ({ chainId, swapName }) => {
  const [data, setData] = useState([])
  const [time, setTime] = useState('7')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const optTime = () => {
    setTime((t) => (t === '7' ? '30' : '7'))
  }

  const fetchData = useCallback(() => {
    if (!(chainId && swapName)) {
      setData([])
      setError(false)
    }
    setError(false)
    setIsLoading(true)

    const URL = `https://api.covalenthq.com/v1/${chainId}/xy=k/${swapName}/ecosystem/`
    getDataFromCovalentAPI(URL)
      .then((response) => {
        console.log(response.data.items)
        const prunedData = pruneData(response.data.items)
        setData(prunedData)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(true)
        console.log(e)
      })
  }, [chainId, swapName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error) {
    return <p> Unable to fetch data</p>
  } else if (isLoading) return <Table loading={isLoading} />
  else if (!isLoading && data) {
    console.log(data)

    const liquidityChart = time === '7' ? data.liquidity7dChart : data.liquidity30dChart
    const volumeChart = time === '7' ? data.volume7dChart : data.volume30dChart
    console.log(liquidityChart, volumeChart)

    // const cdata = [
    //   {
    //     year: '1991',
    //     value: 3
    //   },
    //   {
    //     year: '1992',
    //     value: 4
    //   }
    // ]

    // const config = {
    //   cdata,
    //   xField: 'date',
    //   yField: 'value',
    //   label: {},
    //   point: {
    //     size: 5,
    //     shape: 'diamond',
    //     style: {
    //       fill: 'white',
    //       stroke: '#5B8FF9',
    //       lineWidth: 2
    //     }
    //   },
    //   tooltip: {
    //     showMarkers: false
    //   },
    //   state: {
    //     active: {
    //       style: {
    //         shadowBlur: 4,
    //         stroke: '#000',
    //         fill: 'red'
    //       }
    //     }
    //   },
    //   interactions: [
    //     {
    //       type: 'marker-active'
    //     }
    //   ]
    // }

    return (
      <div>
        <div style={{ marginTop: 10 }}>
          <Button.Group>
            <Button rounded disabled={time === '7'} onClick={optTime}>
              7D
            </Button>
            <Button rounded disabled={time === '30'} onClick={optTime}>
              30D
            </Button>
          </Button.Group>
        </div>
        <div style={{ height: 600, width: '100%' }}>{/* <Line {...config} />; */}</div>
      </div>
    )
  }
}

export default SwapEcosystemChart
