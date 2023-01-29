import SwapSelect from './SwapSelect'
import { useState } from 'react'

export default {
  title: '1.Web3-Components/SwapSelect',
  component: SwapSelect
}
const Template = (args) => {
  const [swap, setSwap] = useState([])
  console.log(swap)
  return <SwapSelect {...args} setCurrentSwap={setSwap} />
}

export const ColaventSwapSelect = Template.bind({})
