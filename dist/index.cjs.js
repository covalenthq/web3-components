'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var antd = require('antd');
var jsxRuntime = require('react/jsx-runtime');
var icons = require('@ant-design/icons');
var truncateEthAddress = require('truncate-eth-address');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var truncateEthAddress__default = /*#__PURE__*/_interopDefaultLegacy(truncateEthAddress);

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
  headers.set('Authorization', 'Basic ' + btoa(authString));
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
  var _useState = react.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    getData = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = react.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  react.useEffect(function () {
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
      return /*#__PURE__*/jsxRuntime.jsx("img", {
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
    return /*#__PURE__*/jsxRuntime.jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && data) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
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
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'toAddress',
    key: 'to',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
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
      return /*#__PURE__*/jsxRuntime.jsx("img", {
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
  var _useState = react.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    txnData = _useState2[0],
    setTxnData = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = react.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  react.useEffect(function () {
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
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: function render(text, record) {
      if (!record.isMultipleTransfers) {
        return /*#__PURE__*/jsxRuntime.jsx("a", {
          href: blockexplorerURL + 'address/' + text,
          target: "_blank",
          rel: "noopener noreferrer",
          children: truncateEthAddress__default["default"](text)
        });
      } else {
        //This is the content that we provide to the popover table.
        var multiTransfersContent = /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [/*#__PURE__*/jsxRuntime.jsx(antd.Table, {
            dataSource: record.multipleTransfers,
            columns: erc20TransfersHelper.multiTransfersTableColumns(blockexplorerURL)
          }), /*#__PURE__*/jsxRuntime.jsx(icons.InfoCircleOutlined, {}), /*#__PURE__*/jsxRuntime.jsx("em", {
            children: " There are multiple transfer events in this single transaction."
          })]
        });
        return /*#__PURE__*/jsxRuntime.jsx(antd.Popover, {
          placement: "rightBottom",
          content: multiTransfersContent,
          trigger: "focus",
          children: /*#__PURE__*/jsxRuntime.jsxs(antd.Button, {
            children: [' ', /*#__PURE__*/jsxRuntime.jsxs("span", {
              children: [/*#__PURE__*/jsxRuntime.jsx(icons.WarningOutlined, {
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
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'Token Logo',
    dataIndex: 'tokenLogo',
    key: 'tokenLogo',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("img", {
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
      return /*#__PURE__*/jsxRuntime.jsxs("a", {
        href: blockexplorerURL + 'tx/' + txnHash,
        target: "_blank",
        rel: "noopener noreferrer",
        children: [' ', "View Transaction"]
      });
    }
  }];
  if (error) {
    return /*#__PURE__*/jsxRuntime.jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && txnData) {
    console.log('txnData', txnData);
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
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
  var _useState = react.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    getData = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = react.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  react.useEffect(function () {
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
      return /*#__PURE__*/jsxRuntime.jsx("img", {
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
    return /*#__PURE__*/jsxRuntime.jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && data) {
    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(antd.Table, {
        columns: summaryColumn,
        dataSource: data.slice(0, 1),
        pagination: false,
        rowKey: "contract_address"
      }), /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
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
      return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx("p", {
          style: {
            fontSize: '2em',
            margin: '0'
          },
          children: text
        }), /*#__PURE__*/jsxRuntime.jsxs("div", {
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
        return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
          children: record.logEvents.map(function (logEvent, index) {
            if (logEvent) {
              var color = logEvent.name.length > 5 ? 'geekblue' : 'green';
              if (logEvent.name === 'Transfer') {
                color = 'volcano';
              }
              var content = /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
                children: /*#__PURE__*/jsxRuntime.jsx(antd.Descriptions, {
                  size: 'small',
                  column: 1,
                  title: logEvent.name,
                  bordered: true,
                  children: Object.entries(logEvent).map(function (item) {
                    return /*#__PURE__*/jsxRuntime.jsx(antd.Descriptions.Item, {
                      label: item[0],
                      children: item[1]
                    }, item[0]);
                  })
                })
              });
              return /*#__PURE__*/jsxRuntime.jsx(antd.Popover, {
                content: content,
                placement: "rightBottom",
                trigger: "click",
                children: /*#__PURE__*/jsxRuntime.jsx(antd.Tag, {
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
        return /*#__PURE__*/jsxRuntime.jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668495917/user_1_vd4ki1.png",
          width: "40"
        });
      } else {
        return /*#__PURE__*/jsxRuntime.jsx("img", {
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
        return /*#__PURE__*/jsxRuntime.jsxs("div", {
          style: {
            fontSize: '1.3em'
          },
          children: [/*#__PURE__*/jsxRuntime.jsx("div", {
            children: "From"
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("a", {
              href: blockexplorerURL + 'address/' + record.from,
              target: "_blank",
              rel: "noopener noreferrer",
              children: truncateEthAddress__default["default"](record.from)
            })
          })]
        });
      } else if (record.flow === 'Transact') {
        return /*#__PURE__*/jsxRuntime.jsxs("div", {
          style: {
            fontSize: '1.3em'
          },
          children: [/*#__PURE__*/jsxRuntime.jsx("div", {
            children: "To"
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("a", {
              href: blockexplorerURL + 'address/' + record.to,
              target: "_blank",
              rel: "noopener noreferrer",
              children: truncateEthAddress__default["default"](record.to)
            })
          })]
        });
      } else if (record.flow === 'Send') {
        if (transfers[0]) {
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              fontSize: '1.3em'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("div", {
              children: "To"
            }), /*#__PURE__*/jsxRuntime.jsx("div", {
              children: /*#__PURE__*/jsxRuntime.jsx("a", {
                href: blockexplorerURL + 'address/' + transfers[0].param_to,
                target: "_blank",
                rel: "noopener noreferrer",
                children: truncateEthAddress__default["default"](String(transfers[0].param_to))
              })
            })]
          });
        } else if (record.category === 'ethTransfer') {
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              fontSize: '1.3em'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("div", {
              children: "To"
            }), /*#__PURE__*/jsxRuntime.jsx("div", {
              children: /*#__PURE__*/jsxRuntime.jsx("a", {
                href: blockexplorerURL + 'address/' + record.to,
                target: "_blank",
                rel: "noopener noreferrer",
                children: truncateEthAddress__default["default"](String(record.to))
              })
            })]
          });
        }
      } else if (record.flow === 'Exchange') {
        var _transfers$;
        if ((_transfers$ = transfers[0]) !== null && _transfers$ !== void 0 && _transfers$.logo && transfers[0].param_value && transfers[0].contractDecimals) {
          var _transfers$2;
          var symbol = transfers[0].param_from === record.from ? '-' : '+';
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("img", {
              alt: "",
              src: (_transfers$2 = transfers[0]) === null || _transfers$2 === void 0 ? void 0 : _transfers$2.logo,
              height: "50"
            }), /*#__PURE__*/jsxRuntime.jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [symbol, (Number(transfers[0].param_value) / Math.pow(10, transfers[0].contractDecimals)).toFixed(2), /*#__PURE__*/jsxRuntime.jsx("div", {
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
        return /*#__PURE__*/jsxRuntime.jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/right-arrow_1_owfvzh.png",
          width: "60"
        });
      } else if (record.flow === 'Send') {
        return /*#__PURE__*/jsxRuntime.jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668599379/left-arrow_kxwpcx.png",
          width: "60"
        });
      } else if (record.flow === 'Exchange') {
        return /*#__PURE__*/jsxRuntime.jsx("img", {
          alt: "",
          src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668492843/right-left_uom8y3.png",
          width: "60"
        });
      } else {
        return /*#__PURE__*/jsxRuntime.jsx("img", {
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
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("img", {
              alt: "",
              src: record.logEvents[0].logo,
              height: "50"
            }), /*#__PURE__*/jsxRuntime.jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [symbol, (Number(record.logEvents[0].param_value) / Math.pow(10, record.logEvents[0].contractDecimals)).toFixed(2), /*#__PURE__*/jsxRuntime.jsx("div", {
                children: record.logEvents[0].ticker
              })]
            })]
          });
        } else if ((_record$logEvents$2 = record.logEvents[0]) !== null && _record$logEvents$2 !== void 0 && _record$logEvents$2.param_tokenId && record.logEvents[0].logo) {
          var _symbol = record.flow === 'Receive' ? '+' : '-';
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("img", {
              alt: "",
              src: record.logEvents[0].logo,
              height: "50"
            }), /*#__PURE__*/jsxRuntime.jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [_symbol, record.logEvents[0].param_tokenId, /*#__PURE__*/jsxRuntime.jsx("div", {
                children: record.logEvents[0].ticker
              })]
            })]
          });
        }
      } else if (record.category === 'ethTransfer') {
        var _symbol2 = record.flow === 'Receive' ? '+' : '-';
        return /*#__PURE__*/jsxRuntime.jsxs("div", {
          style: {
            display: 'flex'
          },
          children: [/*#__PURE__*/jsxRuntime.jsx("img", {
            alt: "",
            src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668503933/0x0000000000000000000000000000000000000000_oinhk2.png",
            height: "50"
          }), /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              fontSize: '1.3em',
              marginLeft: '3px'
            },
            children: [_symbol2, (Number(record.value) / Math.pow(10, 18)).toFixed(5), /*#__PURE__*/jsxRuntime.jsx("div", {
              children: "ETH"
            })]
          })]
        });
      } else if (record.category === 'swap') {
        var _transfers$3;
        if ((_transfers$3 = transfers[1]) !== null && _transfers$3 !== void 0 && _transfers$3.logo && transfers[1].param_value && transfers[1].contractDecimals) {
          var _transfers$4;
          var _symbol3 = transfers[1].param_from !== record.from ? '+' : '-';
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("img", {
              alt: "",
              src: (_transfers$4 = transfers[1]) === null || _transfers$4 === void 0 ? void 0 : _transfers$4.logo,
              height: "50"
            }), /*#__PURE__*/jsxRuntime.jsxs("div", {
              style: {
                fontSize: '1.3em',
                marginLeft: '3px'
              },
              children: [_symbol3, (Number(transfers[1].param_value) / Math.pow(10, transfers[1].contractDecimals)).toFixed(2), /*#__PURE__*/jsxRuntime.jsx("div", {
                children: transfers[1].ticker
              })]
            })]
          });
        } else {
          return /*#__PURE__*/jsxRuntime.jsxs("a", {
            href: blockexplorerURL + 'tx/' + record.txnHash,
            target: "_blank",
            rel: "noopener noreferrer",
            children: [/*#__PURE__*/jsxRuntime.jsx("img", {
              src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668603364/link_ykhdal.png",
              height: "50"
            }), ' ', "Learn more"]
          });
        }
      } else {
        return /*#__PURE__*/jsxRuntime.jsxs("a", {
          href: blockexplorerURL + 'tx/' + record.txnHash,
          target: "_blank",
          rel: "noopener noreferrer",
          children: [/*#__PURE__*/jsxRuntime.jsx("img", {
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
      return /*#__PURE__*/jsxRuntime.jsxs("div", {
        style: {
          fontSize: '1.3em'
        },
        children: [/*#__PURE__*/jsxRuntime.jsxs("p", {
          children: [gasFee.toFixed(6), " ETH", ' ', /*#__PURE__*/jsxRuntime.jsx("img", {
            alt: "",
            src: "https://res.cloudinary.com/dl4murstw/image/upload/v1668511869/gas-station_ydpfe5.png",
            height: "14"
          })]
        }), /*#__PURE__*/jsxRuntime.jsxs("p", {
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
      return /*#__PURE__*/jsxRuntime.jsxs("a", {
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
  var _useState = react.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    txns = _useState2[0],
    setTxns = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = react.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var blockExplorer = blockExplorerURLs.filter(function (item) {
    return parseInt(item.chainId[0]) === parseInt(chainId) || item.chainId[1] === chainId;
  });
  var blockexplorerURL = blockExplorer !== null && blockExplorer !== void 0 && blockExplorer.length ? blockExplorer[0].url : 'https://blockscan.com/';
  react.useEffect(function () {
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
    return /*#__PURE__*/jsxRuntime.jsx("p", {
      children: " Unable to fetch data"
    });
  } else if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && txns) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      dataSource: txns,
      columns: columns(blockexplorerURL),
      rowKey: "txnHash"
    });
  }
};

var ChainSelector = function ChainSelector(_ref) {
  var setChainName = _ref.setChainName;
  var _useState = react.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    chains = _useState2[0],
    getChains = _useState2[1];
  var _useState3 = react.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  react.useEffect(function () {
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
    return /*#__PURE__*/jsxRuntime.jsx("p", {
      children: " Unable to fetch chains"
    });
  } else if (chains) {
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx(antd.Select, {
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

exports.ChainSelector = ChainSelector;
exports.ERC20Transfers = ERC20Transfers;
exports.TokenBalances = TokenBalances;
exports.TokenHolders = TokenHolders;
exports.Transactions = Transactions;
