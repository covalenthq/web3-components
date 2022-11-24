const transform = (transactions) => {
  const transformedTransactions = transactions.map((transaction) => {
    const logEvents = transaction.log_events
    return {
      date: transaction.block_signed_at,
      from: transaction.from_address,
      to: transaction.to_address,
      value: transaction.value,
      gasSpent: transaction.gas_spent,
      gasPrice: transaction.gas_price,
      gasQuoteRate: transaction.gas_quote_rate,
      method: extractMethods(logEvents),
      txnHash: transaction.tx_hash,
      logEvents: transformLogEvents(logEvents)
    }
  })
  return transformedTransactions
}

const extractMethods = (logEvents) => {
  const methods = []
  logEvents.map((logEvent) => {
    if (logEvent.decoded) {
      methods.push(logEvent.decoded.name)
    }
    return null
  })
  return methods
}

const transformLogEvents = (logEvents) => {
  const newLogEvents = logEvents.map((item) => {
    if (item.decoded) {
      const returnObject = {
        name: item.decoded.name,
        signature: item.decoded.signature,
        contractDecimals: item.sender_contract_decimals,
        contractName: item.sender_name,
        logo: item.sender_logo_url,
        ticker: item.sender_contract_ticker_symbol,
        contractAddress: item.sender_address
      }

      const params = item.decoded.params
      if (params) {
        params.map((param) => (returnObject['param_' + param.name] = param.value))
      }

      return returnObject
    } else {
      return null
    }
  })
  return newLogEvents
}

export { transform }
