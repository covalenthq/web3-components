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
- [`<ChainSelector />`](#chainselector-)
- [`<NFTMetadata />`](#NFTMetadata-)

&nbsp;
---

### `<TokenBalances />`

![Token balances demo](https://github.com/covalenthq/web3-components/blob/main/src/assets/token-balances-rc-demo.gif?raw=true)

The `<TokenBalances />` component provides a complete and paginated balances table with all the ERC20 tokens and NFTs for a given wallet `address` and `chainId`.

#### Required Props:
- `address`
- `chainId`

#### Optional Props:
- `nft`: Defaults to `true`. Set to `false` to omit fetching NFTs.
- `noNFTFetch`: Defaults to `true`. Set to `false` to fetch all the NFT metadata, which may take some time.
- `quoteCurrency`: Defaults to `USD`. Visit the [API Reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1) to see the full list of quote currency options.


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

#### Required Props:
- `address`  
- `chainId`

#### Optional Props:
- `ascending`: Defaults to `false` and provides the most recent transfer first. Set to `true` to get transfers in chronological order.
- `noLogs`: Defaults to `false`. Set to `true` to omit fetching decoded event logs.
- `quoteCurrency`: Defaults to `USD`. Visit the [API Reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1) to see the full list of quote currency options.


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

#### Required Props:
- `tokenAddress`
- `chainId`

#### Optional Props:
- `blockHeight`: Defaults to `latest`. Specify a block height to fetch all the token holders as of that height.
- `pageSize`: Defaults to `99999`.


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

#### Required Props:
- `address`
- `chainId`

#### Optional Props:
- `ascending`: Defaults to `false` and provides the most recent transfer first. Set to `true` to get transfers in chronological order.
- `noLogs`: Defaults to `false`. Set to `true` to omit fetching decoded event logs.
- `pageSize`: Defaults to `99999`.
- `quoteCurrency`: Defaults to `USD`. Visit the [API Reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1) to see the full list of quote currency options.


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

#### Required Props:
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
---
### `<NFTMetadata />`

![lucasespinosa28 github io_web3-nft-component_iframe html_args= globals=backgrounds value_!hex(F8F8F8) id=nft--image viewMode=story (1)](https://user-images.githubusercontent.com/52639395/214548089-798b3e71-1077-498b-97bd-7fe58038bc44.png)

the ```<NFTMetadata />``` is a component that helps you to display NFT and it supports **video** and **audio** NFTs, in the Documation on storybook have more examples em every Props configuration.

#### [Documentation](https://lucasespinosa28.github.io/web3-nft-component/?path=/docs/nft--image)
.   

#### Required Props:
- `contractAddress`
- `tokenId`

#### Sample code:
```jsx
import { NFTMetadata } from 'test-web3-components';

function App() {
  return(
    <div>
      <NFTMetadata 
        chainId="1" 
        contractAddress="0x7c3e8096b70a4ddc04c4344b8f33b97c9d12bc4e" 
        tokenId="4224" 
        markeplaces={['opensea','rarible']}
        size="512"  />
    </div> 
  )
}

export default App;
```
