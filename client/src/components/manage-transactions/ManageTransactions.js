import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../api';
import { formatCategory } from '../../utils/transactionUtils';
import TransactionListFilters from '../common/TransactionListFilters';
import { HeaderRow, TransactionRow } from '../styledComponents';

class ManageTransactions extends Component {
  constructor(props) {
    super(props);
    const curDate = new Date();
    this.state = {
      data: [],
      filterStartDate: moment(
        `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`
      ),
      filterEndDate: moment(),
      filterCategory: '',
      focusedInput: null,
    };
  }

  componentDidMount = async () => {
    await api.getTransactions().then((transactions) => {
      this.setState({ data: transactions.data });
    });
  };

  fitsFilters = (transaction) => {
    let transactionDate = moment(transaction.date);
    if (
      transactionDate.isAfter(this.state.filterStartDate) &&
      transactionDate.isBefore(this.state.filterEndDate) &&
      (this.state.filterCategory === '' || transaction.category === this.state.filterCategory)
    ) {
      return true;
    }
    return false;
  };

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ filterStartDate: startDate, filterEndDate: endDate });
  };

  handleCategoryChange = (selected) => {
    this.setState({ filterCategory: selected.value });
  };

  handleFocusChange = (focusedInput) => this.setState({ focusedInput });

  handleDelete = async (e) => {
    let { data } = this.state;
    let transactionToDelete = e.target.id.split('_')[1];
    if (window.confirm('Are you sure you want to delete?')) {
      await api.deleteTransaction(transactionToDelete).then((res) => {
        data.splice(
          data.findIndex((transaction) => transaction._id === transactionToDelete),
          1
        );
        this.setState({ data });
      });
    }
  };

  handleBulkDelete = () => {
    let { data } = this.state;
    if (window.confirm('WARNING: You want to delete all transactions on the screen?')) {
      data.forEach(async (transaction) => {
        if (this.fitsFilters(transaction)) {
          await api.deleteTransaction(transaction._id);
        }
      });
      this.setState({ data: [], filterCategory: '' });
      window.location.reload();
    }
  };

  render() {
    console.log(this.state.filterStartDate);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4">
            <TransactionListFilters
              filterStartDate={this.state.filterStartDate}
              filterEndDate={this.state.filterEndDate}
              filterCategory={this.state.filterCategory}
              focusedInput={this.state.focusedInput}
              handleDateChange={this.handleDateChange}
              handleCategoryChange={this.handleCategoryChange}
              handleFocusChange={this.handleFocusChange}
            />
          </div>
        </div>
        <HeaderRow>
          <div className="col-md-2">Date</div>
          <div className="col-md-4">Merchant</div>
          <div className="col-md-1">Amount</div>
          <div className="col-md-1">Type</div>
          <div className="col-md-2">Category</div>
          <div className="col-md-2">Actions</div>
        </HeaderRow>
        {this.state.data.map((transaction) => {
          if (this.fitsFilters(transaction)) {
            return (
              <TransactionRow key={`transaction_${transaction._id}`}>
                <div className="col-md-2">{transaction.date.toString().substring(0, 10)}</div>
                <div className="col-md-4">{transaction.merchant}</div>
                <div className="col-md-1">
                  {`${(Math.round(transaction.amount * 100) / 100).toFixed(2)}`}
                </div>
                <div className="col-md-1">{transaction.isIncome ? 'Income' : 'Expense'}</div>
                <div className="col-md-2">{formatCategory(transaction.category)}</div>
                <div className="col-md-2">
                  <Link to={`manage/update/${transaction._id}`}>
                    <button className="btn btn-warning mr-4">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                    id={`delete_${transaction._id}`}
                  >
                    Delete
                  </button>
                </div>
              </TransactionRow>
            );
          }
          return null;
        })}
        {this.state.data.length > 0 ? (
          <div className="row">
            <div className="col-md-12 mt-3 text-center">
              <button className="btn btn-danger btn-lg" onClick={this.handleBulkDelete}>
                Delete All in View
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ManageTransactions;
