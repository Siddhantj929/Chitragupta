const toDateString = dateStr => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		dateStyle: "medium",
		timeStyle: "short"
	});
};

exports.toDateString = toDateString;
