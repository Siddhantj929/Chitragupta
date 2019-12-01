const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
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
		isActive: {
			type: Boolean,
			default: false
		},
		isComplete: {
			type: Boolean,
			default: false
		},
		value: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

taskSchema.plugin(require("mongoose-autopopulate"));

module.exports = taskSchema;
