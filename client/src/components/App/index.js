import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Main from "../Main";
import Sign from "../Sign";

import Context from "./context";

const theme = createMuiTheme({
	palette: {
		primary: blue,
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

	// Tasks Completion Event
	const [tasksCompleted, setTasksCompleted] = useState([]);

	const selectTask = taskId => setTasksCompleted([...tasksCompleted, taskId]);

	// Transaction Context
	const [latestTransactions, setLatestTransactions] = useState();

	const updateLatestTransactions = transactions =>
		setLatestTransactions([...latestTransactions, transactions]);

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
					tasksCompleted,
					latestTransactions,
					updateLatestTransactions
				}}
			>
				<div className={classes.App}>
					{user && token && <Main />}
					{!user && !token && <Sign />}
				</div>
			</Context.Provider>
		</ThemeProvider>
	);
};

export default App;
