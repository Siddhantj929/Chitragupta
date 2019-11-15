import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Main from "../Main";
import Sign from "../Sign";
import Loader from "../Loader";

import Context from "./context";

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: blue,
		background: {
			default: "#f4f4f4"
		}
	},
	typography: {
		fontSize: 12
	}
});

const useStyles = makeStyles(theme => ({
	App: {
		minHeight: "100vh"
	}
}));

const App = () => {
	const classes = useStyles();

	// Auth
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const login = (user, token) => {
		setUser(user);
		setToken(token);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	// Loader
	const [isLoading, setIsLoading] = useState(false);

	const closeLoader = () => setIsLoading(false);
	const openLoader = () => setIsLoading(true);

	// Tasks Completion Event
	const [tasksCompleted, setTasksCompleted] = useState([]);

	const selectTask = taskId => setTasksCompleted([...tasksCompleted, taskId]);

	const deSelectTask = taskId => {
		const _selected = [...tasksCompleted];
		_selected.splice(_selected.indexOf(taskId), 1);
		setTasksCompleted(_selected);
	};

	// Transaction Context
	const [transactions, setTransactions] = useState([]);

	const updateTransactions = transactions =>
		setTransactions([...transactions, transactions]);

	// Audit Context
	const [audit, setAudit] = useState(null);

	const addAudit = audit => setAudit(audit);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Context.Provider
				value={{
					user,
					token,
					login,
					logout,
					selectTask,
					deSelectTask,
					tasksCompleted,
					transactions,
					updateTransactions,
					openLoader,
					closeLoader,
					audit,
					addAudit
				}}
			>
				<div className={classes.App}>
					{user && token && <Main />}
					{!user && !token && <Sign />}
					<Loader open={isLoading} closeLoader={closeLoader} />
				</div>
			</Context.Provider>
		</ThemeProvider>
	);
};

export default App;
