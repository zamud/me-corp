import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTransactionHeaders from './AddTransactionHeaders';
import AddTransactionData from './AddTransactionData';
import api from '../../../api';

class AddTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      dates: [],
      merchants: [],
      amounts: [],
      isIncomes: [],
      categories: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateDate = this.handleUpdateDate.bind(this);
    this.handleUpdateMerchant = this.handleUpdateMerchant.bind(this);
    this.handleUpdateAmount = this.handleUpdateAmount.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleCheckIsIncome = this.handleCheckIsIncome.bind(this);
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.handleRemoveTransaction = this.handleRemoveTransaction.bind(this);
  }

  handleUpdateDate = (e) => {
    let { dates } = this.state;
    let index = e.target.id.split('_')[1];
    dates[index] = e.target.value;
    this.setState({ dates, hasError: false });
  };

  handleUpdateMerchant = (e) => {
    let { merchants } = this.state;
    let index = e.target.id.split('_')[1];
    merchants[index] = e.target.value;
    this.setState({ merchants, hasError: false });
  };

  handleUpdateAmount = (values, index) => {
    let { value } = values;
    let { amounts } = this.state;
    amounts[index] = value;
    this.setState({ amounts, hasError: false });
  };

  handleSelectCategory = (selected, index) => {
    let { categories } = this.state;
    categories[index] = selected.value;
    this.setState({ categories, hasError: false });
  };

  handleCheckIsIncome = (e) => {
    let { isIncomes, categories } = this.state;
    let index = e.target.id.split('_')[1];
    isIncomes[index] = e.target.checked;
    categories[index] = '';
    this.setState({ isIncomes, categories, hasError: false });
  };

  handleAddTransaction = () => {
    let { dates, merchants, amounts, isIncomes, categories } = this.state;
    const curDate = Date.now();
    dates.push(curDate.toString().substring(0, 10));
    merchants.push('');
    amounts.push(0);
    isIncomes.push(false);
    categories.push('');
    this.setState({ dates, merchants, amounts, isIncomes, categories, hasError: false });
  };

  handleRemoveTransaction = (e) => {
    let { dates, merchants, amounts, isIncomes, categories } = this.state;
    let index = e.target.id.split('_')[1];
    dates.splice(index, 1);
    merchants.splice(index, 1);
    amounts.splice(index, 1);
    isIncomes.splice(index, 1);
    categories.splice(index, 1);
    this.setState({ dates, merchants, amounts, isIncomes, categories, hasError: false });
  };

  handleSubmit = async () => {
    var { dates, merchants, amounts, categories, isIncomes } = this.state;
    var errDates = [],
      errMerchants = [],
      errAmounts = [],
      errCategories = [],
      errIsIncomes = [];
    var missingCategory = false;
    categories.forEach((transactionCategory, i) => {
      if (transactionCategory === '') {
        missingCategory = true;
      }
    });
    if (missingCategory) {
      alert('Must pick a category for each transaction');
    } else {
      for (let i = 0; i < this.state.dates.length; i++) {
        let transaction = {
          date: dates[i],
          merchant: merchants[i],
          amount: amounts[i],
          category: categories[i],
          isIncome: isIncomes[i],
        };
        await api.addNewTransaction(transaction).then((res) => {
          if (res.data.errors) {
            errDates.push(dates[i]);
            errMerchants.push(merchants[i]);
            errAmounts.push(amounts[i]);
            errCategories.push(categories[i]);
            errIsIncomes.push(isIncomes[i]);
          }
        });
      }
      this.setState(
        {
          loading: false,
          dates: errDates,
          merchants: errMerchants,
          amounts: errAmounts,
          categories: errCategories,
          isIncomes: errIsIncomes,
        },
        () => {
          if (this.state.dates.length > 0) {
            this.setState({ hasError: true });
          }
        }
      );
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-2">
            <button className="btn btn-success" onClick={this.handleAddTransaction}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="col-md-2 offset-md-8 text-right">
            <button className="btn btn-primary font-weight-bold" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <AddTransactionHeaders />
        {this.state.dates.map((date, index) => {
          return (
            <AddTransactionData
              key={`transactionData_${index}`}
              index={index}
              date={date}
              merchant={this.state.merchants[index]}
              amount={this.state.amounts[index]}
              isIncome={this.state.isIncomes[index]}
              category={this.state.categories[index]}
              handleUpdateDate={this.handleUpdateDate}
              handleUpdateMerchant={this.handleUpdateMerchant}
              handleUpdateAmount={this.handleUpdateAmount}
              handleSelectCategory={this.handleSelectCategory}
              handleCheckIsIncome={this.handleCheckIsIncome}
              handleRemoveTransaction={this.handleRemoveTransaction}
            />
          );
        })}
        {this.state.hasError ? (
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-warning text-center" role="alert">
                The above transaction(s) failed validation. Please ensure all information is
                provided.
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddTransactions;
