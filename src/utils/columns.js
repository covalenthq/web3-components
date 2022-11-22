import React from 'react'
import truncateEthAddress from 'truncate-eth-address'
import { Tag, Popover, Descriptions } from 'antd'

const columns = (blockexplorerURL) => [
  {
    title: 'Type',
    dataIndex: 'flow',
    key: 'flow',
    width: '12%',
    render: (text, record) => {
      const newDate = new Date(record.date)
      const timeString12Hr = newDate.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      })
      const day = newDate.toLocaleString('en-US', { day: 'numeric', month: 'short' })
      return (
        <>
          <p style={{ fontSize: '2em', margin: '0' }}>{text}</p>
          <div style={{ fontSize: '1.3em', margin: '0' }}>
            {day}, {timeString12Hr}
          </div>
        </>
      )
    }
  },
  {
    title: 'Methods',
    dataIndex: 'method',
    key: 'method',
    width: '8%',
    render: (_, record) => {
      if (record.logEvents.length > 0) {
        return (
          <>
            {record.logEvents.map((logEvent, index) => {
              if (logEvent) {
                let color = logEvent.name.length > 5 ? 'geekblue' : 'green'
                if (logEvent.name === 'Transfer') {
                  color = 'volcano'
                }
                const content = (
                  <>
                    <Descriptions size={'small'} column={1} title={logEvent.name} bordered>
                      {Object.entries(logEvent).map((item) => {
                        return (
                          <Descriptions.Item key={item[0]} label={item[0]}>
                            {item[1]}
                          </Descriptions.Item>
                        )
                      })}
                    </Descriptions>
                  </>
                )
                return (
                  <Popover key={index} content={content} placement="rightBottom" trigger="click">
                    <Tag color={color} key={index} style={{ cursor: 'pointer' }}>
                      {logEvent.name.toUpperCase()}
                    </Tag>
                  </Popover>
                )
              }
            })}
          </>
        )
      }
    }
  },
  {
    title: '',
    dataIndex: 'from',
    key: 'from',
    width: '3%',
    render: (text, record) => {
      if (record.category === ('erc20' || 'ethTransfer')) {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668495917/user_1_vd4ki1.png"
            width="40"
          />
        )
      } else {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668495918/scroll_bkmays.png"
            width="40"
          />
        )
      }
    }
  },
  {
    title: 'Interacted With',
    dataIndex: 'to',
    key: 'to',
    width: '20%',
    render: (text, record) => {
      const transfers = record.logEvents.filter((logEvent) => {
        if (logEvent) {
          return logEvent.name === 'Transfer'
        }
      })
      if (record.flow === 'Receive') {
        return (
          <div style={{ fontSize: '1.3em' }}>
            <div>From</div>
            <div>
              <a
                href={blockexplorerURL + 'address/' + record.from}
                target="_blank"
                rel="noopener noreferrer">
                {truncateEthAddress(record.from)}
              </a>
            </div>
          </div>
        )
      } else if (record.flow === 'Transact') {
        return (
          <div style={{ fontSize: '1.3em' }}>
            <div>To</div>
            <div>
              <a
                href={blockexplorerURL + 'address/' + record.to}
                target="_blank"
                rel="noopener noreferrer">
                {truncateEthAddress(record.to)}
              </a>
            </div>
          </div>
        )
      } else if (record.flow === 'Send') {
        if (transfers[0]) {
          return (
            <div style={{ fontSize: '1.3em' }}>
              <div>To</div>
              <div>
                <a
                  href={blockexplorerURL + 'address/' + transfers[0].param_to}
                  target="_blank"
                  rel="noopener noreferrer">
                  {truncateEthAddress(String(transfers[0].param_to))}
                </a>
              </div>
            </div>
          )
        } else if (record.category === 'ethTransfer') {
          return (
            <div style={{ fontSize: '1.3em' }}>
              <div>To</div>
              <div>
                <a
                  href={blockexplorerURL + 'address/' + record.to}
                  target="_blank"
                  rel="noopener noreferrer">
                  {truncateEthAddress(String(record.to))}
                </a>
              </div>
            </div>
          )
        }
      } else if (record.flow === 'Exchange') {
        if (transfers[0]?.logo && transfers[0].param_value && transfers[0].contractDecimals) {
          const symbol = transfers[0].param_from === record.from ? '-' : '+'
          return (
            <div style={{ display: 'flex' }}>
              <img alt="" src={transfers[0]?.logo} height="50" />
              <div style={{ fontSize: '1.3em', marginLeft: '3px' }}>
                {symbol}
                {(Number(transfers[0].param_value) / 10 ** transfers[0].contractDecimals).toFixed(
                  2
                )}
                <div>USDC</div>
              </div>
            </div>
          )
        }
      }
    }
  },
  {
    title: '',
    dataIndex: 'flow',
    key: 'flow',
    width: '5%',
    render: (text, record) => {
      if (record.flow === 'Receive') {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/right-arrow_1_owfvzh.png"
            width="60"
          />
        )
      } else if (record.flow === 'Send') {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/left-arrow_kxwpcx.png"
            width="60"
          />
        )
      } else if (record.flow === 'Exchange') {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668492843/right-left_uom8y3.png"
            width="60"
          />
        )
      } else {
        return (
          <img
            alt=""
            src="https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/left-arrow_kxwpcx.png"
            width="60"
          />
        )
      }
    }
  },
  {
    title: 'Token',
    dataIndex: 'logEvents[0].name',
    key: 'logEvents',
    width: '15%',
    render: (text, record) => {
      const transfers = record.logEvents.filter((logEvent) => {
        if (logEvent) {
          return logEvent.name === 'Transfer'
        }
      })
      if (record.category === 'erc20') {
        if (
          record.logEvents[0]?.logo &&
          record.logEvents[0].param_value &&
          record.logEvents[0].contractDecimals
        ) {
          const symbol = record.flow === 'Receive' ? '+' : '-'
          return (
            <div style={{ display: 'flex' }}>
              <img alt="" src={record.logEvents[0].logo} height="50" />
              <div style={{ fontSize: '1.3em', marginLeft: '3px' }}>
                {symbol}
                {(
                  Number(record.logEvents[0].param_value) /
                  10 ** record.logEvents[0].contractDecimals
                ).toFixed(2)}
                <div>{record.logEvents[0].ticker}</div>
              </div>
            </div>
          )
        } else if (record.logEvents[0]?.param_tokenId && record.logEvents[0].logo) {
          const symbol = record.flow === 'Receive' ? '+' : '-'
          return (
            <div style={{ display: 'flex' }}>
              <img alt="" src={record.logEvents[0].logo} height="50" />
              <div style={{ fontSize: '1.3em', marginLeft: '3px' }}>
                {symbol}
                {record.logEvents[0].param_tokenId}
                <div>{record.logEvents[0].ticker}</div>
              </div>
            </div>
          )
        }
      } else if (record.category === 'ethTransfer') {
        const symbol = record.flow === 'Receive' ? '+' : '-'
        return (
          <div style={{ display: 'flex' }}>
            <img
              alt=""
              src="https://res.cloudinary.com/dl4murstw/image/upload/v1668503933/0x0000000000000000000000000000000000000000_oinhk2.png"
              height="50"
            />
            <div style={{ fontSize: '1.3em', marginLeft: '3px' }}>
              {symbol}
              {(Number(record.value) / 10 ** 18).toFixed(5)}
              <div>ETH</div>
            </div>
          </div>
        )
      } else if (record.category === 'swap') {
        if (transfers[1]?.logo && transfers[1].param_value && transfers[1].contractDecimals) {
          const symbol = transfers[1].param_from !== record.from ? '+' : '-'
          return (
            <div style={{ display: 'flex' }}>
              <img alt="" src={transfers[1]?.logo} height="50" />
              <div style={{ fontSize: '1.3em', marginLeft: '3px' }}>
                {symbol}
                {(Number(transfers[1].param_value) / 10 ** transfers[1].contractDecimals).toFixed(
                  2
                )}
                <div>{transfers[1].ticker}</div>
              </div>
            </div>
          )
        } else {
          return (
            <a
              href={blockexplorerURL + 'tx/' + record.txnHash}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="https://res.cloudinary.com/dl4murstw/image/upload/v1668603364/link_ykhdal.png"
                height="50"
              />{' '}
              Learn more
            </a>
          )
        }
      } else {
        return (
          <a
            href={blockexplorerURL + 'tx/' + record.txnHash}
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://res.cloudinary.com/dl4murstw/image/upload/v1668603364/link_ykhdal.png"
              height="50"
            />{' '}
            Learn more
          </a>
        )
      }
    }
  },
  {
    title: 'Gas Fee',
    dataIndex: 'gasSpent',
    key: 'gasSpent',
    width: '10%',
    render: (text, record) => {
      const gasFee = (record.gasSpent * record.gasPrice) / 10 ** 18
      const gasFeeQuote = (gasFee * record.gasQuoteRate).toFixed(2)
      return (
        <div style={{ fontSize: '1.3em' }}>
          <p>
            {gasFee.toFixed(6)} ETH{' '}
            <img
              alt=""
              src="https://res.cloudinary.com/dl4murstw/image/upload/v1668511869/gas-station_ydpfe5.png"
              height="14"
            />
          </p>
          <p>(${gasFeeQuote})</p>
        </div>
      )
    }
  },
  {
    title: 'Transaction',
    dataIndex: 'txnHash',
    key: 'txnHash',
    width: '10%',
    render: (txnHash) => {
      return (
        <a
          style={{ fontSize: '1.3em' }}
          href={blockexplorerURL + 'tx/' + txnHash}
          target="_blank"
          rel="noopener noreferrer">
          {' '}
          View Transaction
        </a>
      )
    }
  }
]

export { columns }
