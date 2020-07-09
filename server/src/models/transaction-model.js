import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false, // TODO: change back to true
  },
  isIncome: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
