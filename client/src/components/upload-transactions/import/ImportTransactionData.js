import React from 'react';
import Dropdown from 'react-dropdown';
import { TransactionRow, DisabledTransactionRow } from '../../styledComponents';
import { expenseOptions, incomeOptions } from '../../../utils/transactionUtils';

const ImportTransactionData = ({
  index,
  date,
  merchant,
  amount,
  isIncome,
  category,
  include,
  handleCheckIsIncome,
  handleCheckInclude,
  handleSelectCategory,
}) => {
  return (
    <>
      {include ? (
        <TransactionRow isIncome={isIncome}>
          <div className="col-md-1">{date}</div>
          <div className="col-md-4">{merchant}</div>
          <div className="col-md-1">{`${(Math.round(amount * 100) / 100).toFixed(2)}`}</div>
          <div className="col-md-1 text-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isIncome}
              onChange={handleCheckIsIncome}
              id={`isIncome_${index}`}
            />
          </div>
          <div className="col-md-3">
            <Dropdown
              options={isIncome ? incomeOptions : expenseOptions}
              onChange={(e) => handleSelectCategory(e, index)}
              value={category}
              id={`category_${index}`}
            />
          </div>
          <div className="col-md-1 text-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={include}
              onChange={handleCheckInclude}
              id={`include_${index}`}
            />
          </div>
        </TransactionRow>
      ) : null}
      {!include ? (
        <DisabledTransactionRow>
          <div className="col-md-1">{date}</div>
          <div className="col-md-4">{merchant}</div>
          <div className="col-md-1">{`${(Math.round(amount * 100) / 100).toFixed(2)}`}</div>
          <div className="col-md-1 text-center">
            <input
              disabled
              type="checkbox"
              className="form-check-input"
              checked={isIncome}
              onChange={handleCheckIsIncome}
              id={`isIncome_${index}`}
            />
          </div>
          <div className="col-md-3">
            <Dropdown disabled />
          </div>
          <div className="col-md-1 text-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={include}
              onChange={handleCheckInclude}
              id={`include_${index}`}
            />
          </div>
        </DisabledTransactionRow>
      ) : null}
    </>
  );
};

export default ImportTransactionData;
