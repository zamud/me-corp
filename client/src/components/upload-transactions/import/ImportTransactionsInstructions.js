import React from 'react';

const ImportTransactionsInstructions = () => {
  return (
    <>
      <div className="col-md-5">
        <h5>To import:</h5>
        <ol>
          <li>
            Make a spreadsheet with three columns, in this order:
            <ul>
              <li>
                Date - <i>ex) 7/9/2020</i>
              </li>
              <li>
                Merchant - <i>ex) CHIPOTLE ONLINE</i>
              </li>
              <li>
                Amount - <i>ex) $8.86</i>
              </li>
            </ul>
          </li>
          <li>Import it using the dropzone</li>
          <li>Complete the transaction info and click "Submit"</li>
        </ol>
      </div>
    </>
  );
};

export default ImportTransactionsInstructions;
