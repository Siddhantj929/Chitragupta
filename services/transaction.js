const BaseService = require("./base");
const TransactionModel = require("../models/transaction");
const TagService = require("../services/tag");
const UserService = require("../services/user");

class TransactionService extends BaseService {
	constructor() {
		super(TransactionModel);
	}

	async create(transactionData) {
		transactionData.amount = parseFloat(transactionData.amount);

		// Checking for tag
		let tag;

		tag = await TagService.create({
			...transactionData.tag,
			user: transactionData.user
		});

		transactionData.tag = tag.tag._id;

		// Adding transaction
		const transaction = await this.model.insert(transactionData);

		transactionData.user.balance.current += transaction.amount;
		if (transaction.isProfit) {
			transactionData.user.balance.savings += transaction.amount;
		} else {
			transactionData.user.balance.expenses -= transaction.amount;
		}

		// Updating user
		await UserService.update(
			transactionData.user._id,
			transactionData.user
		);

		return transaction;
	}

	async readAllByUser(data) {
		await this.model.findAll({ user: data.user });
	}
}

module.exports = new TransactionService();
