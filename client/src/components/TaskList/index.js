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

const TaskList = props => {
	const classes = useStyles();
	const { title, showAddButton } = props;

	return (
		<div className="TaskList">
			<div className={classes.ListHeader}>
				<Typography variant="button">{title}</Typography>
				{showAddButton && <Button color="primary">Add New</Button>}
			</div>
			<Task tag={tag} complete isActive />
			<Task tag={tag} isActive />
			<Task tag={tag} complete />
		</div>
	);
};

export default TaskList;
