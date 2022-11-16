import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { transform } from '../utils/transform';
import { categorizeTransaction } from '../utils/categorize';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import { blockExplorerURLs } from '../utils/blockExplorerURLs';
import { columns } from '../utils/columns'



const Transactions = ( {chainId, address}) => {
    const [txns, setTxns] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)
    const apiKey = process.env.REACT_APP_COVALENT_API_KEY

    const blockexplorerURL = blockExplorerURLs.filter(item => parseInt(item.chainId) === parseInt(chainId))[0].url
    const transactionsEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/`;
    const auth = {
        username: apiKey,
        password: ''
    }

    const options = {
        url: transactionsEndpoint,
        method: "GET",
        auth: auth
    };

    useEffect(() => {
        axios(options)
            .then((res) => {

                const transformedTransactions = transform(res.data.data.items.filter(txn => txn.log_events.length < 20)) //remove spam

                const categorizedTransactions = transformedTransactions.map((txn) => {
                    return categorizeTransaction(txn, address);
                })

                setIsLoading(false)
                setTxns(categorizedTransactions)
                
            })
            .catch( (err) => console.log(err.message))
    }, [address])

    if (isLoading) {
        return (
            <Table loading={true} />
        )
    } else if (!isLoading && txns) {
        console.log("txnData",txns)
        return (
            <Table dataSource={txns} columns={columns(blockexplorerURL)} rowKey='txnHash'/>
        )
    } else {
        return null
    }
}

export default Transactions



