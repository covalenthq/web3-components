import Transactions from './Transactions'

export default {
  title: '1.Web3-Components/Transactions',
  component: Transactions
}
const Template = (args) => <Transactions {...args} />

export const ColaventTransactions = Template.bind({})
ColaventTransactions.args = {
  chainId: '80001',
  address: '0x4fCC5CE041ecADb2fF791e2f14a74f788d847024'
}
