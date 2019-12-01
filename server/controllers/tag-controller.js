const BaseController = require("./base");
const Tags = require("../services/tag-service");

class TagController extends BaseController {
	constructor() {
		super(Tags);
	}

	async getAllByUser(req, res, next) {
		const payload = await this.service.fetchAll({ user: req.user._id });

		res.status(200).json(new HttpResponse(true, payload, null));
	}
}

const controller = new TagController();

module.exports = controller;
