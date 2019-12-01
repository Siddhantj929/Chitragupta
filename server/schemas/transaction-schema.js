const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
	{
		tag: {
			type: Schema.Types.ObjectId,
			ref: "Tags",
			required: true,
			autopopulate: {
				select: "_id name color"
			}
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true
		},
		note: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

transactionSchema.plugin(require("mongoose-autopopulate"));

module.exports = transactionSchema;
