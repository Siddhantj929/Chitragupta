const BaseController = require("./base");
const Users = require("../services/user-service");
const HttpResponse = require("../models/http-response");
const HttpError = require("../models/http-error");

class UserController extends BaseController {
	constructor() {
		super(Users);
	}

	async signup(req, res, next) {
		try {
			const user = await this.service.create(req.body);

			const token = user.generateAuthToken();

			const payload = { user, token };

			res.status(201).json(new HttpResponse(true, payload, null));
		} catch (err) {
			next(new HttpError(err.status || 400, err.message));
		}
	}

	async login(req, res, next) {
		try {
			const payload = await this.service.authenticate(req.body);
			res.status(200).json(new HttpResponse(true, payload, null));
		} catch (err) {
			next(new HttpError(err.status || 400, err.message));
		}
	}
}

const controller = new UserController();

module.exports = controller;
