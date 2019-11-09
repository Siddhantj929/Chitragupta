import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import BottomNav from "../BottomNav";

import ProfilePage from "../../pages/Profile";
import RecordsPage from "../../pages/Records";
import TasksPage from "../../pages/Tasks";
import TransactionsPage from "../../pages/Transactions";

import bottomNavConfig from "../../config/bottomNav";

const theme = createMuiTheme({
	palette: {
		primary: blue
		// background: {
		// 	default: "#f7f7f7"
		// }
	}
});

const useStyles = makeStyles({
	App: {
		minHeight: "100vh"
	},
	BottomNav: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0
	}
});

const App = () => {
	const classes = useStyles();

	const [navValue, setNavValue] = useState(bottomNavConfig.values.profile);

	const handleNavValueChange = (e, value) => setNavValue(value);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={classes.App}>
				<Container maxWidth="sm">
					{navValue === bottomNavConfig.values.profile && (
						<ProfilePage />
					)}
					{navValue === bottomNavConfig.values.tasks && <TasksPage />}
					{navValue === bottomNavConfig.values.transactions && (
						<TransactionsPage />
					)}
					{navValue === bottomNavConfig.values.records && (
						<RecordsPage />
					)}
				</Container>
				<BottomNav
					className={classes.BottomNav}
					value={navValue}
					handleChange={handleNavValueChange}
				/>
			</div>
		</ThemeProvider>
	);
};

export default App;
