// loading env variables
require("dotenv").config();

const notes = require("./notes");
const transactions = require("./transactions");

module.exports = {
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	JWT_KEY: process.env.JWT_KEY,
	MONGO_URI: process.env.MONGO_URI,
	API_PREFIX: process.env.API_PREFIX,
	notes,
	transactions
};
