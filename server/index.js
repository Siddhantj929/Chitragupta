const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const config = require("../config");

// Initialising express server
const server = express();

// Logger
server.use(morgan("dev"));

// HTTP threat protection
server.use(helmet());

// Adding start method to the server
server.start = () => {
	server.listen(config.PORT, config.HOST, err => {
		if (err) console.error("Server couldn't be started: err => ", err);
		else
			console.log(
				`Server listening @ http://${config.HOST}:${config.PORT}`
			);
	});
};

// Export the server
module.exports = server;
