import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../components/Cockpit";

const useStyles = makeStyles({
	ProfilePage: {
		paddingTop: 16,
		paddingBottom: 16
	}
});

const ProfilePage = () => {
	const classes = useStyles();

	return (
		<div className={classes.ProfilePage}>
			<Cockpit />
		</div>
	);
};

export default ProfilePage;
