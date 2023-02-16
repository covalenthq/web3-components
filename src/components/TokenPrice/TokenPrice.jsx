const TokenPrice = ({ from, to, chainId, tokenAddress, quoteCurrency = 'USD' }) => {
  let url = `https://api.covalenthq.com/v1/pricing/historical_by_address/${chainId}/USD/${tokenAddress}/?quote-currency=${quoteCurrency}&format=JSON&to=${to}&from=${from}`
}

export default TokenPrice
