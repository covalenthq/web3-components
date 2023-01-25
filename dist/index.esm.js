import { useState, useEffect } from 'react';
import { Table, Popover, Button, Descriptions, Tag, Select, Typography, Collapse, Card, Alert, Row, Col, Divider } from 'antd';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import truncateEthAddress from 'truncate-eth-address';
import PropTypes from 'prop-types';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var img = "data:image/png;base64,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";

var getDataFromCovalentAPI = function getDataFromCovalentAPI(URL) {
  var headers = new Headers();
  var authString = "".concat(process.env.REACT_APP_COVALENT_API_KEY, ":");
  headers.set('Authorization', 'Basic ' + window.btoa(authString));
  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(function (resp) {
    if (resp.status === 200) return resp.json();else throw new Error('Invalid response');
  });
};

var TokenBalances = function TokenBalances(_ref) {
  var address = _ref.address,
    chainId = _ref.chainId,
    _ref$nft = _ref.nft,
    nft = _ref$nft === void 0 ? true : _ref$nft,
    _ref$noNFTFetch = _ref.noNFTFetch,
    noNFTFetch = _ref$noNFTFetch === void 0 ? true : _ref$noNFTFetch,
    _ref$quoteCurrency = _ref.quoteCurrency,
    quoteCurrency = _ref$quoteCurrency === void 0 ? 'USD' : _ref$quoteCurrency;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    getData = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  useEffect(function () {
    if (address) {
      fetchData();
    }
  }, [address, chainId, nft, noNFTFetch, quoteCurrency]);
  var handleImgError = function handleImgError(e) {
    e.target.src = img;
  };
  var fetchData = function fetchData() {
    setError(false);
    setIsLoading(true);
    var URL = "https://api.covalenthq.com/v1/".concat(chainId, "/address/").concat(address, "/balances_v2/?quote-currency=").concat(quoteCurrency, "&format=JSON&nft=").concat(nft, "&no-nft-fetch=").concat(noNFTFetch);
    getDataFromCovalentAPI(URL).then(function (response) {
      setIsLoading(false);
      getData(response.data.items);
    }).catch(function (e) {
      return setError(true);
    });
  };
  var columns = [{
    title: '',
    dataIndex: 'logo_url',
    key: 'logo_url',
    render: function render(text) {
      return /*#__PURE__*/jsx("img", {
        src: text,
        onError: handleImgError,
        style: {
          width: '40px',
          height: '40px'
        }
      });
    }
  }, {
    title: 'Name',
    dataIndex: 'contract_name',
    key: 'contract_name'
  }, {
    title: 'Symbol',
    dataIndex: 'contract_ticker_symbol',
    key: 'contract_ticker_symbol'
  }, {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    sorter: function sorter(a, b) {
      return a.balance - b.balance;
    },
    render: function render(_, item) {
      return Number.isInteger(item.balance / Math.pow(10, item.contract_decimals)) ? item.balance / Math.pow(10, item.contract_decimals) : (item.balance / Math.pow(10, item.contract_decimals)).toFixed(4);
    }
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    filters: [{
      text: 'cryptocurrency',
      value: 'cryptocurrency'
    }, {
      text: 'stablecoin',
      value: 'stablecoin'
    }, {
      text: 'nft',
      value: 'nft'
    }, {
      text: 'dust',
      value: 'dust'
    }],
    onFilter: function onFilter(value, item) {
      return item.type.startsWith(value);
    }
  }, {
    title: 'Contract Address',
    dataIndex: 'contract_address',
    key: 'contract_address'
  }];
  if (error) {
    return /*#__PURE__*/jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsx(Table, {
      loading: true
    });
  } else if (!isLoading && data) {
    return /*#__PURE__*/jsx(Table, {
      columns: columns,
      dataSource: data,
      rowKey: "contract_address"
    });
  }
};

var filterForTransfers = function filterForTransfers(res) {
  var txns = res.data.items;

  //Filter only the transactions whose log events contain "transfer" events
  var transfers = txns.filter(function (txn) {
    var txnLogEvents = txn.log_events;

    // //Filter out the empty log events, or those with too many log events
    if (txnLogEvents.length === 0 || txnLogEvents.length > 20) {
      return false;
    }
    var isTransfer;
    var logEventsBoolArray = txnLogEvents.map(function (logEvent) {
      if (logEvent.decoded) {
        //exclude decoded==null cases
        if (logEvent.decoded.name === 'Transfer') {
          isTransfer = true;
        } else {
          isTransfer = false;
        }
      }
      return isTransfer;
    });

    //If bool arr contains true, returns true -> filter accepts this entry and
    //it's added to transfers variable
    return logEventsBoolArray.includes(true) ? true : false;
  });
  return transfers; // an array
};

