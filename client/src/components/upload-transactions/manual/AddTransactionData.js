import React from 'react';
import NumberFormat from 'react-number-format';
import Dropdown from 'react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TransactionRow } from '../../styledComponents';
import { incomeOptions, expenseOptions } from '../../../utils/transactionUtils';

const AddTransactionData = ({
  index,
  date,
  merchant,
  amount,
  isIncome,
  category,
  handleUpdateDate,
  handleUpdateMerchant,
  handleUpdateAmount,
  handleSelectCategory,
  handleCheckIsIncome,
  handleRemoveTransaction,
}) => {
  return (
    <TransactionRow isIncome={isIncome}>
      <div className="col-md-2">
        <input
          type="date"
          className="form-control"
          value={date}
          id={`date_${index}`}
          onChange={handleUpdateDate}
          style={{ width: '100%', fontSize: 'small' }}
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Merchant Name"
          value={merchant}
          onChange={handleUpdateMerchant}
          id={`merchant_${index}`}
        />
      </div>
      <div className="col-md-2">
        <NumberFormat
          value={amount}
          id={`amount_${index}`}
          onValueChange={(values) => handleUpdateAmount(values, index)}
          decimalScale={2}
          thousandSeparator={true}
          className="form-control"
          prefix="$"
          style={{ width: '100%' }}
        />
      </div>
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
          onChange={(value) => handleSelectCategory(value, index)}
          value={category}
          id={`category_${index}`}
        />
      </div>
      <div className="col-md-1 text-center">
        <button
          className="btn btn-danger btn-sm"
          id={`remove_${index}`}
          onClick={handleRemoveTransaction}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </TransactionRow>
  );
};

export default AddTransactionData;
