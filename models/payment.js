const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
  amount:{
type: Number,
required: true
  },
  reference: {
    type: String,
    required: true
}



});
module.exports = mongoose.model("Payment", paymentSchema);
