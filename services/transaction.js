const TransactionModel = require("../models/transaction");
const TagService = require("../services/tag");
const UserService = require("../services/user");
const config = require("../config");

const register = async transactionData => {
	transactionData.amount = parseFloat(transactionData.amount);

	// Checking for tag
	let tag;

	tag = await TagService.create({
		...transactionData.tag,
		user: transactionData.user
	});

	transactionData.tag = tag.tag._id;

	// Adding transaction
	const transaction = await TransactionModel.insert(transactionData);

	transactionData.user.balance.current += transaction.amount;
	if (transaction.isProfit) {
		transactionData.user.balance.savings += transaction.amount;
	} else {
		transactionData.user.balance.expenses -= transaction.amount;
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