//Receives an array of transfers
var pruneTransfers = function pruneTransfers(transfersData, address) {
  //Maps through each transfer and returns an object array stored in `transfers`
  var transfers = transfersData.map(function (transfer) {
    var innerTransfersLogItem = []; //this will be an array of an array of params objects

    var transferFlow = transfer.from_address.toLowerCase() === address.toLowerCase() ? 'Out' : 'In';
    var transferLogEvent = transfer.log_events.filter(function (logEvent) {
      //Returns true only for those items that are transfer events.
      var isTransfer;
      if (logEvent.decoded) {
        if (logEvent.decoded.name === 'Transfer') {
          isTransfer = true;
        } else {
          isTransfer = false;
        }
      }
      return isTransfer;
    });
    console.log('Transfer log event', transferLogEvent);
    var from = transferFlow === 'Out' ? address : transfer.from_address;
    var to = transferFlow === 'Out' ? transferLogEvent[0].decoded.params[1].value : address; //Notes on this field: this specifies where the funds are transferred to. Not the contract interacted with.
    var date = transfer.block_signed_at.slice(0, 10);
    var tokenName = transferLogEvent[0].sender_name;
    var tokenSymbol = transferLogEvent[0].sender_contract_ticker_symbol;
    var tokenLogo = transferLogEvent[0].sender_logo_url;
    var transferValue = parseInt(transferLogEvent[0].decoded.params[2].value) / Math.pow(10, parseInt(transferLogEvent[0].sender_contract_decimals));
    var tokenAddress = transferLogEvent[0].sender_address;
    var txnHash = transfer.tx_hash;
    var isERC721 = transferLogEvent[0].decoded.params[2].name === 'tokenId' ? true : false;
    var multiTransfersChecker = function multiTransfersChecker() {
      //this function checks whether the txn contains multiple transfers. Returns true when there's > 1 transfers events
      var transfersNum = 0;
      for (var i = 0; i < transfer.log_events.length; i++) {
        if (transfer.log_events[i].decoded === null) {
          return false;
        }
        if (transfer.log_events[i].decoded.name === 'Transfer') {
          transfersNum++;
          innerTransfersLogItem.push(transfer.log_events[i]);
        }
      }
      return transfersNum > 1 ? true : false;
    };
    var isMultipleTransfers = multiTransfersChecker();
    var multipleTransfers = [];
    if (isMultipleTransfers) {
      multipleTransfers = innerTransfersLogItem.map(function (transfersItem) {
        var fromAddress = transfersItem.decoded.params[0].value;
        var toAddress = transfersItem.decoded.params[1].value;
        var amount = parseInt(transfersItem.decoded.params[2].value) / Math.pow(10, parseInt(transferLogEvent[0].sender_contract_decimals));
        var innerTokenLogo = transfersItem.sender_logo_url;
        var innerTokenName = transfersItem.sender_name;
        var logOffset = transfersItem.log_offset;
        return {
          fromAddress: fromAddress,
          toAddress: toAddress,
          amount: amount,
          innerTokenLogo: innerTokenLogo,
          innerTokenName: innerTokenName,
          logOffset: logOffset
        };
      });
    }
    multipleTransfers.sort(function (a, b) {
      return parseFloat(a.logOffset) - parseFloat(b.logOffset);
    }); // Sort the transfer events by the order in which they occur within the txn

    return {
      key: txnHash,
      date: date,
      transferFlow: transferFlow,
      from: from,
      to: to,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenLogo: tokenLogo,
      transferValue: transferValue,
      tokenAddress: tokenAddress,
      txnHash: txnHash,
      isMultipleTransfers: isMultipleTransfers,
      isERC721: isERC721,
      multipleTransfers: multipleTransfers
    };
  });
  var transfersWithoutNFTs = transfers.filter(function (transfer) {
    return !transfer.isERC721;
  });
  return transfersWithoutNFTs;
};
var handleImgError = function handleImgError(e) {
  e.target.src = 'https://res.cloudinary.com/dl4murstw/image/upload/v1659590465/default-logo_om9kbi.png';
};
var multiTransfersTableColumns = function multiTransfersTableColumns(blockexplorerURL) {
  var columns = [{
    title: 'From',
    dataIndex: 'fromAddress',
    key: 'from',
    render: function render(text) {
      return /*#__PURE__*/jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress(text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'toAddress',
    key: 'to',
    render: function render(text) {
      return /*#__PURE__*/jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress(text)
      });
    }
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  }, {
    title: 'Token Logo',
    dataIndex: 'innerTokenLogo',
    key: 'tokenLogo',
    render: function render(text) {
      return /*#__PURE__*/jsx("img", {
        alt: "token logo",
        onError: handleImgError,
        src: text,
        width: "40"
      });
    }
  }, {
    title: 'Token Name',
    dataIndex: 'innerTokenName',
    key: 'tokenName'
  }];
  return columns;
};
var erc20TransfersHelper = {
  filterForTransfers: filterForTransfers,
  pruneTransfers: pruneTransfers,
  multiTransfersTableColumns: multiTransfersTableColumns
};

