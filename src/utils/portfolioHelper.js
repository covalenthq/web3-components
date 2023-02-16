const prunePortfolio = (data) => {
  //   const prune = data.forEach((r) => console.log(r))
  const prune = data.map((m) => {
    const cc = m.holdings.map((t) => {
      return {
        time: t.timestamp,
        value: t.close.balance * t.close.quote
      }
    })
    return {
      dec: m.contract_decimals,
      holding: cc
    }
  })
  return prune
  //   const prune = data.forEach((r) => {
  //     let dec = r.contract_decimals
  //     // console.log(dec)
  //     r.holdings.map((hold) => {
  //       if (hold.close.quote != 0 && hold.close.quote) {
  //         // console.log(hold.close.balance, hold.close.quote)
  //         return {
  //           time: hold.timestamp,
  //           value: hold.close.balance * dec * hold.close.quote
  //         }
  //       }
  //     })
  //   })
}

export default prunePortfolio
