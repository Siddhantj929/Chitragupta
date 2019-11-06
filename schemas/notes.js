const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
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
		description: {
			type: String,
			required: true
		},
		isComplete: {
			type: Boolean,
			default: false
		},
		isActive: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = noteSchema;
