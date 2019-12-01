const BaseController = require("./base");
const Transactions = require("../services/transaction-service");

class TransactionController extends BaseController {
	constructor() {
		super(Transactions);
	}

	async getAllByUser(req, res, next) {
		const payload = await this.service.fetchAll({ user: req.user._id });

		res.status(200).json(new HttpResponse(true, payload, null));
	}
}

const controller = new TransactionController();

module.exports = controller;
