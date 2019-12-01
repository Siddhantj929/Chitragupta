module.exports = {
	saltingRounds: parseInt(process.env.SALTING_ROUNDS),
	secret: process.env.JWT_SECRET,
	tokenOptions: {
		expiresIn: "2d"
	}
};
