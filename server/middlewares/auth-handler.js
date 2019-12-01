const HttpError = require("../models/http-error");
const config = require("../config");
const jwt = require("jsonwebtoken");

const authHandler = (req, res, next) => {
	try {
		const token = req.headers["authorization"].split(" ")[1]; // Bearer <token>

		// verify makes sure that the token hasn't expired and has been issued by us
		result = jwt.verify(
			token,
			config.auth.secret,
			config.auth.tokenOptions
		);

		// Let's pass back the decoded token to the request object
		req.user = result.user;
		req.body.user = result.user;
		// We call next to pass execution to the subsequent middleware
		next();
	} catch (err) {
		console.log(err);
		// Throw an error just in case anything goes wrong with verification
		return next(new HttpError(401, "Not authorized. Token not valid."));
	}
};

module.exports = authHandler;
