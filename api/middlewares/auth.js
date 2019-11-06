const jwt = require("jsonwebtoken");
const UserService = require("../../services/user");
const config = require("../../config");

const auth = async (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");
	const data = jwt.verify(token, config.JWT_KEY);

	try {
		const user = await UserService.findById(data._id);

		if (!user) {
			throw new Error();
		}

		req.body.user = user;
		req.user = user;
		req.token = token;

		// Continue to the handler
		next();
	} catch (error) {
		res.status(401).send({
			error: "Not authorized to access this resource"
		});
	}
};

module.exports = auth;
