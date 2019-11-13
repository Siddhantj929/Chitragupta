const BaseService = require("./base");
const TagModel = require("../models/tag");

class TagService extends BaseService {
	constructor() {
		super(TagModel);
	}

	async create(tagData) {
		let tag = await this.check(tagData);

		if (tag) throw new Error("Tag already exists");

		return await this.model.insert(tagData);
	}

	check(data) {
		this.model
			.findByNameAndUser(data)
			.then(d => d)
			.catch(e => false);
	}
}

module.exports = new TagService();
