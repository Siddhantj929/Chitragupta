export default {
	id: "12",
	name: "Siddhant Jain",
	title: "Full Stack Developer",
	image: "https://i.imgur.com/ADAlTe2.jpg",
	activeTasks: [
		{
			id: 0,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: new Date().toDateString(),
			updatedAt: new Date().toDateString(),
			isActive: true,
			isCompleted: false,
			tag: {
				name: "Webfixerr",
				color: "#32a852"
			}
		},
		{
			id: 1,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: new Date().toDateString(),
			updatedAt: new Date().toDateString(),
			isActive: true,
			isCompleted: false,
			tag: {
				name: "UpWork",
				color: "#2e7bab"
			}
		},
		{
			id: 2,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: new Date().toDateString(),
			updatedAt: new Date().toDateString(),
			isActive: true,
			isCompleted: false,
			tag: {
				name: "College",
				color: "#7133b8"
			}
		}
	],
	balance: {
		current: 1000,
		earnings: 3000,
		expenses: 2000
	}
};
