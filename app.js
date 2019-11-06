const config = require("./config");
const server = require("./server");
const api = require("./api");
const connectToDatabase = require("./database");

// Connect the API
server.use(config.API_PREFIX, api());

// Connecting to the database
console.info("Waiting for database connection...");
connectToDatabase()
	.then(() => {
		console.log("Connected to database. Starting server...");
		// Start the server
		server.start();
	})
	.catch(err => console.error("Couldn't start the service: err => ", err));
