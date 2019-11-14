const { Router } = require("express");
const addAuth = require("./routes/auth");
const addTransactions = require("./routes/transactions");
const addNotes = require("./routes/notes");
const addTags = require("./routes/tag");
const addAudit = require("./routes/audit");

module.exports = () => {
	const router = Router();

	addAuth(router);
	addTags(router);
	addNotes(router);
	addTransactions(router);
	addAudit(router);

	return router;
};
