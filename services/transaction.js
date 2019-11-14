const BaseService = require("./base");
const TransactionModel = require("../models/transaction");
const TagService = require("./tag");
const UserService = require("./user");

class TransactionService extends BaseService {
	constructor() {
		super(TransactionModel);
	}

	async create(transactionData) {
		transactionData.amount = parseFloat(transactionData.amount);

		// Checking for tag
		let tag;

		const tagData = {
			...transactionData.tag,
			user: transactionData.user
		};

		delete tagData._id;

		tag = await TagService.create(tagData);

		transactionData.tag = tag._id;

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

	async update(id, data) {
		// Removing the ability to update tag
		delete data.tag;

		// Reverting changes
		const oldTransaction = await this.model.findById(id);
		data.user.current.balance -= oldTransaction.amount;
		if (oldTransaction.isProfit) {
			data.user.balance.savings -= oldTransaction.amount;
		} else {
			data.user.balance.expenses += transaction.amount;
		}

		// Adding new changes
		const transaction = await this.model.update(id, data);

		data.user.balance.current += transaction.amount;
		if (transaction.isProfit) {
			data.user.balance.savings += transaction.amount;
		} else {
			data.user.balance.expenses -= transaction.amount;
		}

		// Updating user
		await UserService.update(
			data.user._id,
			data.user
		);

		return transaction;
	}

	async findAll(options) {
		return await this.model.findAll(options);
	}

	async readAllByUser(data) {
		await this.model.findAll({ user: data.user });
	}
}

module.exports = new TransactionService();
