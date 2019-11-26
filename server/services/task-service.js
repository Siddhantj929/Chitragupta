const BaseService = require("./base");
const TaskModel = require("../models/task-model");
const config = require("../config");

class TaskService extends BaseService {
	constructor() {
		super(TaskModel);
	}

	async updateAll(taskIds, data) {
		await this.model.updateMany({ _id: { $in: taskIds } }, data);

		return await this.model.find({ _id: { $in: taskIds } });
	}

	async updateQueue(userId) {
		const activeTasks = await this.model.find({
			isActive: true,
			user: userId
		});

		const queueVacancy = config.task.activeLimit - activeTasks.length;

		// If the queue is full
		if (queueVacancy === 0) return;

		const waitingTasks = await this.model.find(
			{ isComplete: false, isActive: false, user: userId },
			{ sort: "-createdAt" }
		);

		const selectedIds = waitingTasks.slice(0, queueVacancy).map(e => e._id);

		await this.model.updateMany(
			{ _id: { $in: selectedIds } },
			{ isActive: true }
		);

		return await this.model.find(
			{ isActive: true, user: userId },
			{ sort: "-updatedAt" }
		);
	}
}

module.exports = new TaskService();
