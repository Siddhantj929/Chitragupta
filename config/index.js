// loading env variables
require("dotenv").config();

module.exports = {
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	JWT_KEY: process.env.JWT_KEY,
	MONGO_URI: process.env.MONGO_URI,
	API_PREFIX: process.env.API_PREFIX
};
