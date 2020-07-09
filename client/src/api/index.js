import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getTransactions = () => api.get('/transactions');
export const addNewTransaction = (payload) => api.post('/transactions', payload);
export const getTransactionWithID = (id) => api.get(`/transactions/${id}`);
export const updateTransaction = (id, payload) => api.put(`/transactions/${id}`, payload);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

const apis = {
  getTransactions,
  addNewTransaction,
  getTransactionWithID,
  updateTransaction,
  deleteTransaction,
};

export default apis;
