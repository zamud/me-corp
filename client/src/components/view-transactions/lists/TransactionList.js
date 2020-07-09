import React from 'react';
import moment from 'moment';
import { HeaderRow, TransactionRow } from '../../styledComponents';
import TransactionListFilters from '../../common/TransactionListFilters';
import { formatCategory } from '../../../utils/transactionUtils';

const TransactionList = ({
  data,
  filterStartDate,
  filterEndDate,
  filterCategory,
  focusedInput,
  handleDateChange,
  handleCategoryChange,
  handleFocusChange,
}) => {
  const filterProps = {
    filterStartDate,
    filterEndDate,
    filterCategory,
    focusedInput,
    handleDateChange,
    handleCategoryChange,
    handleFocusChange,
  };
  return (
    <>
      <TransactionListFilters {...filterProps} />
      <HeaderRow>
        <div className="col-md-2">Date</div>
        <div className="col-md-4">Merchant</div>
        <div className="col-md-2">Amount</div>
        <div className="col-md-2">Type</div>
        <div className="col-md-2">Category</div>
      </HeaderRow>
      {data.map((transaction, index) => {
        let transactionDate = moment(transaction.date);
        if (
          transactionDate.isAfter(filterStartDate) &&
          transactionDate.isBefore(filterEndDate) &&
          (filterCategory === '' || transaction.category === filterCategory)
        ) {
          return (
            <TransactionRow key={`transaction_${transaction._id}`}>
              <div className="col-md-2">{transaction.date.toString().substring(0, 10)}</div>
              <div className="col-md-4">{transaction.merchant}</div>
              <div className="col-md-2">
                {`${(Math.round(transaction.amount * 100) / 100).toFixed(2)}`}
              </div>
              <div className="col-md-2">{transaction.isIncome ? 'Income' : 'Expense'}</div>
              <div className="col-md-2">{formatCategory(transaction.category)}</div>
            </TransactionRow>
          );
        }
        return null;
      })}
    </>
  );
};

export default TransactionList;