var blockExplorerURLs = [{
  chainId: [1, 'eth-mainnet'],
  url: 'https://etherscan.io/'
}, {
  chainId: [5, 'eth-goerli'],
  url: 'https://goerli.etherscan.io/'
}, {
  chainId: [137, 'matic-mainnet'],
  url: 'https://polygonscan.com/'
}, {
  chainId: [80001, 'matic-mumbai'],
  url: 'https://mumbai.polygonscan.com/'
}, {
  chainId: [43114, 'avalanche-mainnet'],
  url: 'https://snowtrace.io/'
}, {
  chainId: [43113, 'avalanche-testnet'],
  url: 'https://testnet.snowtrace.io/'
}, {
  chainId: [56, 'bsc-mainnet'],
  url: 'https://www.bscscan.com/'
}, {
  chainId: [97, 'bsc-testnet'],
  url: 'https://testnet.bscscan.com/'
}, {
  chainId: [1284, 'moonbeam-mainnet'],
  url: 'https://moonscan.io/'
}, {
  chainId: [1287, 'moonbeam-moonbase-alpha'],
  url: 'https://moonbase-blockscout.testnet.moonbeam.network/'
}, {
  chainId: [1285, 'moonbeam-moonriver'],
  url: 'https://blockscout.moonriver.moonbeam.network/'
}, {
  chainId: [30, 'rsk-mainnet'],
  url: 'https://explorer.rsk.co/'
}, {
  chainId: [31, 'rsk-testnet'],
  url: 'https://explorer.testnet.rsk.co/'
}, {
  chainId: [42161, 'arbitrum-mainnet'],
  url: 'https://arbiscan.io/'
}, {
  chainId: [421611, 'arbitrum-testnet'],
  url: 'https://testnet.arbiscan.io/'
}, {
  chainId: [250, 'fantom-mainnet'],
  url: 'https://explorer.fantom.network/'
}, {
  chainId: [4002, 'fantom-testnet'],
  url: 'https://testnet.ftmscan.com/'
}, {
  chainId: [11297108109, 'palm-mainnet'],
  url: 'https://explorer.palm.io/'
}, {
  chainId: [11297108099, 'palm-testnet'],
  url: 'https://blockscout.com/poa/sokol'
}, {
  chainId: [8217, 'klaytn-mainnet'],
  url: 'https://scope.klaytn.com/'
}, {
  chainId: [128, 'heco-mainnet'],
  url: 'https://www.hecoinfo.com/'
}, {
  chainId: [256, 'heco-testnet'],
  url: 'https://scan-testnet.hecochain.com/home/index'
}, {
  chainId: [2020, 'axie-mainnet'],
  url: 'https://explorer.roninchain.com/'
}, {
  chainId: [9001, 'evmos-mainnet'],
  url: 'https://evm.evmos.org/'
}, {
  chainId: [9000, 'evmos-testnet'],
  url: 'https://evm.evmos.dev/'
}, {
  chainId: [592, 'astar-mainnet'],
  url: 'https://astar.subscan.io/'
}, {
  chainId: [336, 'astar-shiden'],
  url: 'https://shiden.subscan.io/'
}, {
  chainId: [4689, 'iotex-mainnet'],
  url: 'https://iotexscan.io/'
}, {
  chainId: [4690, 'iotex-testnet'],
  url: 'https://testnet.iotexscan.io/'
}, {
  chainId: [1666600000, 'harmony-mainnet'],
  url: 'https://explorer.harmony.one/'
}, {
  chainId: [1666700000, 'harmony-testnet'],
  url: 'https://explorer.pops.one/'
}, {
  chainId: [25, 'cronos-mainnet'],
  url: 'https://cronoscan.com/'
}];

var ERC20Transfers = function ERC20Transfers(_ref) {
  var address = _ref.address,
    chainId = _ref.chainId,
    _ref$ascending = _ref.ascending,
    ascending = _ref$ascending === void 0 ? false : _ref$ascending,
    _ref$noLogs = _ref.noLogs,
    noLogs = _ref$noLogs === void 0 ? false : _ref$noLogs,
    _ref$quoteCurrency = _ref.quoteCurrency,
    quoteCurrency = _ref$quoteCurrency === void 0 ? 'USD' : _ref$quoteCurrency;
  var blockExplorer = blockExplorerURLs.filter(function (item) {
    return parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId;
  });
  var blockexplorerURL = blockExplorer !== null && blockExplorer !== void 0 && blockExplorer.length ? blockExplorer[0].url : 'https://blockscan.com/';
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    txnData = _useState2[0],
    setTxnData = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  useEffect(function () {
    if (address) {
      fetchData();
    }
  }, [address, chainId, ascending, noLogs, quoteCurrency]);
  var handleImgError = function handleImgError(e) {
    e.target.src = img;
  };
  var fetchData = function fetchData() {
    setError(false);
    setIsLoading(true);
    var URL = "https://api.covalenthq.com/v1/".concat(chainId, "/address/").concat(address, "/transactions_v2/?quote-currency=").concat(quoteCurrency, "&format=JSON&block-signed-at-asc=").concat(ascending, "&no-logs=").concat(noLogs);
    getDataFromCovalentAPI(URL).then(function (response) {
      var transfersData = erc20TransfersHelper.filterForTransfers(response);
      var transfers = erc20TransfersHelper.pruneTransfers(transfersData, address);
      setIsLoading(false);
      setTxnData(transfers);
    }).catch(function (e) {
      return setError(true);
    });
  };
  var columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: function render(text) {
      return /*#__PURE__*/jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress(text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: function render(text, record) {
      if (!record.isMultipleTransfers) {
        return /*#__PURE__*/jsx("a", {
          href: blockexplorerURL + 'address/' + text,
          target: "_blank",
          rel: "noopener noreferrer",
          children: truncateEthAddress(text)
        });
      } else {
        //This is the content that we provide to the popover table.
        var multiTransfersContent = /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Table, {
            dataSource: record.multipleTransfers,
            columns: erc20TransfersHelper.multiTransfersTableColumns(blockexplorerURL)
          }), /*#__PURE__*/jsx(InfoCircleOutlined, {}), /*#__PURE__*/jsx("em", {
            children: " There are multiple transfer events in this single transaction."
          })]
        });
        return /*#__PURE__*/jsx(Popover, {
          placement: "rightBottom",
          content: multiTransfersContent,
          trigger: "focus",
          children: /*#__PURE__*/jsxs(Button, {
            children: [' ', /*#__PURE__*/jsxs("span", {
              children: [/*#__PURE__*/jsx(WarningOutlined, {
                style: {
                  fontSize: '1em'
                }
              }), " Multiple"]
            })]
          })
        });
      }
    }
  }, {
    title: 'Flow',
    dataIndex: 'transferFlow',
    key: 'transferFlow'
  }, {
    title: 'Token Address',
    dataIndex: 'tokenAddress',
    key: 'tokenAddress',
    render: function render(text) {
      return /*#__PURE__*/jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress(text)
      });
    }
  }, {
    title: 'Token Logo',
    dataIndex: 'tokenLogo',
    key: 'tokenLogo',
    render: function render(text) {
      return /*#__PURE__*/jsx("img", {
        alt: "token logo",
        onError: handleImgError,
        src: text,
        width: "40"
      });
    }
  }, {
    title: 'Token Name',
    dataIndex: 'tokenName',
    key: 'tokenName'
  }, {
    title: 'Token Symbol',
    dataIndex: 'tokenSymbol',
    key: 'tokenSymbol'
  }, {
    title: 'Amount',
    dataIndex: 'transferValue',
    key: 'transferValue'
  }, {
    title: 'Transaction',
    dataIndex: 'txnHash',
    key: 'txnHash',
    render: function render(txnHash) {
      return /*#__PURE__*/jsxs("a", {
        href: blockexplorerURL + 'tx/' + txnHash,
        target: "_blank",
        rel: "noopener noreferrer",
        children: [' ', "View Transaction"]
      });
    }
  }];
  if (error) {
    return /*#__PURE__*/jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsx(Table, {
      loading: true
    });
  } else if (!isLoading && txnData) {
    console.log('txnData', txnData);
    return /*#__PURE__*/jsx(Table, {
      dataSource: txnData,
      columns: columns,
      rowKey: "txnHash"
    });
  }
};

