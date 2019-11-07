const { Router } = require("express");
const ifAuth = require("../middlewares/auth");
const TransactionService = require("../../services/transaction");
const response = require("../response");

const router = Router();

module.exports = app => {
	router.post("/", ifAuth, (req, res) =>
		TransactionService.register(req.body)
			.then(data => res.status(201).send(response(data, true, null)))
			.catch(err => {
				console.error(err);
				res.status(400).send(response(null, false, err));
			})
	);

	app.use("/transactions", router);
};
