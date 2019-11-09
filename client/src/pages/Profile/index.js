import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../components/Cockpit";
import Accordian from "../../components/Accordian";

const useStyles = makeStyles({
	ProfilePage: {
		paddingTop: 16,
		paddingBottom: 16
	},
	Accordians: {
		margin: "32px 0"
	}
});

const ProfilePage = () => {
	const classes = useStyles();

	return (
		<div className={classes.ProfilePage}>
			<Cockpit />
			<div className={classes.Accordians}>
				<Accordian />
				<Accordian />
			</div>
		</div>
	);
};

export default ProfilePage;
