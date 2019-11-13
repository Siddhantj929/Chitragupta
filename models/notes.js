const noteSchema = require("../schemas/note");
const mongoose = require("mongoose");
const BaseModel = require("./base");

const Notes = mongoose.model("Notes", noteSchema);

class NoteModel extends BaseModel {
	constructor() {
		super(Notes);
	}

	async findAllAndUpdate(options, data) {
		const instances = await this.instance.findAndUpdate(options, data);
		return instances.map(async i => await this.serialized(i));
	}

	async serialized(base_note) {
		const note = await Notes.populate(base_note, {
			path: "tag",
			select: "name _id color"
		});
		const rv = { ...note._doc };
		delete rv.user;
		return rv;
	}
}

module.exports = new NoteModel();
