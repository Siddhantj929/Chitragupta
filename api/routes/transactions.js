const { Router } = require("express");
const ifAuth = require("../middlewares/auth");
const TransactionService = require("../../services/transaction");
const response = require("../response");

const router = Router();

module.exports = app => {
	router.post("/", ifAuth, (req, res) =>
		TransactionService.create(req.body)
			.then(data => res.status(201).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.get("/", ifAuth, (req, res) =>
		TransactionService.readAllByUser(req.user)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.get("/:id", ifAuth, (req, res) =>
		TransactionService.read(req.params.id)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.put("/:id", ifAuth, (req, res) =>
		TransactionService.update({ _id: req.params.id }, req.body)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.delete("/:id", ifAuth, (req, res) =>
		TransactionService.delete(req.params.id)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	app.use("/transactions", router);
};
