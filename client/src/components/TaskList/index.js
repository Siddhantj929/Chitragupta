import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Zoom from "@material-ui/core/Zoom";

import Task from "../Task";
import Placeholder from "../Placeholder";

import Context from "../App/context";

const useStyles = makeStyles(theme => ({
	ListHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(9),
		right: theme.spacing(2),
		zIndex: 999
	},
	icon: {
		marginRight: theme.spacing(1)
	}
}));

const TaskList = props => {
	const classes = useStyles();
	const theme = useTheme();
	const context = useContext(Context);

	const { title, showAddButton, items } = props;

	const tasks = items;

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};

	return (
		<div className="TaskList">
			<div className={classes.ListHeader}>
				<Typography variant="button">{title}</Typography>
				{showAddButton && <Button color="primary">Add New</Button>}
			</div>
			{tasks &&
				tasks.map((e, i) => (
					<div
						className="animated fadeInUp fast"
						style={{
							animationDelay: `${i * transitionDuration.exit}ms`
						}}
					>
						<Task
							description={e.description}
							isActive={e.isActive}
							complete={e.isComplete}
							tag={e.tag}
						/>
					</div>
				))}
			{!tasks || tasks.length === 0 ? (
				<Placeholder text="Add new Task" showIcon handler={null} />
			) : null}
			<Zoom
				in={context.tasksCompleted.length !== 0}
				timeout={transitionDuration}
				unmountOnExit
			>
				<Fab color="primary" variant="extended" className={classes.fab}>
					<Icon className={classes.icon}>done</Icon>
					Save Changes
				</Fab>
			</Zoom>
		</div>
	);
};

export default TaskList;
