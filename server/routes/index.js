const { Router } = require("express");
const config = require("../config");

const { addUserRoutes } = require("./user-routes");
const { addTaskRoutes } = require("./task-routes");
const { addTagRoutes } = require("./tag-routes");
const { addTransactionRoutes } = require("./transaction-routes");

module.exports = app => {
	router = Router();

	addUserRoutes(router);
	addTaskRoutes(router);
	addTagRoutes(router);
	addTransactionRoutes(router);

	app.use(config.api.prefix, router);
};
