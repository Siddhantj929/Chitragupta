import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../components/Cockpit";
import Accordian from "../../components/Accordian";
import TaskList from "../../components/TaskList";
import TransactionList from "../../components/TransactionList";

const useStyles = makeStyles({
	ProfilePage: {
		paddingTop: 8,
		paddingBottom: 16
	},
	Section: {
		margin: "32px 0"
	}
});

const ProfilePage = () => {
	const classes = useStyles();

	return (
		<div className={classes.ProfilePage}>
			<Cockpit />
			<div className={classes.Section}>
				<Accordian />
				<Accordian />
			</div>
			<div className={classes.Section}>
				<TaskList title="Active Tasks" showAddButton />
			</div>
			<div className={classes.Section}>
				<TransactionList title="Latest Transactions" showAddButton />
			</div>
		</div>
	);
};

export default ProfilePage;
