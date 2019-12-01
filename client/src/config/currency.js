const toINR = number =>
	number.toLocaleString("en-IN", {
		maximumFractionDigits: 2,
		style: "currency",
		currency: "INR"
	});

exports.toINR = toINR;
