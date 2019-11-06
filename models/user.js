const userSchema = require("../schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const BaseModel = require("./base");

const Users = mongoose.model("Users", userSchema);

class UserModel extends BaseModel {
	constructor() {
		super(Users);
	}

	// Finding the user with credentials only
	async findByCredentials(email, password) {
		const user = await Users.findOne({ email });

		if (!user)
			throw new Error({ error: "Invalid login credentials: Email" });

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch)
			throw new Error({ error: "Invalid login credentials: Password" });

		return this.serialized(user);
	}

	// Serializer for user object
	serialized(user) {
		const rv = { ...user._doc };
		delete rv.password;
		return rv;
	}
}

module.exports = new UserModel();