const UserService = require("./services/user");
const TagService = require("./services/tag");
const NoteService = require("./services/notes");
const TransactionsService = require("./services/transaction");

const seed = async () => {
	console.log("Seeding database...");

	// Create demo user
	const user = await UserService.create({
		name: "Siddhant Jain",
		title: "Full Stack Developer",
		email: "siddhantj929@gmail.com",
		password: "S!ddh@nt",
		image:
			"https://ae01.alicdn.com/kf/HTB1w.uMacfrK1RkSnb4q6xHRFXay/Pet-Glasses-Dog-Glasses-Cute-cat-toy-for-Little-Dog-Eye-Wear-Dog-Sunglasses-Photos-Props.jpg"
	});

	console.log("Created user");

	// Create 3 tags
	const tag1 = await TagService.create({
		name: "Webfixerr",
		color: "#2f8a4d",
		user
	});

	const tag2 = await TagService.create({
		name: "College",
		color: "#5728b5",
		user
	});

	const tag3 = await TagService.create({
		name: "Fitness",
		color: "#e09936",
		user
	});

	const tags = [{ ...tag1, user }, { ...tag2, user }, { ...tag3, user }];

	console.log("Created tags");

	// Create 7 tasks: 3 Active, 4 Queued
	[0, 0, 0, 0, 0, 0, 0].forEach(async e => {
		await NoteService.create({
			tag: tags[Math.floor(Math.random() * tags.length)],
			user,
			description: "lorem ipsum dolor sit amet."
		});
	});

	console.log("Created notes");

	// Queue notes
	await NoteService.updateQueue(user._id);

	console.log("Activated notes to tasks");

	// Create 4 transactions: 2 profit, 2 loss
	[1000, -2000, 4400, -1000].forEach(async e => {
		await TransactionsService.create({
			tag: tags[Math.floor(Math.random() * tags.length)],
			user,
			reason: "lorem ipsum dolor sit amet.",
			amount: e
		});
	});

	console.log("Created transactions");

	console.log("Seeding completed!");
};

module.exports = seed;