var TokenHolders = function TokenHolders(_ref) {
  var tokenAddress = _ref.tokenAddress,
    chainId = _ref.chainId,
    _ref$blockHeight = _ref.blockHeight,
    blockHeight = _ref$blockHeight === void 0 ? 'latest' : _ref$blockHeight,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 99999 : _ref$pageSize,
    _ref$quoteCurrency = _ref.quoteCurrency,
    quoteCurrency = _ref$quoteCurrency === void 0 ? 'USD' : _ref$quoteCurrency;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    getData = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  useEffect(function () {
    if (tokenAddress) {
      fetchData();
    }
  }, [tokenAddress, chainId, blockHeight, pageSize, quoteCurrency]);
  var handleImgError = function handleImgError(e) {
    e.target.src = img;
  };
  var fetchData = function fetchData() {
    setError(false);
    setIsLoading(true);
    var URL = "https://api.covalenthq.com/v1/".concat(chainId, "/tokens/").concat(tokenAddress, "/token_holders/?quote-currency=").concat(quoteCurrency, "&format=JSON&block-height=").concat(blockHeight, "&page-size=").concat(pageSize);
    getDataFromCovalentAPI(URL).then(function (response) {
      setIsLoading(false);
      getData(response.data.items);
    }).catch(function (e) {
      return setError(true);
    });
  };
  var summaryColumn = [{
    title: '',
    dataIndex: 'logo_url',
    key: 'logo_url',
    render: function render(text) {
      return /*#__PURE__*/jsx("img", {
        src: text,
        onError: handleImgError,
        style: {
          width: '40px',
          height: '40px'
        }
      });
    }
  }, {
    title: 'Name',
    dataIndex: 'contract_name',
    key: 'contract_name'
  }, {
    title: 'Symbol',
    dataIndex: 'contract_ticker_symbol',
    key: 'contract_ticker_symbol'
  }, {
    title: 'Token Address',
    dataIndex: 'contract_address',
    key: 'contract_address'
  }, {
    title: 'Total Supply',
    dataIndex: 'total_supply',
    key: 'total_supply'
  }, {
    title: 'Block Height',
    dataIndex: 'block_height',
    key: 'block_height'
  }];
  var columns = [{
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }, {
    title: 'Balance / Token ID',
    dataIndex: 'balance',
    key: 'balance',
    sorter: function sorter(a, b) {
      return a.balance - b.balance;
    },
    render: function render(_, item) {
      return Number.isInteger(item.balance / Math.pow(10, item.contract_decimals)) ? item.balance / Math.pow(10, item.contract_decimals) : (item.balance / Math.pow(10, item.contract_decimals)).toFixed(4);
    }
  }];
  if (error) {
    return /*#__PURE__*/jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsx(Table, {
      loading: true
    });
  } else if (!isLoading && data) {
    return /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(Table, {
        columns: summaryColumn,
        dataSource: data.slice(0, 1),
        pagination: false,
        rowKey: "contract_address"
      }), /*#__PURE__*/jsx(Table, {
        columns: columns,
        dataSource: data,
        rowKey: "address"
      })]
    });
  }
};

var transform = function transform(transactions) {
  var transformedTransactions = transactions.map(function (transaction) {
    var logEvents = transaction.log_events;
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
    };
  });
  return transformedTransactions;
};
var extractMethods = function extractMethods(logEvents) {
  var methods = [];
  logEvents.map(function (logEvent) {
    if (logEvent.decoded) {
      methods.push(logEvent.decoded.name);
    }
    return null;
  });
  return methods;
};
var transformLogEvents = function transformLogEvents(logEvents) {
  var newLogEvents = logEvents.map(function (item) {
    if (item.decoded) {
      var returnObject = {
        name: item.decoded.name,
        signature: item.decoded.signature,
        contractDecimals: item.sender_contract_decimals,
        contractName: item.sender_name,
        logo: item.sender_logo_url,
        ticker: item.sender_contract_ticker_symbol,
        contractAddress: item.sender_address
      };
      var params = item.decoded.params;
      if (params) {
        params.map(function (param) {
          return returnObject['param_' + param.name] = param.value;
        });
      }
      return returnObject;
    } else {
      return null;
    }
  });
  return newLogEvents;
};

var categorizeTransaction = function categorizeTransaction(txn, address) {
  var flow = txn.from.toLowerCase() !== address.toLowerCase() ? 'Receive' : 'Send';
  if (isERC20(txn)) {
    return _objectSpread2(_objectSpread2({}, txn), {}, {
      category: 'erc20',
      flow: flow
    });
  } else if (isEthTransfer(txn)) {
    return _objectSpread2(_objectSpread2({}, txn), {}, {
      category: 'ethTransfer',
      flow: flow
    });
  } else if (isSwap(txn)) {
    return _objectSpread2(_objectSpread2({}, txn), {}, {
      category: 'swap',
      flow: 'Exchange'
    });
  } else {
    return _objectSpread2(_objectSpread2({}, txn), {}, {
      category: 'uncategorized',
      flow: 'Transact'
    });
  }
};
var isERC20 = function isERC20(txn) {
  if (Number(txn.value) === 0 && txn.method.filter(function (item) {
    return item === 'Transfer';
  }).length === 1) {
    return true;
  } else {
    return false;
  }
};
var isEthTransfer = function isEthTransfer(txn) {
  if (Number(txn.value) > 0 && !txn.method.includes('Transfer')) {
    return true;
  } else {
    return false;
  }
};
var isSwap = function isSwap(txn) {
  if (txn.method.filter(function (item) {
    return item === 'Transfer';
  }).length > 0 && ['Swap', 'Swapped', 'TokenExchange'].some(function (item) {
    return txn.method.includes(item);
  })) {
    return true;
  } else {
    return false;
  }
};

