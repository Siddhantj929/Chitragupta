const production = require("../config").app.stage === "production";

class HttpResponse {
	constructor(success, payload, error = null) {
		this.success = success || false;
		this.payload = payload;
		this.error = error ? (production ? error.message : error.stack) : error;
	}
}

module.exports = HttpResponse;
