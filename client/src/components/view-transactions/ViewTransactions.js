import React, { Component } from 'react';
import moment from 'moment';
import api from '../../api';
import { dateUtils } from '../../utils/dateUtils';
import {
  expenseCategories,
  incomeCategories,
  formatCategory,
  groups,
} from '../../utils/transactionUtils';
import TransactionList from './lists/TransactionList';
import TransactionTable from './tables/TransactionTable';
import TransactionBarGraph from './graphs/TransactionBarGraph';

const parseSymbol = (symbolString) => {
  let regexp = /\(([^)]+)\)/;
  return regexp.exec(symbolString.toString())[1];
};

const initializeCategoryData = () => {
  let data = [];
  let allOptions = expenseCategories.concat(incomeCategories);
  allOptions.forEach((option) => {
    data.push({
      category: option.value,
      displayName: formatCategory(option.value),
      group: parseSymbol(option.group),
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    });
  });
  return data;
};

const initializeGroupData = () => {
  let data = [];
  let allGroups = Object.values(groups);
  allGroups.forEach((group) => {
    data.push({
      group: parseSymbol(group),
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    });
  });
  return data;
};

const matchesItem = (transaction, item) => {
  let allCategories = expenseCategories.concat(incomeCategories);

  if (item.hasOwnProperty('category')) {
    if (transaction.category === item.category) return true;
  } else {
    let thisCategoryObj = allCategories.filter((category) => {
      return category.value === transaction.category;
    })[0];
    if (parseSymbol(thisCategoryObj.group) === item.group) return true;
  }
  return false;
};

const buildData = (initialData, data) => {
  let builtData = initialData;
  builtData.forEach((item, index, dataArr) => {
    data.forEach((transaction) => {
      if (matchesItem(transaction, item)) {
        let transactionDate = moment(transaction.date);
        if (
          transactionDate.isAfter(dateUtils.startJan) &&
          transactionDate.isBefore(dateUtils.endJan)
        ) {
          item.jan += transaction.amount;
          item.jan = parseFloat((Math.round(item.jan * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startFeb) &&
          transactionDate.isBefore(dateUtils.endFeb)
        ) {
          item.feb += transaction.amount;
          item.feb = parseFloat((Math.round(item.feb * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startMar) &&
          transactionDate.isBefore(dateUtils.endMar)
        ) {
          item.mar += transaction.amount;
          item.mar = parseFloat((Math.round(item.mar * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startApr) &&
          transactionDate.isBefore(dateUtils.endApr)
        ) {
          item.apr += transaction.amount;
          item.apr = parseFloat((Math.round(item.apr * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startMay) &&
          transactionDate.isBefore(dateUtils.endMay)
        ) {
          item.may += transaction.amount;
          item.may = parseFloat((Math.round(item.may * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startJun) &&
          transactionDate.isBefore(dateUtils.endJun)
        ) {
          item.jun += transaction.amount;
          item.jun = parseFloat((Math.round(item.jun * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startJul) &&
          transactionDate.isBefore(dateUtils.endJul)
        ) {
          item.jul += transaction.amount;
          item.jul = parseFloat((Math.round(item.jul * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startAug) &&
          transactionDate.isBefore(dateUtils.endAug)
        ) {
          item.aug += transaction.amount;
          item.aug = parseFloat((Math.round(item.aug * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startSep) &&
          transactionDate.isBefore(dateUtils.endSep)
        ) {
          item.sep += transaction.amount;
          item.sep = parseFloat((Math.round(item.sep * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startOct) &&
          transactionDate.isBefore(dateUtils.endOct)
        ) {
          item.oct += transaction.amount;
          item.oct = parseFloat((Math.round(item.oct * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startNov) &&
          transactionDate.isBefore(dateUtils.endNov)
        ) {
          item.nov += transaction.amount;
          item.nov = parseFloat((Math.round(item.nov * 100) / 100).toFixed(2));
        }
        if (
          transactionDate.isAfter(dateUtils.startDec) &&
          transactionDate.isBefore(dateUtils.endDec)
        ) {
          item.dec += transaction.amount;
          item.dec = parseFloat((Math.round(item.dec * 100) / 100).toFixed(2));
        }
      }
    });
    dataArr[index] = item;
  });
  return builtData;
};

const buildNetMonth = (data, month) => {
  let netIncome = data.find((groupData) => groupData.group.includes('Income'))[month];
  let netExpense = 0;

  let expenseData = data.filter((groupData) => !groupData.group.includes('Income'));
  expenseData.forEach((group) => {
    netExpense += group[month];
  });

  return netIncome - netExpense;
};

const buildNetData = (data) => {
  let netData = [];
  netData.push({
    row: 'Net Income',
    jan: buildNetMonth(data, 'jan'),
    feb: buildNetMonth(data, 'feb'),
    mar: buildNetMonth(data, 'mar'),
    apr: buildNetMonth(data, 'apr'),
    may: buildNetMonth(data, 'may'),
    jun: buildNetMonth(data, 'jun'),
    jul: buildNetMonth(data, 'jul'),
    aug: buildNetMonth(data, 'aug'),
    sep: buildNetMonth(data, 'sep'),
    oct: buildNetMonth(data, 'oct'),
    nov: buildNetMonth(data, 'nov'),
    dec: buildNetMonth(data, 'dec'),
  });
  return netData;
};

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    const curDate = new Date();
    this.state = {
      loading: false,
      displaying: '',
      rawData: [],
      categoryData: [],
      groupData: [],
      netData: [],
      filterStartDate: moment(
        `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`
      ),
      filterEndDate: moment(),
      filterCategory: '',
      focusedInput: null,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    await api.getTransactions().then((transactions) => {
      let rawData = transactions.data;
      let categoryData = buildData(initializeCategoryData(), rawData);
      let groupData = buildData(initializeGroupData(), rawData);
      let netData = buildNetData(groupData);

      this.setState({ rawData, categoryData, groupData, netData, loading: false });
    });
  };

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({ filterStartDate: startDate, filterEndDate: endDate });
  };

  handleCategoryChange = (selected) => {
    this.setState({ filterCategory: selected.value });
  };

  handleFocusChange = (focusedInput) => this.setState({ focusedInput });

  handleSelectDisplaying = (e) => {
    e.preventDefault();
    this.setState({ displaying: e.target.id });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-12"></div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <h5>Data Format:</h5>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a className="nav-link" href="#" id="list" onClick={this.handleSelectDisplaying}>
                  List
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link" href="#" id="table" onClick={this.handleSelectDisplaying}>
                  Table
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link" href="#" id="bar" onClick={this.handleSelectDisplaying}>
                  Bar Graph
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            {this.state.displaying === 'list' ? (
              <TransactionList
                data={this.state.rawData}
                filterStartDate={this.state.filterStartDate}
                filterEndDate={this.state.filterEndDate}
                filterCategory={this.state.filterCategory}
                focusedInput={this.state.focusedInput}
                handleDateChange={this.handleDateChange}
                handleCategoryChange={this.handleCategoryChange}
                handleFocusChange={this.handleFocusChange}
              />
            ) : null}
            {this.state.displaying === 'table' ? (
              <TransactionTable
                categoryData={this.state.categoryData}
                groupData={this.state.groupData}
                netData={this.state.netData}
              />
            ) : null}
            {this.state.displaying === 'bar' ? (
              <TransactionBarGraph groupData={this.state.groupData} />
            ) : null}
            {this.state.displaying === '' ? (
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="alert alert-secondary" role="alert">
                    Choose a format to view data
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTransactions;
