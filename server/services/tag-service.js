const BaseService = require("./base");
const TagModel = require("../models/tag-model");

class TagService extends BaseService {
	constructor() {
		super(TagModel);
	}
}

module.exports = new TagService();