var columns = function columns(blockexplorerURL) {
  return [{
    title: 'Type',
    dataIndex: 'flow',
    key: 'flow',
    width: '12%',
    render: function render(text, record) {
      var newDate = new Date(record.date);
      var timeString12Hr = newDate.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      });
      var day = newDate.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short'
      });
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("p", {
          style: {
            fontSize: '2em',
            margin: '0'
          },
          children: text
        }), /*#__PURE__*/jsxs("div", {
          style: {
            fontSize: '1.3em',
            margin: '0'
          },
          children: [day, ", ", timeString12Hr]
        })]
      });
    }
  }, {
    title: 'Methods',
    dataIndex: 'method',
    key: 'method',
    width: '8%',
    render: function render(_, record) {
      if (record.logEvents.length > 0) {
        return /*#__PURE__*/jsx(Fragment, {
          children: record.logEvents.map(function (logEvent, index) {
            if (logEvent) {
              var color = logEvent.name.length > 5 ? 'geekblue' : 'green';
              if (logEvent.name === 'Transfer') {
                color = 'volcano';
              }
              var content = /*#__PURE__*/jsx(Fragment, {
                children: /*#__PURE__*/jsx(Descriptions, {
                  size: 'small',
                  column: 1,
                  title: logEvent.name,
                  bordered: true,
                  children: Object.entries(logEvent).map(function (item) {
                    return /*#__PURE__*/jsx(Descriptions.Item, {
                      label: item[0],
                      children: item[1]
                    }, item[0]);
                  })
                })
              });
              return /*#__PURE__*/jsx(Popover, {
                content: content,
                placement: "rightBottom",
                trigger: "click",
                children: /*#__PURE__*/jsx(Tag, {
                  color: color,
                  style: {
                    cursor: 'pointer'
                  },
                  children: logEvent.name.toUpperCase()
                }, index)
              }, index);
            }
          })
        });
      }
    }
  }, {
    title: '',
    dataIndex: 'from',
    key: 'from',
    width: '3%',
    render: function render(text, record) {
      if (record.category === ('erc20' )) {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668495917/user_1_vd4ki1.png",
          width: "40"
        });
      } else {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668495918/scroll_bkmays.png",
          width: "40"
        });
      }
    }
  }, {
    title: 'Interacted With',
    dataIndex: 'to',
    key: 'to',
    width: '20%',
    render: function render(text, record) {
      var transfers = record.logEvents.filter(function (logEvent) {
        if (logEvent) {
          return logEvent.name === 'Transfer';
        }
      });
      if (record.flow === 'Receive') {
        return /*#__PURE__*/jsxs("div", {
          style: {
            fontSize: '1.3em'
          },
          children: [/*#__PURE__*/jsx("div", {
            children: "From"
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("a", {
              href: blockexplorerURL + 'address/' + record.from,
              target: "_blank",
              rel: "noopener noreferrer",
              children: truncateEthAddress(record.from)
            })
          })]
        });
      } else if (record.flow === 'Transact') {
        return /*#__PURE__*/jsxs("div", {
          style: {
            fontSize: '1.3em'
          },
          children: [/*#__PURE__*/jsx("div", {
            children: "To"
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("a", {
              href: blockexplorerURL + 'address/' + record.to,
              target: "_blank",
              rel: "noopener noreferrer",
              children: truncateEthAddress(record.to)
            })
          })]
        });
      } else if (record.flow === 'Send') {
        if (transfers[0]) {
          return /*#__PURE__*/jsxs("div", {
            style: {
              fontSize: '1.3em'
            },
            children: [/*#__PURE__*/jsx("div", {
              children: "To"
            }), /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("a", {
                href: blockexplorerURL + 'address/' + transfers[0].param_to,
                target: "_blank",
                rel: "noopener noreferrer",
                children: truncateEthAddress(String(transfers[0].param_to))
              })
            })]
          });
        } else if (record.category === 'ethTransfer') {
          return /*#__PURE__*/jsxs("div", {
            style: {
              fontSize: '1.3em'
            },
            children: [/*#__PURE__*/jsx("div", {
              children: "To"
            }), /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("a", {
                href: blockexplorerURL + 'address/' + record.to,
                target: "_blank",
                rel: "noopener noreferrer",
                children: truncateEthAddress(String(record.to))
              })
            })]
          });
        }
      } else if (record.flow === 'Exchange') {
        var _transfers$;
        if ((_transfers$ = transfers[0]) !== null && _transfers$ !== void 0 && _transfers$.logo && transfers[0].param_value && transfers[0].contractDecimals) {
          var _transfers$2;
          var symbol = transfers[0].param_from === record.from ? '-' : '+';
          return /*#__PURE__*/jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsx("img", {
              alt: "",
              src: (_transfers$2 = transfers[0]) === null || _transfers$2 === void 0 ? void 0 : _transfers$2.logo,
              height: "50"
            }), /*#__PURE__*/jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [symbol, (Number(transfers[0].param_value) / Math.pow(10, transfers[0].contractDecimals)).toFixed(2), /*#__PURE__*/jsx("div", {
                children: "USDC"
              })]
            })]
          });
        }
      }
    }
  }, {
    title: '',
    dataIndex: 'flow',
    key: 'flow',
    width: '5%',
    render: function render(text, record) {
      if (record.flow === 'Receive') {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/right-arrow_1_owfvzh.png",
          width: "60"
        });
      } else if (record.flow === 'Send') {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/left-arrow_kxwpcx.png",
          width: "60"
        });
      } else if (record.flow === 'Exchange') {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668492843/right-left_uom8y3.png",
          width: "60"
        });
      } else {
        return /*#__PURE__*/jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/left-arrow_kxwpcx.png",
          width: "60"
        });
      }
    }
  }, {
    title: 'Token',
    dataIndex: 'logEvents[0].name',
    key: 'logEvents',
    width: '15%',
    render: function render(text, record) {
      var transfers = record.logEvents.filter(function (logEvent) {
        if (logEvent) {
          return logEvent.name === 'Transfer';
        }
      });
      if (record.category === 'erc20') {
        var _record$logEvents$, _record$logEvents$2;
        if ((_record$logEvents$ = record.logEvents[0]) !== null && _record$logEvents$ !== void 0 && _record$logEvents$.logo && record.logEvents[0].param_value && record.logEvents[0].contractDecimals) {
          var symbol = record.flow === 'Receive' ? '+' : '-';
          return /*#__PURE__*/jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsx("img", {
              alt: "",
              src: record.logEvents[0].logo,
              height: "50"
            }), /*#__PURE__*/jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [symbol, (Number(record.logEvents[0].param_value) / Math.pow(10, record.logEvents[0].contractDecimals)).toFixed(2), /*#__PURE__*/jsx("div", {
                children: record.logEvents[0].ticker
              })]
            })]
          });
        } else if ((_record$logEvents$2 = record.logEvents[0]) !== null && _record$logEvents$2 !== void 0 && _record$logEvents$2.param_tokenId && record.logEvents[0].logo) {
          var _symbol = record.flow === 'Receive' ? '+' : '-';
          return /*#__PURE__*/jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsx("img", {
              alt: "",
              src: record.logEvents[0].logo,
              height: "50"
            }), /*#__PURE__*/jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [_symbol, record.logEvents[0].param_tokenId, /*#__PURE__*/jsx("div", {
                children: record.logEvents[0].ticker
              })]
            })]
          });
        }
      } else if (record.category === 'ethTransfer') {
        var _symbol2 = record.flow === 'Receive' ? '+' : '-';
        return /*#__PURE__*/jsxs("div", {
          style: {
            display: 'flex'
          },
          children: [/*#__PURE__*/jsx("img", {
            alt: "",
            src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668503933/0x0000000000000000000000000000000000000000_oinhk2.png",
            height: "50"
          }), /*#__PURE__*/jsxs("div", {
            style: {
              fontSize: '1.3em',
              marginLeft: '3px'
            },
            children: [_symbol2, (Number(record.value) / Math.pow(10, 18)).toFixed(5), /*#__PURE__*/jsx("div", {
              children: "ETH"
            })]
          })]
        });
      } else if (record.category === 'swap') {
        var _transfers$3;
        if ((_transfers$3 = transfers[1]) !== null && _transfers$3 !== void 0 && _transfers$3.logo && transfers[1].param_value && transfers[1].contractDecimals) {
          var _transfers$4;
          var _symbol3 = transfers[1].param_from !== record.from ? '+' : '-';
          return /*#__PURE__*/jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsx("img", {
              alt: "",
              src: (_transfers$4 = transfers[1]) === null || _transfers$4 === void 0 ? void 0 : _transfers$4.logo,
              height: "50"
            }), /*#__PURE__*/jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [_symbol3, (Number(transfers[1].param_value) / Math.pow(10, transfers[1].contractDecimals)).toFixed(2), /*#__PURE__*/jsx("div", {
                children: transfers[1].ticker
              })]
            })]
          });
        } else {
          return /*#__PURE__*/jsxs("a", {
            href: blockexplorerURL + 'tx/' + record.txnHash,
            target: "_blank",
            rel: "noopener noreferrer",
            children: [/*#__PURE__*/jsx("img", {
              src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668603364/link_ykhdal.png",
              height: "50"
            }), ' ', "Learn more"]
          });
        }
      } else {
        return /*#__PURE__*/jsxs("a", {
          href: blockexplorerURL + 'tx/' + record.txnHash,
          target: "_blank",
          rel: "noopener noreferrer",
          children: [/*#__PURE__*/jsx("img", {
            src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668603364/link_ykhdal.png",
            height: "50"
          }), ' ', "Learn more"]
        });
      }
    }
  }, {
    title: 'Gas Fee',
    dataIndex: 'gasSpent',
    key: 'gasSpent',
    width: '10%',
    render: function render(text, record) {
      var gasFee = record.gasSpent * record.gasPrice / Math.pow(10, 18);
      var gasFeeQuote = (gasFee * record.gasQuoteRate).toFixed(2);
      return /*#__PURE__*/jsxs("div", {
        style: {
          fontSize: '1.3em'
        },
        children: [/*#__PURE__*/jsxs("p", {
          children: [gasFee.toFixed(6), " ETH", ' ', /*#__PURE__*/jsx("img", {
            alt: "",
            src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668511869/gas-station_ydpfe5.png",
            height: "14"
          })]
        }), /*#__PURE__*/jsxs("p", {
          children: ["($", gasFeeQuote, ")"]
        })]
      });
    }
  }, {
    title: 'Transaction',
    dataIndex: 'txnHash',
    key: 'txnHash',
    width: '10%',
    render: function render(txnHash) {
      return /*#__PURE__*/jsxs("a", {
        style: {
          fontSize: '1.3em'
        },
        href: blockexplorerURL + 'tx/' + txnHash,
        target: "_blank",
        rel: "noopener noreferrer",
        children: [' ', "View Transaction"]
      });
    }
  }];
};

