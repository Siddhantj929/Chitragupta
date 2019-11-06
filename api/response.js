module.exports = (payload, success, error) => {
	return {
		payload,
		success,
		error: error ? error.message : null
	};
};
