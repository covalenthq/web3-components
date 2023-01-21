import SwapPool from './SwapPool'

export default {
  title: '1.Web3-Components/SwapPool',
  component: SwapPool
}
const Template = (args) => <SwapPool {...args} />

export const ColaventSwapPool = Template.bind({})
ColaventSwapPool.args = {
  chainId: '1',
  swapName: 'sushiswap'
}
