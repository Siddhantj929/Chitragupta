const mongoose = require("mongoose");

const config = require("../config");

// Initiating the db connection
mongoose
	.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Successfully connect to the DB"))
	.catch(err => console.log("Couldn't connect to the DB: err => ", err));
