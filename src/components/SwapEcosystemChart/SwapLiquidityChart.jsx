import { getDataFromCovalentAPI } from '../../utils/api'
import { useState, useEffect, useCallback } from 'react'
import { Table, Button } from 'antd'
// import { Line } from 'react-chartjs-2'
// import { Line } from '@ant-design/plots'
import { pruneData } from '../../utils/swapEcosystemChartHelper'

const SwapEcosystemChart = ({ chainId, swapName }) => {
  const [data, setData] = useState([])
  const [time, setTime] = useState('7')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

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
        //console.log(prunedData)
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

  const optTime = () => {
    setTime((t) => (t === '7' ? '30' : '7'))
  }

  if (!isLoading && data) {
    console.log(data)

    const liquidityChart = time === '7' ? data.liquidity7dChart : data.liquidity30dChart
    const volumeChart = time === '7' ? data.volume7dChart : data.volume30dChart
    console.log(volumeChart)
    const liquidityChartData = {
      datasets: [
        {
          label: 'Liquidity',
          data: liquidityChart,
          yAxisID: 'y',
          borderColor: '#cfec40'
        }
        //     ,
        // {
        //   label: 'Volume',
        //   data: volumeChart,
        //   yAxisID: 'y2',
        //   borderColor: '#0f0e3c'
        // }
      ]
    }

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
    console.log(liquidityChartData)

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
        <div style={{ height: 500, width: '100%' }}>
          {/* <Line
            height={100}
            data={liquidityChartData}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  position: 'left'
                },
                y2: {
                  type: 'linear',
                  position: 'right'
                }
              }
            }}
          /> */}
          {/* <Line {...config} />; */}
        </div>
      </div>
    )
  }
}

export default SwapEcosystemChart
