import Transaction from "../models/transaction-model";

const getTransactions = (req, res) => {
  Transaction.find({}, (err, transactions) => {
    if (err) {
      res.send(err);
    }
    res.json(transactions);
  });
};

const addNewTransaction = (req, res) => {
  let newTransaction = new Transaction(req.body);

  newTransaction.save((err, transaction) => {
    if (err) {
      res.send(err);
    }
    res.json(transaction);
  });
};

const getTransactionWithID = (req, res) => {
  Transaction.findById(req.params.transactionID, (err, transaction) => {
    if (err) {
      res.send(err);
    }
    res.json(transaction);
  });
};

const updateTransaction = (req, res) => {
  Transaction.findOneAndUpdate(
    { _id: req.params.transactionID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, transaction) => {
      if (err) {
        res.send(err);
      }
      res.json(transaction);
    }
  );
};

const deleteTransaction = (req, res) => {
  Transaction.findOneAndRemove(
    { _id: req.params.transactionID },
    (err, transaction) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json({ message: "Successfully deleted transaction" });
      return;
    }
  );
};

export default {
  getTransactions,
  addNewTransaction,
  getTransactionWithID,
  updateTransaction,
  deleteTransaction,
};
