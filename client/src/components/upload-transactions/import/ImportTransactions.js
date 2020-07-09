import React, { Component } from 'react';
import XLSX from 'xlsx';
import api from '../../../api';
import TransactionData from './ImportTransactionData';
import ImportTransactionsFile from './ImportTransactionsFile';
import TransactionHeaders from './ImportTransactionHeaders';
import ImportTransactionsInstructions from './ImportTransactionsInstructions';

class ImportTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dates: [],
      merchants: [],
      amounts: [],
      isIncomes: [],
      categories: [],
      includes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleCheckInclude = this.handleCheckInclude.bind(this);
    this.handleCheckIsIncome = this.handleCheckIsIncome.bind(this);
  }

  handleSubmit = async () => {
    var { dates, merchants, amounts, categories, includes, isIncomes } = this.state;
    var missingCategory = false;
    categories.forEach((transactionCategory, i) => {
      if (transactionCategory === '' && includes[i] === true) {
        missingCategory = true;
      }
    });
    if (missingCategory) {
      alert('Must pick a category for each transaction');
    } else {
      this.setState({ loading: true });
      for (let i = 0; i < this.state.dates.length; i++) {
        if (includes[i]) {
          let transaction = {
            date: dates[i],
            merchant: merchants[i],
            amount: amounts[i],
            category: categories[i],
            isIncome: isIncomes[i],
          };
          await api.addNewTransaction(transaction).then((res) => {});
        }
      }
      this.setState({
        loading: false,
        dates: [],
        merchants: [],
        amounts: [],
        categories: [],
        isIncomes: [],
      });
    }
  };

  readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(new Uint8Array(reader.result));
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  };

  handleSelectCategory = (e, index) => {
    let { categories } = this.state;
    categories[index] = e.value;
    this.setState({ categories });
  };

  handleCheckInclude = (e) => {
    let { includes } = this.state;
    let index = e.target.id.split('_')[1];
    includes[index] = e.target.checked;
    this.setState({ includes });
  };

  handleCheckIsIncome = (e) => {
    let { isIncomes } = this.state;
    let index = e.target.id.split('_')[1];
    isIncomes[index] = e.target.checked;
    this.setState({ isIncomes });
  };

  handleAssignCategories = () => {
    let { categories } = this.state;
    for (let i = 0; i < categories.length; i++) {
      categories[i] = 'rent_mortgage';
    }
    this.setState({ categories });
  };

  readUploadedFiles = (files) => {
    var dates = [];
    var merchants = [];
    var amounts = [];
    var isIncomes = [];
    var categories = [];
    var includes = [];

    files.forEach(async (file) => {
      var data = await this.readFileAsync(file);
      var workbook = XLSX.read(data, { type: 'array' });
      var sheet = workbook.Sheets[workbook.SheetNames[0]];
      var range = XLSX.utils.decode_range(sheet['!ref']);

      for (let R = range.s.r; R <= range.e.r; ++R) {
        let dateCell = sheet[XLSX.utils.encode_cell({ c: 0, r: R })];
        let merchantCell = sheet[XLSX.utils.encode_cell({ c: 1, r: R })];
        let amountCell = sheet[XLSX.utils.encode_cell({ c: 2, r: R })];

        if (!dateCell || !merchantCell || !amountCell) continue;

        dates.push(dateCell.w);
        merchants.push(merchantCell.v);
        amounts.push(amountCell.v);
        isIncomes.push(false);
        categories.push('');
        includes.push(true);
      }
      this.setState({ dates, merchants, amounts, isIncomes, categories, includes });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <ImportTransactionsInstructions />
          <ImportTransactionsFile readUploadedFiles={this.readUploadedFiles} />
        </div>

        {this.state.merchants.length > 0 ? <TransactionHeaders type="include" /> : null}
        {this.state.loading
          ? 'Writing transactions...'
          : this.state.merchants.map((merchant, index) => {
              return (
                <TransactionData
                  key={`transactionData_${index}`}
                  index={index}
                  date={this.state.dates[index]}
                  merchant={merchant}
                  amount={this.state.amounts[index]}
                  isIncome={this.state.isIncomes[index]}
                  category={this.state.categories[index]}
                  include={this.state.includes[index]}
                  handleCheckIsIncome={this.handleCheckIsIncome}
                  handleCheckInclude={this.handleCheckInclude}
                  handleSelectCategory={this.handleSelectCategory}
                />
              );
            })}
        {this.state.merchants.length > 0 ? (
          <div className="row">
            <div className="col-md-12 mt-3 mb-3 text-center">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ImportTransactions;
