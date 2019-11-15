const transactionSchema = require("../schemas/transaction");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Transactions = mongoose.model("Transactions", transactionSchema);

class TransactionModel extends BaseModel {
	constructor() {
		super(Transactions);
	}

	async findAllSorted(options) {
		const instances = await this.instance.find(options, null, { sort: '-updatedAt' });
		return instances.map(i => this.serialized(i));
	}

	serialized(transaction) {
		const rv = { ...transaction._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new TransactionModel();
