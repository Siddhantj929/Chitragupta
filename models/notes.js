const noteSchema = require("../schemas/notes");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Notes = mongoose.model("Notes", noteSchema);

class NoteModel extends BaseModel {
	constructor() {
		super(Notes);
	}

	async findAllAndUpdate(options, data) {
		await this.instance.updateMany(options, data);
		const results = await this.instance.find(options);
		return results.map(async i => await this.serialized(i));
	}

	async findAllSorted(options) {
		const instances = await this.instance.find(options, null, { sort: '-createdAt' });
		return instances.map(i => this.serialized(i));
	}

	serialized(note) {
		const rv = { ...note._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new NoteModel();
