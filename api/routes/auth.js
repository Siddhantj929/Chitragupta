const { Router } = require("express");
const accessMultipart = require("../middlewares/multipart");
const AuthService = require("../../services/auth");
const response = require("../response");

const router = Router();

module.exports = app => {
	router.post("/signup", accessMultipart, (req, res) =>
		AuthService.signup({ ...req.body, image: req.files.image.path })
			.then(data => res.status(201).send(response(data, true, null)))
			.catch(err => {
				console.log(err.message);
				res.status(400).send(response(null, false, err))
			})
	);

	router.post("/login", (req, res) =>
		AuthService.login(req.body)
			.then(data => res.status(200).send(response(data, true, null)))
			.catch(err => res.status(400).send(response(null, false, err)))
	);

	app.use("/auth", router);
};
