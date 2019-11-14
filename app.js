const config = require("./config");
const server = require("./server");
const api = require("./api");
const connectToDatabase = require("./database");
const seed = require("./seed");

// Connect the API
server.use(config.API_PREFIX, api());

const startApp = async () => {
	try {
		// Connecting to the database
		console.info("Waiting for database connection...");
		await connectToDatabase();

		console.log("Connected to database. Starting server...");

		// Seed Database
		if (process.env.NODE_ENV === "development") await seed();

		// Run tests
		if (process.env.NODE_ENV === "testing") require("./test");

		// Start the server
		server.start();
	} catch (err) {
		console.error("Couldn't start the service: err => ", err);
	}
};

startApp();