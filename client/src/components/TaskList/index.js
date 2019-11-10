import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Task from "../Task";

const tag = {
	name: "Webfixerr",
	color: "#339e3a"
};

const useStyles = makeStyles(theme => ({
	ListHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	}
}));

const TaskList = () => {
	const classes = useStyles();

	return (
		<div className="TaskList">
			<div className={classes.ListHeader}>
				<Typography variant="button">Active Tasks</Typography>
				<Button color="primary">Add New</Button>
			</div>
			<Task tag={tag} complete />
			<Task tag={tag} />
			<Task tag={tag} complete />
		</div>
	);
};

export default TaskList;
