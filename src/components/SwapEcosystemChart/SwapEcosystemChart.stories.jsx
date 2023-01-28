import SwapEcosystemChart from './SwapEcosystemChart'

export default {
  title: '1.Web3-Components/SwapEcosystemChart',
  component: SwapEcosystemChart
}
const Template = (args) => {
  return <SwapEcosystemChart {...args} />
}

export const ColaventSwapEcosystemChart = Template.bind({})
ColaventSwapEcosystemChart.args = {
  chainId: '1',
  swapName: 'sushiswap'
}
