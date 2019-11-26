class HttpError extends Error {
	constructor(status, message) {
		super(message || "Internal server error.");
		this.status = status || 500;
	}
}

module.exports = HttpError;
