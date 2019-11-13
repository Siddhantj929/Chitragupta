const UserService = require("./user");
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAuthToken = async user =>
	jwt.sign({ _id: user._id }, config.JWT_KEY);

const signup = async userData => {
	if (await UserService.findByCredentials(email, password))
		throw new Error("User already exists");

	const user = await UserService.create(userData);
	return {
		user,
		token: await generateAuthToken(user)
	};
};

const login = async ({ email, password }) => {
	const user = await UserService.findByCredentials(email, password);
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