var Transactions = function Transactions(_ref) {
  var address = _ref.address,
    chainId = _ref.chainId,
    _ref$ascending = _ref.ascending,
    ascending = _ref$ascending === void 0 ? false : _ref$ascending,
    _ref$noLogs = _ref.noLogs,
    noLogs = _ref$noLogs === void 0 ? false : _ref$noLogs,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 99999 : _ref$pageSize,
    _ref$quoteCurrency = _ref.quoteCurrency,
    quoteCurrency = _ref$quoteCurrency === void 0 ? 'USD' : _ref$quoteCurrency;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    txns = _useState2[0],
    setTxns = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var blockExplorer = blockExplorerURLs.filter(function (item) {
    return parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId;
  });
  var blockexplorerURL = blockExplorer !== null && blockExplorer !== void 0 && blockExplorer.length ? blockExplorer[0].url : 'https://blockscan.com/';
  useEffect(function () {
    if (address) {
      fetchData();
    }
  }, [address, chainId, ascending, noLogs, pageSize, quoteCurrency]);
  var fetchData = function fetchData() {
    setError(false);
    setIsLoading(true);
    var transactionsEndpoint = "https://api.covalenthq.com/v1/".concat(chainId, "/address/").concat(address, "/transactions_v2/?quote-currency=").concat(quoteCurrency, "&format=JSON&block-signed-at-asc=").concat(ascending, "&no-logs=").concat(noLogs, "&page-size=").concat(pageSize);
    getDataFromCovalentAPI(transactionsEndpoint).then(function (response) {
      setIsLoading(false);
      var transformedTransactions = transform(response.data.items.filter(function (txn) {
        return txn.log_events.length < 20;
      })); //remove spam

      var categorizedTransactions = transformedTransactions.map(function (txn) {
        return categorizeTransaction(txn, address);
      });
      setTxns(categorizedTransactions);
    }).catch(function (e) {
      return setError(true);
    });
  };
  if (error) {
    return /*#__PURE__*/jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsx(Table, {
      loading: true
    });
  } else if (!isLoading && txns) {
    return /*#__PURE__*/jsx(Table, {
      dataSource: txns,
      columns: columns(blockexplorerURL),
      rowKey: "txnHash"
    });
  }
};

