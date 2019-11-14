const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
	{
		tag: {
			type: Schema.Types.ObjectId,
			ref: "Tags",
			required: true,
			autopopulate: {
				select: 'name _id color'
			}
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
			type: Number,
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

transactionSchema.pre("save", async function (next) {
	// Check if the transaction is profit or loss
	const transaction = this;
	if (transaction.isModified("amount")) {
		if (transaction.amount > 0) transaction.isProfit = true;
	}
	next();
});

transactionSchema.plugin(require("mongoose-autopopulate"));

module.exports = transactionSchema;
