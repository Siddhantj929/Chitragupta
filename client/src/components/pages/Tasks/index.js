import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TaskForm from "../../TaskForm";
import TaskList from "../../TaskList";

const useStyles = makeStyles({
	TaskPage: {
		paddingTop: 0,
		paddingBottom: 16
	},
	Section: {
		margin: "32px 0"
	}
});

const TaskPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.TaskPage}>
			<div className={classes.Section}>
				<TaskForm />
			</div>
			<div className={classes.Section}>
				<TaskList title="All Tasks" />
			</div>
		</div>
	);
};

export default TaskPage;
