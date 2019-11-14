const tagSchema = require("../schemas/tag");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Tags = mongoose.model("Tags", tagSchema);

class TagModel extends BaseModel {
	constructor() {
		super(Tags);
	}

	async findByNameAndUser({ name, user }) {
		const tag = await this.instance.findOne({ name, user });
		return tag ? this.serialized(tag) : tag;
	}

	serialized(tag) {
		const rv = { ...tag._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new TagModel();
