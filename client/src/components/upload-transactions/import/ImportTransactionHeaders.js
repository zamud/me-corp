import React from 'react';
import { HeaderRow } from '../../styledComponents';

const ImportTransactionHeaders = ({ type }) => {
  return (
    <HeaderRow>
      <div className="col-md-1">Date</div>
      <div className="col-md-4">Merchant</div>
      <div className="col-md-1">Amount</div>
      <div className="col-md-1">Income?</div>
      <div className="col-md-3">Category</div>
      <div className="col-md-1">Include?</div>
    </HeaderRow>
  );
};

export default ImportTransactionHeaders;
