import SwapTxnsAccount from './SwapTxnsAccount'

export default {
  title: '1.Web3-Components/SwapTxnsAccount',
  component: SwapTxnsAccount
}
const Template = (args) => <SwapTxnsAccount {...args} />

export const ColaventSwapTxnsAccount = Template.bind({})
ColaventSwapTxnsAccount.args = {
  chainId: '1',
  swapName: 'sushiswap',
  accountAddress: '0xb155b245c1a6fd99735b03ff1a8d8ecb165cce49'
}
export const ColaventSwapTxnsAccount2 = Template.bind({})
ColaventSwapTxnsAccount2.args = {
  chainId: '1',
  swapName: 'sushiswap',
  accountAddress: '0x9a044da6762352cefc5f7f1eaf1bda7f1e60fd11'
}
