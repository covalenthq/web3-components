import NFTTransactions from './NFTTransactions'

export default {
  title: '1.Web3-Components/NFTTransactions',
  component: NFTTransactions
}
const Template = (args) => <NFTTransactions {...args} />

export const ColaventNFTTransactions = Template.bind({})
ColaventNFTTransactions.args = {
  chainId: '1',
  contractAddress: '0x61e3d1c26802df805e9fc22dc26342e29ecfe860',
  tokenId: '81'
}
