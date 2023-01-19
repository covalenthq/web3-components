import TokenBalances from './TokenBalances'

export default {
  title: '1.Web3-Components/TokenBalances',
  component: TokenBalances
}
const Template = (args) => <TokenBalances {...args} />

export const ColaventTokenBalances = Template.bind({})
ColaventTokenBalances.args = {
  chainId: '80001',
  address: '0x4fCC5CE041ecADb2fF791e2f14a74f788d847024'
}
