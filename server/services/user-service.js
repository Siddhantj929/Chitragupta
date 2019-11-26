const BaseService = require("./base");
const UserModel = require("../models/user-model");
const HttpError = require("../models/http-error");

const bcrypt = require("bcrypt");

class UserService extends BaseService {
	constructor() {
		super(UserModel);
	}

	async create(data) {
		if (await this.model.findOne({ email: data.email }))
			throw new HttpError(400, "User with this email already exists.");

		return await super.create(data);
	}

	async authenticate({ email, password }) {
		const user = await this.model.findOne({
			email: email
		});

		if (!user) throw new HttpError(404, "User with this email not found.");

		const authenticated = await bcrypt.compare(password, user.password);

		if (!authenticated)
			throw new HttpError(400, "Wrong credentials. Please try again.");

		const token = user.generateAuthToken();

		return {
			user,
			token
		};
	}
}

module.exports = new UserService();
