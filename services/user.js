const UserModel = require("../models/user");
const config = require("../config");

const edit = async ({ id, data }) => {
	const user = await UserModel.update(id, data);
	return { user };
};

const findById = async id => {
	const user = await UserModel.findById(id);
	return { user };
};

const findByCredentials = async ({ email, password }) => {
	const user = await UserModel.findByCredentials(email, password);
	return { user };
};

module.exports = {
	edit,
	findById
};
