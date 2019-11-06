const { Router } = require("express");
const addAuth = require("./routes/auth");

module.exports = () => {
	const router = Router();

	addAuth(router);

	return router;
};
