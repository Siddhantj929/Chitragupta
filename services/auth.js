const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAuthToken = async user =>
	jwt.sign({ _id: user._id }, config.JWT_KEY);

const signup = async userData => {
	const user = await UserModel.insert(userData);
	return {
		user,
		token: await generateAuthToken(user)
	};
};

const login = async ({ email, password }) => {
	const user = await UserModel.findByCredentials(email, password);
	return {
		user,
		token: await generateAuthToken(user)
	};
};

module.exports = {
	generateAuthToken,
	signup,
	login
};
