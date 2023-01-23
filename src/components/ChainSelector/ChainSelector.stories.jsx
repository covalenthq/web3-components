import { useState } from 'react'
import ChainSelector from './ChainSelector'

// const [Chain, setChain] = useState([])
// console.log(Chain)
export default {
  title: '1.Web3-Components/chainSelector',
  component: ChainSelector
}
const Template = (args) => {
  const [Chain, setChain] = useState([])
  console.log(Chain)
  return <ChainSelector {...args} setChainName={setChain} />
}

export const ColaventChainSelector = Template.bind({})
