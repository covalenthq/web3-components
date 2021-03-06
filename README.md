# Web3 Components Library

This web3 library is powered by the [Covalent Unified API](https://www.covalenthq.com/?utm_source=web3_components&utm_medium=docs) and consists of useful React components to fetch any on-chain data across any of the 30+ Covalent supported blockchain networks.

These components do not require an active web3 provider since data is hosted, indexed and queried from the Covalent Network. However, an [API Key](https://www.covalenthq.com/platform?utm_source=web3_components&utm_medium=docs) is required to use them. 

Please refer to the [Covalent API reference](https://www.covalenthq.com/docs/api/#/0/0/USD/1?utm_source=web3_components&utm_medium=docs) for documentation on how the API works. 

## Quick Start

Install with npm: `npm install @covalenthq-tools/web3-components`

or

Install with yarn: `yarn install @covalenthq-tools/web3-components`

## Web3 Components

### `<TokenBalances />`
![Token balances table](./src/assets/token-balances-table.png)

The `<TokenBalances />` component provides a complete and paginated balances table with all the ERC20 tokens and NFTs for a given wallet `address` and `chainId`.

#### Props:
- `apikey`
- `address`
- `chainId`


#### Sample code:
```jsx
import { TokenBalances } from '@covalenthq-tools/web3-components';

function App() {
  return(
    <div className="TokenBalances">
      <TokenBalances apikey={process.env.REACT_APP_COVALENT_API_KEY} address="demo.eth" chainId="1" />
    </div>
  )
}

export default App;
```
