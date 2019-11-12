import React from "react";

const authContext = {
	token: null,
	user: null,
	login: (user, token) => {},
	logout: () => {}
};

const taskContext = {
	tasksCompleted: [],
	selectTask: taskId => {}
};

const transactionContext = {
	latestTransactions: [],
	updateLatestTransactions: transactions => {}
};

export default React.createContext({
	...authContext,
	...taskContext,
	...transactionContext
});
