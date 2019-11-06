const config = require("./config");
const server = require("./server");
const api = require("./api");

// Connecting to the database
require("./database");

// Connect the API
server.use(config.API_PREFIX, api());

// Start the server
server.start();
