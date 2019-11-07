const transactionSchema = require("../schemas/transaction");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Transactions = mongoose.model("Transactions", transactionSchema);

class TransactionModel extends BaseModel {
	constructor() {
		super(Transactions);
	}

	async findAll(options) {
		const instances = await this.instance.find(options).populate({
			path: "tag",
			select: "name _id color"
		});
		const rv = instances.map(i => this.serialized(i));
		return rv;
	}

	serialized(transaction) {
		const rv = { ...transaction._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new TransactionModel();
