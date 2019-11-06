const { Router } = require("express");
const AuthService = require("../../services/auth");
const response = require("../response");

const router = Router();

module.exports = app => {
	router.post("/signup", (req, res) =>
		AuthService.signup(req.body)
			.then(data => res.status(200).send(new response(data, true, null)))
			.catch(err => res.status(400).send(new response(null, false, err)))
	);

	router.post("/login", (req, res) =>
		AuthService.login(req.body)
			.then(data => res.status(200).send(new response(data, true, null)))
			.catch(err => res.status(400).send(new response(null, false, err)))
	);

	app.use("/api/auth", router);
};
