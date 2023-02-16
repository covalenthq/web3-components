import SwapLiquidityChart from './SwapLiquidityChart'

export default {
  title: '1.Web3-Components/SwapLiquidityChart',
  component: SwapLiquidityChart
}
const Template = (args) => {
  return <SwapLiquidityChart {...args} />
}

export const ColaventSwapLiquidityChart = Template.bind({})
ColaventSwapLiquidityChart.args = {
  chainId: '80001',
  swapName: 'sushiswap'
}
