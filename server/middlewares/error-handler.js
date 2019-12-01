const HttpResponse = require("../models/http-response");

const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	res.status(err.status || 404).json(new HttpResponse(false, null, err));
};

module.exports = errorHandler;
