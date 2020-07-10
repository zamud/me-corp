import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import NumberFormat from 'react-number-format';
import Dropdown from 'react-dropdown';
import api from '../../api/index';
import { HeaderRow, TransactionRow } from '../styledComponents';
import { incomeOptions, expenseOptions } from '../../utils/transactionUtils';

const validationSchema = Yup.object({
  date: Yup.string().required(),
  merchant: Yup.string().required(),
  amount: Yup.number().required().positive(),
  isIncome: Yup.boolean().required(),
  category: Yup.string().required(),
});

class UpdateTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionUpdated: false,
      date: '',
      merchant: '',
      amount: '',
      isIncome: false,
      category: '',
      id: '',
    };
  }

  componentDidMount = async () => {
    await api.getTransactionWithID(this.props.match.params.id).then((transaction) => {
      let { date, merchant, amount, isIncome, category } = transaction.data;
      this.setState({
        date,
        merchant,
        amount,
        isIncome,
        category,
        id: transaction.data._id,
      });
    });
  };

  handleUpdateField = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleUpdateAmount = (values) => {
    let { value } = values;
    this.setState({ amount: value });
  };

  handleCheckIsIncome = (e) => {
    let isIncome = e.target.checked;
    let category = '';
    this.setState({ isIncome, category });
  };

  handleSelectCategory = (selected) => {
    let category = selected.value;
    this.setState({ category });
  };

  handleCancel = () => {
    this.setState({ transactionUpdated: true });
  };

  render() {
    if (this.state.transactionUpdated) {
      return <Redirect to="/manage" />;
    }
    let { date, merchant, amount, isIncome, category } = this.state;
    return (
      <div className="container">
        <h3 className="mt-4">Update Transaction</h3>
        <HeaderRow>
          <div className="col-md-2">Date</div>
          <div className="col-md-4">Merchant</div>
          <div className="col-md-2">Amount</div>
          <div className="col-md-1">Income?</div>
          <div className="col-md-3">Category</div>
        </HeaderRow>
        <Formik
          initialValues={{ date, merchant, amount, isIncome, category }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            await api.updateTransaction(this.props.match.params.id, values).then((res) => {
              console.log(res);
              this.setState({
                transactionUpdated: true,
              });
            });
          }}
        >
          {({ handleChange, handleSubmit, handleReset, setFieldValue, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <TransactionRow>
                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    value={values.date.toString().substring(0, 10)}
                    id="date"
                    onChange={handleChange}
                    style={{ width: '80%', fontSize: 'small' }}
                  />
                  {errors.date ? errors.date : null}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={values.merchant}
                    onChange={handleChange}
                    id="merchant"
                  />
                  {errors.merchant ? errors.merchant : null}
                </div>
                <div className="col-md-2">
                  <NumberFormat
                    value={values.amount}
                    id="amount"
                    onValueChange={(val) => setFieldValue('amount', val.value, false)}
                    decimalScale={2}
                    thousandSeparator={true}
                    className="form-control"
                    prefix="$"
                    style={{ width: '100%' }}
                  />
                  {errors.amount ? errors.amount : null}
                </div>
                <div className="col-md-1 text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={values.isIncome}
                    onChange={handleChange}
                    id="isIncome"
                  />
                  {errors.isIncome ? errors.isIncome : null}
                </div>
                <div className="col-md-3">
                  <Dropdown
                    options={values.isIncome ? incomeOptions : expenseOptions}
                    onChange={(selected) => setFieldValue('category', selected.value, false)}
                    value={values.category}
                    id="category"
                  />
                  {errors.category ? errors.category : null}
                </div>
              </TransactionRow>
              <div className="row mt-2">
                <div className="col-md-12 text-right">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button className="btn btn-secondary mr-2" onClick={handleReset}>
                    Start Over
                  </button>
                  <button className="btn btn-light" onClick={this.handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UpdateTransaction;
