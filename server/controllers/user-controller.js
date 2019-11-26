const BaseController = require("./base");
const Users = require("../services/user-service");
const HttpResponse = require("../models/http-response");

class UserController extends BaseController {
	constructor() {
		super(Users);
	}

	async signup(req, res, next) {
		const user = await this.service.create(req.body);

		const token = user.generateAuthToken();

		const payload = { user, token };

		res.status(201).json(new HttpResponse(true, payload, null));
	}

	async login(req, res, next) {
		const payload = await this.service.authenticate(req.body);
		res.status(200).json(new HttpResponse(true, payload, null));
	}
}

const controller = new UserController();

module.exports = controller;
