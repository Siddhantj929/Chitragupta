const BaseService = require("./base");
const TransactionModel = require("../models/transaction-model");

class TransactionService extends BaseService {
	constructor() {
		super(TransactionModel);
	}
}

module.exports = new TransactionService();
