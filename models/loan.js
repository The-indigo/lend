const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  amount: {
    type: Number,
    required: true,
  },
  dateApplied: {
    type: Date,
    required: true,
  },
  amountPerMonth: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  returnAmount: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});
module.exports = mongoose.model("Loan", loanSchema);
