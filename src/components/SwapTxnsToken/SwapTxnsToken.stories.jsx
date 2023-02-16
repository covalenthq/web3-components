import SwapTxnsToken from './SwapTxnsToken'

export default {
  title: '1.Web3-Components/SwapTxnsToken',
  component: SwapTxnsToken
}
const Template = (args) => <SwapTxnsToken {...args} />

export const ColaventSwapTxnsToken = Template.bind({})
ColaventSwapTxnsToken.args = {
  chainId: '1',
  swapName: 'sushiswap',
  tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
}

// 0xdac17f958d2ee523a2206206994597c13d831ec7
