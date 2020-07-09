import React from 'react';
import { HeaderRow } from '../../styledComponents';

const AddTransactionHeaders = ({ type }) => {
  return (
    <HeaderRow>
      <div className="col-md-2">Date</div>
      <div className="col-md-3">Merchant</div>
      <div className="col-md-2">Amount</div>
      <div className="col-md-1">Income?</div>
      <div className="col-md-3">Category</div>
      <div className="col-md-1">Remove</div>
    </HeaderRow>
  );
};

export default AddTransactionHeaders;
