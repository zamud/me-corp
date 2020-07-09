import React from 'react';
import { DateRangePicker } from 'react-dates';
import Dropdown from 'react-dropdown';
import { incomeOptions, expenseOptions } from '../../utils/transactionUtils';

const TransactionListFilters = ({
  filterStartDate,
  filterEndDate,
  filterCategory,
  focusedInput,
  handleDateChange,
  handleCategoryChange,
  handleFocusChange,
}) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <h5>Date Range:</h5>
        <DateRangePicker
          startDate={filterStartDate}
          startDateId="transaction-range-start"
          endDate={filterEndDate}
          endDateId="transaction-range-end"
          onDatesChange={handleDateChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          isOutsideRange={() => false}
        />
      </div>
      <div className="col-md-8">
        <h5>Category</h5>
        <Dropdown
          options={[{ value: '', label: 'All' }].concat(incomeOptions).concat(expenseOptions)}
          onChange={(value) => handleCategoryChange(value)}
          value={filterCategory}
          id="filterCategory"
        />
      </div>
    </div>
  );
};

export default TransactionListFilters;
