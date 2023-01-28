export const pruneData = (response) => {
  const liq_chart_7d = response[0].liquidity_chart_7d
  const liq_chart_30d = response[0].liquidity_chart_30d
  const vol_chart_7d = response[0].volume_chart_7d
  const vol_chart_30d = response[0].volume_chart_30d

  const liquidity7dChart = liq_chart_7d.map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.liquidity_quote
    return { x, y }
  })

  const liquidity30dChart = liq_chart_30d.map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.liquidity_quote
    return { x, y }
  })

  const volume7dChart = vol_chart_7d.map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.volume_quote
    return { x, y }
  })

  const volume30dChart = vol_chart_30d.map((item) => {
    const date = new Date(item.dt)
    const x = new Intl.DateTimeFormat('en-US').format(date)
    const y = item.volume_quote
    return { x, y }
  })
  return {
    liq_chart_30d,
    liq_chart_7d,
    vol_chart_30d,
    vol_chart_7d,
    liquidity7dChart,
    liquidity30dChart,
    volume7dChart,
    volume30dChart
  }
}
