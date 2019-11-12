import React, { Fragment, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import BottomNav from "../BottomNav";

import ProfilePage from "./pages/Profile";
import RecordsPage from "./pages/Records";
import TasksPage from "./pages/Tasks";
import TransactionsPage from "./pages/Transactions";

import bottomNavConfig from "../../config/bottomNav";

const useStyles = makeStyles(theme => ({
	BottomNav: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
		boxShadow: theme.shadows[2]
	},
	Container: {
		padding: theme.spacing(0, 3)
	}
}));

const Main = () => {
	const classes = useStyles();

	const [navValue, setNavValue] = useState(bottomNavConfig.values.profile);

	const handleNavValueChange = (e, value) => setNavValue(value);

	return (
		<Fragment>
			<Container maxWidth="sm" className={classes.Container}>
				{navValue === bottomNavConfig.values.profile && <ProfilePage />}
				{navValue === bottomNavConfig.values.tasks && <TasksPage />}
				{navValue === bottomNavConfig.values.transactions && (
					<TransactionsPage />
				)}
				{navValue === bottomNavConfig.values.records && <RecordsPage />}
			</Container>
			<BottomNav
				className={classes.BottomNav}
				value={navValue}
				handleChange={handleNavValueChange}
			/>
		</Fragment>
	);
};

export default Main;
