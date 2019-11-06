const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
	{
		tag: {
			type: Schema.Types.ObjectId,
			ref: "Tags",
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true
		},
		reason: {
			type: String,
			required: true
		},
		amount: {
			type: String,
			required: true
		},
		isProfit: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

transactionSchema.pre("save", async function(next) {
	// Check if the transaction is profit or loss
	const transaction = this;
	if (transaction.isModified("amount")) {
		if (transaction.amount > 0) transaction.isProfit = true;
	}
	next();
});

module.exports = transactionSchema;
