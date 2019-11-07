const { Router } = require("express");
const addAuth = require("./routes/auth");
const addTransactions = require("./routes/transactions");

module.exports = () => {
	const router = Router();

	addAuth(router);
	addTransactions(router);

	return router;
};
