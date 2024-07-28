import './App.css';
import { Component } from 'react';

import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction';
import {v4 as uuidv4} from 'uuid'
import { Route, Routes } from 'react-router-dom';

const initialTransactionList = [
  {
      id: uuidv4(),
      date: '02-17-2020',
      types: 'Credit',
      amount: 5000,
      description: 'Credited to Office Account'
  },

  {
      id: uuidv4(),
      date: '02-18-2020',
      types: 'Debit',
      amount: 500,
      description: 'Snacks Party'

  },

  {
      id: uuidv4(),
      date: '02-18-2020',
      types: 'Debit',
      amount: 285,
      description: 'Printing sheets for office documents'
  },

  {
      id: uuidv4(),
      date: '02-20-2020',
      types: 'Debit',
      amount: 3000,
      description: 'Misc Expenses'
  },


]

class App extends Component {
  state = {
    transactions: [],
    remainingBalance: 0
  };


  componentDidMount() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || initialTransactionList;
    const remainingBalance = transactions.reduce((acc, transaction) => {
      return transaction.types === 'Credit' ? acc + parseFloat(transaction.amount) : acc - parseFloat(transaction.amount);
    }, 0);

    
    if (!localStorage.getItem('transactions')) {
      localStorage.setItem('transactions', JSON.stringify(initialTransactionList));
    }

    this.setState({ transactions, remainingBalance });
  }

  addTransaction = (transaction) => {
    this.setState(prevState => {
      const newTransactions = [...prevState.transactions, transaction];
      const newBalance = transaction.types === 'Credit'
        ? prevState.remainingBalance + parseFloat(transaction.amount)
        : prevState.remainingBalance - parseFloat(transaction.amount);
      
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      
      return {
        transactions: newTransactions,
        remainingBalance: newBalance
      };
    });
  };



  render() {
    const {transactions, remainingBalance} = this.state
    return (
      <>
        <Routes>
          <Route exact path="/" element={<TransactionList transactions={transactions} remainingBalance={remainingBalance}/>} />
          <Route exact path="/transaction" element={<AddTransaction addTransaction={this.addTransaction} />} />
        </Routes>
        
      </>
      
    )
  }
}

export default App;
