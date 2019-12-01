const BaseService = require("./base");
const UserModel = require("../models/user-model");
const TaskModel = require("../models/task-model");
const TransactionModel = require("../models/transaction-model");
const HttpError = require("../models/http-error");

const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

class UserService extends BaseService {
	constructor() {
		super(UserModel);
	}

	async create(data) {
		if (await this.model.findOne({ email: data.email }))
			throw new HttpError(400, "User with this email already exists.");

		// Upload image to Cloudinary server
		const image = await cloudinary.uploader.upload(data.image, {
			tags: "chitragupta_user",
			width: 100,
			height: 100,
			crop: "fit",
			public_id: data.name.replace(" ", "_")
		});

		data.image = image.url;

		return await super.create(data);
	}

	async authenticate({ email, password }) {
		const user = await this.model.findOne({
			email: email
		});

		if (!user) throw new HttpError(404, "User with this email not found.");

		const authenticated = await bcrypt.compare(password, user.password);

		if (!authenticated)
			throw new HttpError(400, "Wrong credentials. Please try again.");

		const token = user.generateAuthToken();

		return {
			user,
			token
		};
	}

	async generateReport(userId, start, end) {
		// Helper function to map array into object with tag names as keys
		const generateTagReport = (arr, isCount = false) => {
			const result = {};

			arr.forEach(e => {
				if (!result[e.tag.name] || result[e.tag.name] === "undefined")
					result[e.tag.name] = 0;

				result[e.tag.name] += isCount ? 1 : e.value;
			});

			return result;
		};

		const startDate = start ? new Date(start) : null;
		const endDate = end ? new Date(end) : null;

		const expenses = await TransactionModel.find({
			user: userId,
			value: { $lt: 0 },
			createdAt: {
				$gte: startDate,
				$lt: endDate
			}
		});

		const earnings = await TransactionModel.find({
			user: userId,
			value: { $gt: 0 },
			createdAt: {
				$gte: startDate,
				$lt: endDate
			}
		});

		const tasksCompleted = await TaskModel.find({
			user: userId,
			isComplete: true,
			createdAt: {
				$gte: startDate,
				$lt: endDate
			}
		});

		return {
			expenses: {
				total: expenses.reduce((a, b) => a.value + b.value, 0),
				report: generateTagReport(expenses)
			},
			earnings: {
				total: earnings.reduce((a, b) => a.value + b.value, 0),
				report: generateTagReport(earnings)
			},
			tasksCompleted: {
				total: tasksCompleted.length,
				report: generateTagReport(tasksCompleted, true)
			}
		};
	}
}

module.exports = new UserService();
