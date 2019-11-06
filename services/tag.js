const TagModel = require("../models/tag");
const config = require("../config");

const create = async tagData => {
	let tag = check(tagData);

	if (tag) {
		// Tag exists already
		const tagError = new Error("Tag already exists");
		tagError.tag = tag;
		throw tagError;
	}

	tag = await TagModel.insert(tagData);
	return { tag };
};

const check = data =>
	TagModel.findByNameAndUser(data)
		.then(d => d)
		.catch(e => false);

module.exports = {
	create,
	check
};
