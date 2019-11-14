const BaseService = require("./base");
const NoteModel = require("../models/notes");
const UserService = require("../services/user");
const config = require("../config");

class NoteService extends BaseService {
	constructor() {
		super(NoteModel);
	}

	async markComplete(noteIds) {
		return await this.model.findAllAndUpdate(
			{ _id: { $in: noteIds } },
			{ isActive: false, isComplete: true }
		);
	}

	async findAll(options) {
		return await this.model.findAll(options);
	}

	async updateQueue(userId) {
		const user = await UserService.read(userId);
		const tags = user.notes.active.map(e => {
			if (e.tag) return e.tag._id;
		});
		const vacancy = config.notes.maxActive - user.notes.active.length;
		const queue = await this.model.findAllSorted({
			user: userId,
			isActive: false,
			isComplete: false,
			tag: { $nin: tags }
		});

		const selectedNotes = queue.slice(0, vacancy);

		// update selected notes
		await this.markComplete(selectedNotes);

		user.notes.active = user.notes.active.concat(selectedNotes);

		return await UserService.update(userId, user);
	}
}

module.exports = new NoteService();
