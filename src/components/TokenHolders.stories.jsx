import TokenHolders from './TokenHolders'

export default {
  title: '1.Web3-Components/TokenHolders',
  component: TokenHolders
}
const Template = (args) => <TokenHolders {...args} />

export const ColaventTokenHolders = Template.bind({})
ColaventTokenHolders.args = {
  chainId: '1',
  tokenAddress: '0x3883f5e181fccaf8410fa61e12b59bad963fb645'
}
