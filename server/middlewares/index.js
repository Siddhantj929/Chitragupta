const bodyParser = require("body-parser");
const morgan = require("morgan")("common");
const helmet = require("helmet")();
const compression = require("compression")();
const cors = require("cors")();

module.exports = app => {
	// Parsing incoming request body
	app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
	app.use(bodyParser.json({ limit: "50mb" }));

	// Logger
	app.use(morgan);

	// Protection headers
	app.use(helmet);

	// GZIP compression
	app.use(compression);

	// CORS enabled
	app.use(cors);
};
