const BaseService = require("./base");
const TagModel = require("../models/tag");

class TagService extends BaseService {
	constructor() {
		super(TagModel);
	}

	async create(tagData) {
		let tag = await this.check(tagData);
		return tag ? tag : await this.model.insert(tagData);
	}

	async check(data) {
		console.log(data);
		const tag = await this.model.findByNameAndUser({ name: data.name, user: data.user });
		return tag;
	}
}

module.exports = new TagService();
