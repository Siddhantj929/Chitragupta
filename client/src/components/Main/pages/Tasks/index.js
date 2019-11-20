import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TaskForm from "../../../TaskForm";
import TaskList from "../../../TaskList";

import Context from "../../../App/context";

const useStyles = makeStyles({
	TaskPage: {
		paddingTop: 0,
		paddingBottom: 40
	},
	Section: {
		margin: "32px 0"
	}
});

const TaskPage = () => {
	const classes = useStyles();
	const context = useContext(Context);

	const fetchTasks = async () => {
		const response = await fetch(`http://localhost:5000/v1/api/notes`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${context.token}`
			}
		});

		const data = await response.json();
		console.log("notes", data);

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			context.addTasks(data.payload);
		}
	};

	if (context.tasks.length === 0) fetchTasks();

	return (
		<div className={classes.TaskPage}>
			<div className={classes.Section}>
				<TaskForm />
			</div>
			<div className={classes.Section}>
				<TaskList title="All Tasks" items={context.tasks} />
			</div>
		</div>
	);
};

export default TaskPage;
