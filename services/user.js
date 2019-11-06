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

module.exports = {
	edit,
	findById
};
