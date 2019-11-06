const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = tagSchema;
