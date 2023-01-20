import truncateEthAddress from 'truncate-eth-address'

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
        contractAddress: item.sender_address,
        logOffset: item.log_offset
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

//Receives an array of txns
const pruneNftTxn = (txnData) => {
  //Maps through each transfer and returns an object array stored in `transfers`
  const txns = txnData.map((txn) => {
    let innerTransfersLogItem = [] //this will be an array of an array of params objects

    const from = txn.from
    const to = txn.to
    const txnDate = txn.date.slice(0, 10)
    const txnHash = txn.txnHash
    const gasSpent = txn.gasSpent
    const gasPrice = txn.gasPrice
    const gasQuoteRate = txn.gasQuoteRate
    const method = txn.method
    const logEvents = txn.logEvents

    const multiTransfersChecker = () => {
      //this function checks whether the txn contains multiple transfers. Returns true when there's > 1 transfers events
      let transfersNum = 0
      for (let i = 0; i < txn.logEvents.length; i++) {
        if (txn.logEvents[i] === null) {
          return false
        }
        if (txn.logEvents[i].name === 'Transfer') {
          transfersNum++
          innerTransfersLogItem.push(txn.logEvents[i])
        }
      }
      return transfersNum > 1 ? true : false
    }
    const isMultipleTransfers = multiTransfersChecker()

    let multipleTransfers = []
    if (isMultipleTransfers) {
      multipleTransfers = innerTransfersLogItem.map((transfersItem) => {
        const fromAddress = transfersItem.param_from
        const toAddress = transfersItem.param_to
        const logOffset = transfersItem.logOffset

        return {
          fromAddress,
          toAddress,
          logOffset
        }
      })
    }
    multipleTransfers.sort((a, b) => parseFloat(a.logOffset) - parseFloat(b.logOffset)) // Sort the transfer events by the order in which they occur within the txn

    return {
      key: txnHash,
      from,
      to,
      txnDate,
      txnHash,
      gasSpent,
      gasPrice,
      gasQuoteRate,
      method,
      logEvents,
      isMultipleTransfers,
      multipleTransfers
    }
  })

  return txns
}

const multiTxnsTableColumns = (blockexplorerURL) => {
  const columns = [
    {
      title: 'From',
      dataIndex: 'fromAddress',
      key: 'from',
      render: (text) => (
        <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">
          {truncateEthAddress(text)}
        </a>
      )
    },
    {
      title: 'To',
      dataIndex: 'toAddress',
      key: 'to',
      render: (text) => (
        <a href={blockexplorerURL + 'address/' + text} target="_blank" rel="noopener noreferrer">
          {truncateEthAddress(text)}
        </a>
      )
    }
  ]

  return columns
}

export default {
  pruneNftTxn,
  multiTxnsTableColumns,
  transform
}
