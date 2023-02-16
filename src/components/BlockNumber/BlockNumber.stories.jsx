import BlockNumber from './BlockNumber'

export default {
  title: '1.Web3-Components/BlockNumber',
  component: BlockNumber
}
const Template = (args) => {
  return <BlockNumber {...args} />
}

export const ColaventBlockNumber = Template.bind({})
ColaventBlockNumber.args = {
  chainId: '1'
}
export const ColaventBlockNumberMumbai = Template.bind({})
ColaventBlockNumberMumbai.args = {
  chainId: '80001'
}
