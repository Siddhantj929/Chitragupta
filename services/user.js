const BaseService = require("./base");
const UserModel = require("../models/user");
const config = require("../config");
var cloudinary = require("cloudinary").v2;

class UserService extends BaseService {
	constructor() {
		super(UserModel);
	}

	async create(data) {
		const imageOptions = {
			tags: "Chitragupta",
			eager: config.image.transformations
		};

		const image = await cloudinary.uploader.upload(
			data.image,
			imageOptions
		);

		data.imageURL = image.url;

		return await super.create(data);
	}

	async findByCredentials(email, password) {
		return await this.model.findByCredentials(email, password);
	}
}

const service = new UserService();

module.exports = service;
