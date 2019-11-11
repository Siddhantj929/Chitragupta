import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";

import Tag from "../Tag";
import Menu from "../Menu";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
		position: "relative"
	},
	text: {
		marginBottom: theme.spacing(1.5),
		width: "90%",
		display: "flex",
		alignItems: "flex-start"
	},
	menuIcon: {
		position: "absolute",
		top: theme.spacing(2),
		right: theme.spacing(1),
		color: theme.palette.text.secondary
	},
	completeTag: {
		height: "1.1rem",
		width: "1.1rem",
		marginTop: 1,
		fontSize: "1.1rem"
	},
	checkbox: {
		padding: 0,
		paddingRight: theme.spacing(1)
	}
}));

const CompleteTag = () => {
	const theme = useTheme();
	const classes = useStyles();

	return (
		<Tag
			name="Completed"
			color={theme.palette.background.default}
			icon={<Icon className={classes.completeTag}>check_circle</Icon>}
		/>
	);
};

const Task = props => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const menuItems = [
		{
			icon: <Icon fontSize="small">edit</Icon>,
			text: "Edit"
		},
		{
			icon: <Icon fontSize="small">delete</Icon>,
			text: "Delete"
		}
	];

	const { tags } = makeStyles(theme => ({
		tags: {
			marginLeft: props.isActive ? theme.spacing(4) : 0
		}
	}))();

	return (
		<Paper className={classes.root}>
			<div className={classes.text}>
				{props.isActive && (
					<Checkbox
						checked={false}
						// onChange={!this.checked}
						value="checkedA"
						className={classes.checkbox}
					/>
				)}
				<Typography variant="body2">
					Paper can be used to build surface or other elements for
					your application.
				</Typography>
			</div>
			<div className={tags}>
				{props.tag && (
					<Tag name={props.tag.name} color={props.tag.color} />
				)}
				{props.complete && <CompleteTag />}
			</div>
			<Icon
				className={classes.menuIcon}
				aria-controls="user-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				more_vert
			</Icon>
			<Menu
				anchor={anchorEl}
				handleClose={handleClose}
				items={menuItems}
				showIcon
			/>
		</Paper>
	);
};

export default Task;
