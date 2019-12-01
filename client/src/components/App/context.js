import React from "react";

const stateContext = {
	openLoader: () => {},
	closeLoader: () => {}
};

const authContext = {
	token: null,
	user: null,
	login: (user, token) => {},
	logout: () => {}
};

const taskContext = {
	tasksCompleted: [],
	selectTask: taskId => {},
	deSelectTask: taskId => {},
	tasks: [],
	addTasks: () => {}
};

const transactionContext = {
	transactions: [],
	addTransactions: transactions => {}
};

const tagContext = {
	tags: [],
	addTags: tags => {}
};

const reportContext = {
	report: null,
	updateReport: report => {}
};

export default React.createContext({
	...authContext,
	...taskContext,
	...transactionContext,
	...stateContext,
	...tagContext,
	...reportContext
});
