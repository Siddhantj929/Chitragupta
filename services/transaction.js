const TransactionModel = require("../models/transaction");
const TagService = require("../services/tag");
const UserService = require("../services/user");
const config = require("../config");

const register = async transactionData => {
	// Checking for tag
	let tag;

	try {
		tag = await TagService.create({
			...transactionData.tag,
			user: transactionData.user
		});
	} catch (err) {
		tag = err.tag;
	}

	transactionData.tag = tag._id;

	// Adding transaction
	const transaction = await TransactionModel.insert(transactionData);

	if (transaction.isProfit) {
		transactionData.user.balance.savings += transaction.amount;
	} else {
		transactionData.user.balance.expenses += transaction.amount;
	}

	// Updating user
	await UserService.edit({
		id: transactionData.user._id,
		data: transactionData.user
	});

	return { transaction };
};

module.exports = {
	register
};
