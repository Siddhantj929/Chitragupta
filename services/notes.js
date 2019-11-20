const BaseService = require("./base");
const NoteModel = require("../models/notes");
const UserService = require("../services/user");
const TagService = require("../services/tag");
const config = require("../config");

class NoteService extends BaseService {
	constructor() {
		super(NoteModel);
	}

	async create(data) {
		// Checking for tag
		let tag;

		console.log(data);

		const tagData = {
			...data.tag,
			user: data.user
		};

		delete tagData._id;

		tag = await TagService.create(tagData);

		data.tag = tag._id;

		const note = await super.create(data);
		note.tag = {
			_id: tag._id,
			name: tag.name,
			color: tag.color
		};

		const updatedUser = await this.updateQueue(data.user._id);

		const queue = updatedUser.notes.active;

		return {
			note,
			queue
		};
	}

	async markComplete(userId, noteIds) {
		const user = await UserService.read(userId);

		user.notes.active = user.notes.active.map(e => {
			if (!noteIds.includes(e._id)) return e;
		});

		await UserService.update(userId, user);

		return await this.model.findAllAndUpdate(
			{ _id: { $in: noteIds } },
			{ isActive: false, isComplete: true }
		);
	}

	async update(id, data) {
		delete data.tag;
		return await super.update(id, data);
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
		let queue = await this.model.findAllSorted({
			user: userId,
			isActive: false,
			isComplete: false,
			tag: { $nin: tags }
		});

		if (queue.length === 0) {
			queue = await this.model.findAllSorted({
				user: userId,
				isActive: false,
				isComplete: false
			});
		}

		const selectedNotes = queue.slice(0, vacancy);

		// update selected notes
		await this.markComplete(selectedNotes);

		user.notes.active = user.notes.active.concat(selectedNotes);

		return await UserService.update(userId, user);
	}

	async check(user, data) {
		await this.markComplete(user, data.notes);

		const updatedUser = await this.updateQueue(data.user._id);

		return {
			queue: updatedUser.notes.active
		};
	}
}

module.exports = new NoteService();
