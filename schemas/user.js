const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		notes: {
			completed: {
				type: Number,
				default: 0
			},
			active: [
				{
					type: Schema.Types.ObjectId,
					ref: "Notes"
				}
			]
		},
		balance: {
			current: {
				type: Number,
				default: 0
			},
			expenses: {
				type: Number,
				default: 0
			},
			savings: {
				type: Number,
				default: 0
			}
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", async function(next) {
	// Hash the password before saving the user model
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

module.exports = userSchema;
