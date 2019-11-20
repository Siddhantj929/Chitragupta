import React, { Fragment, useContext } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import BottomNav from "../BottomNav";

import ProfilePage from "./pages/Profile";
import RecordsPage from "./pages/Records";
import TasksPage from "./pages/Tasks";
import TransactionsPage from "./pages/Transactions";

import bottomNavConfig from "../../config/bottomNav";

import Context from "../App/context";

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
	const context = useContext(Context);

	const { tab, changeTab } = context;

	return (
		<Fragment>
			<Container maxWidth="sm" className={classes.Container}>
				{tab === bottomNavConfig.values.profile && <ProfilePage />}
				{tab === bottomNavConfig.values.tasks && <TasksPage />}
				{tab === bottomNavConfig.values.transactions && (
					<TransactionsPage />
				)}
				{tab === bottomNavConfig.values.records && <RecordsPage />}
			</Container>
			<BottomNav
				className={classes.BottomNav}
				value={tab}
				handleChange={changeTab}
			/>
		</Fragment>
	);
};

export default Main;
