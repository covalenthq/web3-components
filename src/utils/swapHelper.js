const transform = (pool) => {
  const transformedPool = pool.map((info) => {
    return {
      token0: info.token_0,
      token1: info.token_1,
      swapCount: info.swap_count_24h,
      tvl: info.total_liquidity_quote,
      poolName: `${info.token_0.contract_ticker_symbol} / ${info.token_1.contract_ticker_symbol}`,
      volume7D: info.volume_7d_quote,
      fee7D: info.fee_24h_quote // currently the api provides the information of 7 days here will change the same later
    }
  })
  return transformedPool
}
export default transform
