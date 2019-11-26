require("dotenv").config();

const appConfig = require("./app-config");
const databaseConfig = require("./database-config");
const apiConfig = require("./api-config");
const taskConfig = require("./task-config");
const authConfig = require("./auth-config");

module.exports = {
	app: appConfig,
	database: databaseConfig,
	api: apiConfig,
	task: taskConfig,
	auth: authConfig
};
