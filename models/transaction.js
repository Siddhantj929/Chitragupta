const transactionSchema = require("../schemas/transaction");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Transactions = mongoose.model("Transactions", transactionSchema);

class TransactionModel extends BaseModel {
	constructor() {
		super(Transactions);
	}

	async serialized(transaction) {
		transaction = await transaction.populate("tag");
		const rv = { ...transaction._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new TransactionModel();