var ChainSelector = function ChainSelector(_ref) {
  var setChainName = _ref.setChainName;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    chains = _useState2[0],
    getChains = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  useEffect(function () {
    fetchData();
  }, []);
  var handleChange = function handleChange(value) {
    setChainName(value);
  };
  var fetchData = function fetchData() {
    setError(false);
    var URL = "https://api.covalenthq.com/v1/chains/";
    getDataFromCovalentAPI(URL).then(function (response) {
      getChains(response.data.items);
    }).catch(function (e) {
      return setError(true);
    });
  };
  var options = chains.map(function (chain) {
    return {
      label: chain.label,
      value: chain.name
    };
  });
  if (error) {
    return /*#__PURE__*/jsx("p", {
      children: " Unable to fetch chains"
    });
  } else if (chains) {
    return /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsx(Select, {
        defaultValue: "eth-mainnet",
        style: {
          width: 250
        },
        onChange: handleChange,
        options: options
      })
    });
  }
};

var Title = Typography.Title,
  Paragraph = Typography.Paragraph,
  Link = Typography.Link;
var Panel = Collapse.Panel;
var Opensea = function Opensea() {
  return /*#__PURE__*/jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 100 100",
    children: [/*#__PURE__*/jsx("path", {
      fill: "#2081E2",
      d: "M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z"
    }), /*#__PURE__*/jsx("path", {
      fill: "#fff",
      d: "M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z"
    }), /*#__PURE__*/jsx("path", {
      fill: "#fff",
      d: "M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z"
    })]
  });
};
var Rarible = function Rarible() {
  return /*#__PURE__*/jsxs("svg", {
    fill: "none",
    height: "24",
    viewBox: "0 0 50 50",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/jsx("path", {
      d: "m.0966797 10.4931c0-5.79516 4.7127903-10.4931 10.5263203-10.4931h26.9474c5.8135 0 10.5263 4.69794 10.5263 10.4931v26.8625c0 5.7952-4.7128 10.4931-10.5263 10.4931h-26.9474c-5.81353 0-10.5263203-4.6979-10.5263203-10.4931z",
      fill: "#feda03"
    }), /*#__PURE__*/jsx("path", {
      clipRule: "evenodd",
      d: "m36.1418 20.0308c0 2.2953-1.341 3.437-2.8481 3.8336 1.8038.5407 3.1092 2.0189 3.1092 4.3622v4.3022h-6.883v-4.0859c0-1.2498-.7358-1.7545-1.9937-1.7545h-8.1647v5.8404h-6.883v-17.2087h16.3531c4.106 0 7.3102.8892 7.3102 4.7107zm-16.7772.0972h9.305v.0008c.0139-.0005.0279-.0008.0419-.0008.6398 0 1.1585.5252 1.1585 1.1732 0 .6479-.5187 1.1731-1.1585 1.1731-.014 0-.028-.0002-.0419-.0007v.0007h-9.305z",
      fill: "#000",
      fillRule: "evenodd"
    })]
  });
};
function MarkeplacesLinks(_ref) {
  var marketplace = _ref.marketplace,
    contract = _ref.contract,
    id = _ref.id;
  if (marketplace === 0) return null;
  return /*#__PURE__*/jsxs("div", {
    style: {
      marginTop: 15
    },
    children: [marketplace.find(function (element) {
      return element == 'opensea';
    }) && /*#__PURE__*/jsx(Link, {
      style: {
        paddingLeft: 8
      },
      href: "https://opensea.io/assets/ethereum/".concat(contract, "/").concat(id),
      target: "_blank",
      children: /*#__PURE__*/jsx(Opensea, {})
    }), marketplace.find(function (element) {
      return element == 'rarible';
    }) && /*#__PURE__*/jsx(Link, {
      style: {
        paddingLeft: 8
      },
      href: "https://rarible.com/token/".concat(contract, ":").concat(id),
      target: "_blank",
      children: /*#__PURE__*/jsx(Rarible, {})
    })]
  });
}
function ImageSize(size, data) {
  switch (size) {
    case '256':
      return data.image_256;
    case '512':
      return data.image_512;
    case '1024':
      return data.image_1024;
    default:
      return data.image;
  }
}
function NFTMetadata(_ref2) {
  var chainId = _ref2.chainId,
    chainName = _ref2.chainName,
    contractAddress = _ref2.contractAddress,
    tokenId = _ref2.tokenId,
    size = _ref2.size,
    animated = _ref2.animated,
    audio = _ref2.audio,
    description = _ref2.description,
    attributes = _ref2.attributes,
    markets = _ref2.markets,
    blockExplorer = _ref2.blockExplorer;
  if (animated) audio = false;
  if (audio) animated = false;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    getData = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  useEffect(function () {
    if (contractAddress) {
      fetchData();
    }
  }, [contractAddress, tokenId]);
  useEffect(function () {
    console.log(data);
  }, [isLoading]);
  var fetchData = function fetchData() {
    setError(false);
    setIsLoading(true);
    var URL = "https://api.covalenthq.com/v1/".concat(chainId, "/tokens/").concat(contractAddress, "/nft_metadata/").concat(tokenId, "/?format=JSON");
    getDataFromCovalentAPI(URL).then(function (response) {
      setIsLoading(false);
      getData(response.data.items[0]);
    }).catch(function () {
      return setError(true);
    });
  };
  function external_url(url) {
    return url == null ? "https://opensea.io/assets/".concat(chainName, "/").concat(contractAddress, "/").concat(tokenId) : url;
  }
  if (error) {
    return /*#__PURE__*/jsx(Card, {
      style: {
        width: '100%'
      },
      children: /*#__PURE__*/jsx(Alert, {
        message: "Error",
        description: "Unable to fetch data",
        type: "error",
        showIcon: true
      })
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsx(Card, {
      loading: true
    });
  } else if (!isLoading && data.nft_data !== undefined) {
    return /*#__PURE__*/jsxs(Card, {
      title: /*#__PURE__*/jsx(Link, {
        href: external_url(data.nft_data[0].external_data.external_url),
        target: "_blank",
        children: /*#__PURE__*/jsx(Title, {
          level: 3,
          children: "".concat(data.contract_name, " - ").concat(data.nft_data[0].external_data.name)
        })
      }),
      extra: /*#__PURE__*/jsx(MarkeplacesLinks, {
        marketplace: markets,
        contract: contractAddress,
        id: tokenId
      }),
      style: {
        width: '100%'
      },
      cover: !animated ? /*#__PURE__*/jsx("img", {
        src: ImageSize(size, data.nft_data[0].external_data)
      }) : /*#__PURE__*/jsx("video", {
        src: data.nft_data[0].external_data.animation_url,
        autoPlay: true,
        loop: true,
        controls: true
      }),
      children: [/*#__PURE__*/jsx(Row, {
        justify: "center",
        children: /*#__PURE__*/jsx(Col, {
          children: audio && /*#__PURE__*/jsx("audio", {
            src: data.nft_data[0].external_data.animation_url,
            controls: true
          })
        })
      }), description && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Divider, {
          children: "Description"
        }), /*#__PURE__*/jsx(Paragraph, {
          children: data.nft_data[0].external_data.description
        }), /*#__PURE__*/jsx(Divider, {})]
      }), attributes && /*#__PURE__*/jsx(Collapse, {
        defaultActiveKey: ['1'],
        children: /*#__PURE__*/jsx(Panel, {
          header: "Attributes",
          children: /*#__PURE__*/jsx(Descriptions, {
            bordered: true,
            children: data.nft_data[0].external_data.attributes.map(function (attribute, index) {
              return /*#__PURE__*/jsx(Descriptions.Item, {
                label: attribute.trait_type,
                children: attribute.value
              }, "".concat(attribute.trait_type, "-").concat(index));
            })
          })
        }, "1")
      }), /*#__PURE__*/jsx(Divider, {
        plain: true
      }), /*#__PURE__*/jsxs(Link, {
        href: blockExplorer.replace('$contract', data.contract_address),
        target: "_blank",
        children: ["Contract - ", data.contract_address]
      })]
    });
  }
}
MarkeplacesLinks.propTypes = {
  marketplace: PropTypes.array,
  contract: PropTypes.string,
  id: PropTypes.string
};
NFTMetadata.propTypes = {
  chainId: PropTypes.string,
  chainName: PropTypes.string,
  contractAddress: PropTypes.string,
  tokenId: PropTypes.string,
  size: PropTypes.oneOf(['256', '512', '1024', 'default']),
  animated: PropTypes.bool,
  audio: PropTypes.bool,
  description: PropTypes.bool,
  attributes: PropTypes.bool,
  markets: PropTypes.array,
  blockExplorer: PropTypes.string
};
NFTMetadata.defaultProps = {
  chainId: 1,
  chainName: 'Ethereum',
  size: 'default',
  animated: false,
  audio: false,
  name: true,
  description: true,
  attributes: true,
  markets: ['opensea', 'rarible'],
  blockExplorer: 'https://etherscan.io/token/$contract'
};

export { ChainSelector, ERC20Transfers, NFTMetadata, TokenBalances, TokenHolders, Transactions };
