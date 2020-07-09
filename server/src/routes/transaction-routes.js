import TransactionController from '../controllers/transaction-controller';

const routes = (app) => {
  app
    .route('/transactions')
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, TransactionController.getTransactions)
    .post((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      res.on('finish', () => {
        console.log('STATUS CODE');
        console.log(`${res.statusCode}`);
      });
      next();
    }, TransactionController.addNewTransaction);

  app
    .route('/transactions/:transactionID')
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, TransactionController.getTransactionWithID)
    .put(TransactionController.updateTransaction)
    .delete(TransactionController.deleteTransaction);
};

export default routes;
