import React from "react";

const stateContext = {
	openLoader: () => { },
	closeLoader: () => { }
};

const authContext = {
	token: null,
	user: null,
	login: (user, token) => { },
	logout: () => { }
};

const taskContext = {
	tasksCompleted: [],
	selectTask: taskId => { },
	deSelectTask: taskId => { }
};

const transactionContext = {
	transactions: [],
	updateTransactions: transactions => { }
};

const auditContext = {
	audit: null,
	addAudit: audit => { }
};

export default React.createContext({
	...authContext,
	...taskContext,
	...transactionContext,
	...stateContext,
	...auditContext
});
