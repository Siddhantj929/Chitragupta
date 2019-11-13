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

	async updateQueue(userId) {
		const user = await UserService.findById(userId);
		const tags = user.notes.active.map(e => e.tag);
		const vacancy = config.notes.maxActive - user.notes.active.length;
		const queue = await this.model
			.findAll({
				user: userId,
				isActive: false,
				isComplete: false,
				tag: { $nin: tags }
			})
			.sort("-date");

		user.notes.active.push(queue.slice(0, vacancy));

		return await UserService.update(userId, user);
	}
}

module.exports = new NoteService();
