import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../components/Cockpit";
import Accordian from "../../components/Accordian";
import TaskList from "../../components/TaskList";

const useStyles = makeStyles({
	ProfilePage: {
		paddingTop: 16,
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
				<TaskList />
			</div>
		</div>
	);
};

export default ProfilePage;
