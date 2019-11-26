const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const config = require("../config");

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
		image: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

// Hash password before saving
userSchema.pre("save", function(next) {
	const user = this;
	if (!user.isModified || !user.isNew) {
		// don't rehash if it's an old user
		next();
	} else {
		bcrypt.hash(user.password, config.auth.saltingRounds, function(
			err,
			hash
		) {
			if (err) {
				console.log("Error hashing password for user", user.name);
				next(new HttpError(400, err.message));
			} else {
				user.password = hash;
				next();
			}
		});
	}
});

// Get JWT token for the user
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{ user: { _id: this._id } },
		config.auth.secret,
		config.auth.tokenOptions
	);
	return token;
};

module.exports = userSchema;
