const TagModel = require("../models/tag");
const config = require("../config");

const create = async tagData => {
	console.log(tagData);
	let tag = await check(tagData);

	if (tag) throw new Error("Tag already exists");

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
