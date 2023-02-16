import ERC20Transfers from './ERC20Transfers'

export default {
  title: '1.Web3-Components/ERC20Transfers',
  component: ERC20Transfers
}
const Template = (args) => <ERC20Transfers {...args} />

export const ColaventERC20Transfer = Template.bind({})
ColaventERC20Transfer.args = {
  chainId: '80001',
  address: '0x4fCC5CE041ecADb2fF791e2f14a74f788d847024'
}
