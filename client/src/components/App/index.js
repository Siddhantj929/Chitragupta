import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Main from "../Main";
import Sign from "../Sign";
import Loader from "../Loader";

import bottomNavConfig from "../../config/bottomNav";

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
		// fontSize: 12
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
		updateQueue(user.notes.active);
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

	// Tasks Context
	const [tasks, setTasks] = useState([]);

	const addTasks = newTasks => setTasks([...tasks, ...newTasks]);

	// Queue Context
	const [queue, setQueue] = useState([]);

	const updateQueue = newQueue => setQueue(newQueue);

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

	const updateTransactions = newTransactions =>
		setTransactions([...transactions, ...newTransactions]);

	// Tag Context
	const [tags, setTags] = useState([]);

	const addTags = newTags => setTags([...tags, ...newTags]);

	// Audit Context
	const [audit, setAudit] = useState(null);

	const addAudit = audit => setAudit(audit);

	// Tab Context
	const [tab, setTab] = useState(bottomNavConfig.values.profile);

	const changeTab = (e, value) => setTab(value);

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
					addAudit,
					tags,
					addTags,
					tab,
					changeTab,
					tasks,
					addTasks,
					queue,
					updateQueue
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
