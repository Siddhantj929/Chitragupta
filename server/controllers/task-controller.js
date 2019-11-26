const BaseController = require("./base");
const Tasks = require("../services/task-service");
const HttpResponse = require("../models/http-response");

class TaskController extends BaseController {
	constructor() {
		super(Tasks);
	}

	async getAllByUser(req, res, next) {
		console.log("user", req.user);
		const payload = await this.service.fetchAll({ user: req.user });

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	async markComplete(req, res, next) {
		const payload = await this.service.updateAll(req.body.tasks, {
			isActive: false,
			isComplete: true
		});

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	async updateQueue(req, res, next) {
		const payload = await this.service.updateQueue(req.user._id);

		res.status(200).json(new HttpResponse(true, payload, null));
	}
}

const controller = new TaskController();

module.exports = controller;
