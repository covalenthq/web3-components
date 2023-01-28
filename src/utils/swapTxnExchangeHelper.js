const transformSwapTxnExchange = (swaptxn) => {
  const transformed = swaptxn.map((info) => {
    return {
      act: info.act,
      time: info.block_signed_at.slice(0, 10),
      user: info.act === 'SWAP' ? info.sender_address : info.from_address,
      // to: info.act === 'SWAP' ? info.to_address : info.address,
      total: info.total_quote,
      txnHash: info.tx_hash,
      currency: info.quote_currency,
      swapAmount0:
        info.act === 'SWAP'
          ? info.amount_0_in === '0'
            ? info.amount_0_out + 'out'
            : info.amount_0_in + 'in'
          : 'noval',
      swapAmount1:
        info.act === 'SWAP'
          ? info.amount_1_in === '0'
            ? info.amount_1_out + 'out'
            : info.amount_1_in + 'in'
          : 'noval',
      amount0: info.amount_0,
      amount1: info.amount_1,
      token0: info.token_0,
      token1: info.token_1
    }
  })
  return transformed
}

export default transformSwapTxnExchange
