import SwapTxnsExchange from './SwapTxnsExchange'

export default {
  title: '1.Web3-Components/SwapTxnsExchange',
  component: SwapTxnsExchange
}
const Template = (args) => <SwapTxnsExchange {...args} />

export const ColaventSwapTxnsExchange = Template.bind({})
ColaventSwapTxnsExchange.args = {
  chainId: '1',
  swapName: 'sushiswap',
  exchangeAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0'
}
