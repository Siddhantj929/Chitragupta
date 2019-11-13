const transactionSchema = require("../schemas/transaction");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Transactions = mongoose.model("Transactions", transactionSchema);

class TransactionModel extends BaseModel {
	constructor() {
		super(Transactions);
	}

	async serialized(base_transaction) {
		const transaction = await Transactions.populate(base_transaction, {
			path: "tag",
			select: "name _id color"
		});
		const rv = { ...transaction._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new TransactionModel();
