const mongoose = require("mongoose");

const config = require("../config");

// Initiating the db connection
const connectToDatabase = () =>
	mongoose.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

module.exports = connectToDatabase;
