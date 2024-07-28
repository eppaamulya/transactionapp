import './index.css'
import { Component } from 'react'


import withRouter from '../../withRouter';



class AddTransaction extends Component {
    
    state = {date: '', types: 'Debit', amount: 0, description: '', errors: {
        amount: '',
        description: ''
    }}
    
    validateFields = () => {
        const { amount, description } = this.state;
        const errors = {};
        if (!amount) errors.amount = 'Amount is required*';
        if (!description) errors.description = 'Description is required*';
        return errors;
    };

    onChangeDate = (event) => {
        this.setState({date: event.target.value})
    }

    onChangeType = (event) => {
        this.setState({types: event.target.value})
    }

    onChangeAmount = (event) => {
        this.setState({amount: parseFloat(event.target.value)})
    }

    onChangeDescription = (event) => {
        this.setState({description: event.target.value})
    }

    

    handleInputForm = (event) => {
        event.preventDefault()
    }

    handleSave = (event) => {
        const {addTransaction, navigate} = this.props
        event.preventDefault()
        const errors = this.validateFields();
        if (Object.keys(errors).length === 0) {
            addTransaction(this.state);
            navigate('/');
        } else {
            this.setState({ errors });
        }
    }

    handleCancel = (event) => {
        event.preventDefault()
        this.setState({
            date: '',
            types: 'Debit',
            amount: 0,
            description: '',
            errors: {}
        });
    }


    render() {
        const {types, amount, description, errors} = this.state

        return (
        <div className='new-transaction-page'>
            <h1 className='transaction-header-1'>New Transaction</h1>
            <div className='divide-section'>
                <div>
                    <img src='https://media.istockphoto.com/id/1431876180/vector/payment-money-sending-and-receiving-illustration-people-using-mobile-bank-for-remittance-of.jpg?s=612x612&w=0&k=20&c=JIeunuZjiyDRRRhX6bpRcA1cn5ctP0XuNoN5sqY5rVI=' alt="Transaction-Image" className='image' />
                </div>
                <div>
                    <form onSubmit={this.handleInputForm} className='transaction-form'>
                        <label htmlFor='dateId' className='labels'>Date</label>
                        <input type='date' id="dateId" onChange={this.onChangeDate} className='inputs' />

                        <label htmlFor='types' className='labels'>Transaction Type</label>
                        <select id="types" value={types} onChange={this.onChangeType} className='inputs'>
                            <option value="Debit">Debit</option>
                            <option value="Credit">Credit</option>
                        </select>

                        <label htmlFor='amountId' className='labels'>Amount*</label>
                        <input type='number' id="amountId" value={amount} onChange={this.onChangeAmount} className='inputs'/>
                        {errors.amount && <p className="error">{errors.amount}</p>}

                        <label htmlFor='descriptionId' className='labels'>Description*</label>
                        <textarea cols={45} rows={4} id="descriptionId" value={description} onChange={this.onChangeDescription} className='inputs'></textarea>
                        {errors.description && <p className="error">{errors.description}</p>}

                        <div className='btn-container'>
                            <button type='button' onClick={this.handleSave} className='button-save'>Save</button>
                            <button type='button' onClick={this.handleCancel} className='button-cancel'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(AddTransaction)