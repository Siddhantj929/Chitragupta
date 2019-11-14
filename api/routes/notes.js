const { Router } = require("express");
const ifAuth = require("../middlewares/auth");
const NoteService = require("../../services/notes");
const response = require("../response");

const router = Router();

module.exports = app => {
	router.post("/", ifAuth, (req, res) =>
		NoteService.create(req.body)
			.then(data => res.status(201).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.get("/", ifAuth, (req, res) =>
		NoteService.readAll(req.body)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.get("/:id", ifAuth, (req, res) =>
		NoteService.read(req.params.id)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.put("/:id", ifAuth, (req, res) =>
		NoteService.update(req.params.id, req.body)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	router.delete("/:id", ifAuth, (req, res) =>
		NoteService.delete(req.params.id)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	app.use("/notes", router);
};
