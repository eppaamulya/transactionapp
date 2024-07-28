import './index.css'
import { Component } from 'react'

import withRouter from '../../withRouter';

class TransactionList extends Component {

    handleNewTransaction = () => {
        const {navigate} = this.props
        navigate('/transaction');
    };

    render() {
        const {transactions} = this.props
        let runningBalance = 0
        return (
            <div className='transaction-list-page'>
                <h1 className="transaction-header">Transaction History</h1>
                <div className='transaction-div'>
                    <div className="history-transactions"> 
                        <div className="transactions-table-container">
                            <ul className="transactions-table">
                            <li className="table-header">
                                <p className="table-header-cell">Date</p>
                                <p className="table-header-cell">Title</p>
                                <p className="table-header-cell">Type</p>
                                <p className="table-header-cell">Amount</p>
                                <p className="table-header-cell">Remaining Balance</p>
                            </li>
                            {transactions.map((transaction, index) => {
                                    runningBalance = transaction.types === 'Credit' ? runningBalance + parseFloat(transaction.amount) : runningBalance - parseFloat(transaction.amount);
                                    return  (
                                    <li key={index} className="table-row">
                                        <p className="table-cell">{transaction.date}</p>
                                        <p className="table-cell">{transaction.description}</p>
                                        <p className="table-cell">{transaction.types}</p>
                                        <p className="table-cell">{transaction.amount}</p>
                                        <p className="table-cell-1">{runningBalance}</p>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>   
                    </div>
                    <button onClick={this.handleNewTransaction} className='button'><span>&#43; </span>
                    New Transaction</button>
                </div>
                
            </div>
        )
    }
}

export default withRouter(TransactionList)