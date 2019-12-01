const mongoose = require("mongoose");
const transactionSchema = require("../schemas/transaction-schema");

const transactionModel = mongoose.model("Transactions", transactionSchema);

module.exports = transactionModel;
