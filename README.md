# Web3 Components Library

**Live Demo:** https://covalenthq.github.io/Web3-Components-Demo

This web3 library is powered by the [Covalent Unified API](https://www.covalenthq.com/?utm_source=web3_components&utm_medium=docs) and consists of useful React components to fetch any on-chain data across any of the 30+ Covalent supported blockchain networks.

These components do not require an active web3 provider since data is hosted, indexed and queried from the Covalent Network. However, an [API Key](https://www.covalenthq.com/platform?utm_source=web3_components&utm_medium=docs) is required to use them.

Please refer to the [Covalent API reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1?utm_source=web3_components&utm_medium=docs) for documentation on how the API works.

## Quick Start

1. Install with npm: `npm install @covalenthq/web3-components` or install with yarn: `yarn install @covalenthq/web3-components`

2. Create an `.env` file and set the variable: `REACT_APP_COVALENT_API_KEY=`[Your Covalent API Key](https://covalenthq.com/platform/?utm_source=covalent-react&utm_medium=web3-resource)

**Note: React v18.0 and greater is required to use these components**

&nbsp;
## Web3 Components

- [`<TokenBalances />`](#tokenbalances-)
- [`<ERC20Transfers />`](#erc20transfers-)
- [`<TokenHolders />`](#tokenholders-)
- [`<Transactions />`](#transactions-)

&nbsp;
---

### `<TokenBalances />`

![Token balances demo](https://github.com/covalenthq/web3-components/blob/main/src/assets/token-balances-rc-demo.gif?raw=true)

The `<TokenBalances />` component provides a complete and paginated balances table with all the ERC20 tokens and NFTs for a given wallet `address` and `chainId`.

#### Props:
- `address`
- `chainId`


#### Sample code:
```jsx
import { TokenBalances } from '@covalenthq/web3-components';

function App() {
  return(
    <div className="TokenBalances">
      <TokenBalances
        address="demo.eth"
        chainId="1"
      />
    </div>
  )
}

export default App;
```  
---

### `<ERC20Transfers />`  

![ERC20Transfers Demo](https://github.com/covalenthq/web3-components/blob/main/src/assets/erc20Transfers-rc-demo.gif?raw=true)

The ERC20Transfers component returns a paginated list of all the ERC20 token transfers of a wallet address on a particular chain. It takes an `address` and `chainId` as inputs and uses the [`Get Transactions for Address`](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1) endpoint.

#### Props:
- `address`  
- `chainId`  

#### Sample code:
``` jsx
import { useState } from 'react'
import { ERC20Transfers } from '@covalenthq/web3-components'
import { Input } from 'antd'
const { Search } = Input
const FormControls = ({onSubmit}) => {
    return (
        <Search placeholder='Enter Wallet Address or ENS' onSearch={onSubmit} enterButton
        style={{
            width: 500,
        }}/>
    )
}
function App() {
    const [walletAddress, setWalletAddress] = useState(null)
    const onSubmit = (values) => {
        setWalletAddress(values)
    }
    if (walletAddress) {
        return (
            <>
            <div style={{width: '80%', margin: 'auto'}}>
              <FormControls onSubmit={onSubmit}/>
              <ERC20Transfers address={walletAddress} chainId={1}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div style={{width: '80%', margin: 'auto'}}>
              <FormControls onSubmit={onSubmit}/>
            </div>
            </>
        )
    }
}
export default App;

```
---

### `<TokenHolders />`

![Token holders demo](https://github.com/covalenthq/web3-components/blob/main/src/assets/token-holders-rc-demo.png?raw=true)

The `<TokenHolders />` component provides a complete and paginated token holders table with all the wallet addresses and balances/token IDs for a given ERC20 token or NFT collection `tokenAddress` and `chainId`.

#### Props:
- `tokenAddress`
- `chainId`
- `blockHeight` - (optional, defaults to: `latest`)
- `pageSize` - (optional, defaults to: `99999`)


#### Sample code:
```jsx
import { TokenHolders } from '@covalenthq/web3-components';

function App() {
  return(
    <div className="TokenHolders">
      <TokenHolders
        tokenAddress="0xD417144312DbF50465b1C641d016962017Ef6240"
        chainId="1"
      />
    </div>
  )
}

export default App;
```
---

### `<Transactions />`

![Transactions demo](https://github.com/covalenthq/web3-components/blob/main/src/assets/transactions-rc-demo.png?raw=true)

The `<Transactions />` component provides a complete and paginated table with all the transactions in descending chronological order including the type, methods, receiving address, token amount or NFT token Id and gas fees for a given wallet or contract `address` and `chainId`.

#### Props:
- `address`
- `chainId`


#### Sample code:
```jsx
import { Transactions } from '@covalenthq/web3-components';

function App() {
  return(
    <div className="Transactions">
      <Transactions
        address="demo.eth"
        chainId="1"
      />
    </div>
  )
}

export default App;
```

---

### `<ChainSelector/>`

![Chain Selector](https://github.com/covalenthq/web3-components/blob/main/src/assets/chain-selector-list.png?raw=true)

The `<ChainSelector />` component provides a dropdown menu with a complete list of all Covalent API supported blockchains. This component takes a callback function using the `setChainName` prop.   

#### Props:
- `setChainName`


#### Sample code:
```jsx
import { ChainSelector } from '@covalenthq/web3-components';

const [chainName, setChainName] = useState('eth-mainnet')

function App() {
  return(
    <div className="ChainSelector">
      <ChainSelector setChainName={setChainName} />
    </div>
  )
}

export default App;
```
