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
	tasks: [],
	addTasks: tasks => {},
	tasksCompleted: [],
	selectTask: taskId => {},
	deSelectTask: taskId => {}
};

const transactionContext = {
	transactions: [],
	updateTransactions: transactions => {}
};

const queueContext = {
	queue: [],
	updateQueue: queue => {}
};

const tagContext = {
	tags: [],
	addTags: tag => {}
};

const tabContext = {
	tab: null,
	changeTab: tabValue => {}
};

const auditContext = {
	audit: null,
	addAudit: audit => {}
};

export default React.createContext({
	...authContext,
	...taskContext,
	...transactionContext,
	...stateContext,
	...auditContext,
	...tagContext,
	...tabContext,
	...queueContext
});
