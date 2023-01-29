import PortfolioHistory from './PortfolioHistory'

export default {
  title: '1.Web3-Components/PortfolioHistory',
  component: PortfolioHistory
}
const Template = (args) => <PortfolioHistory {...args} />

export const UserPortfolioHistory = Template.bind({})
UserPortfolioHistory.args = {
  chainId: '1',
  walletAddress: 'vitalik.eth'
}
