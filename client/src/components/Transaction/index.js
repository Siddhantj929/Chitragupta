import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";

import Tag from "../Tag";
import Menu from "../Menu";

import { toDateString } from "../../config/date";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		margin: theme.spacing(1.5, 0),
		position: "relative"
	},
	text: {
		marginBottom: theme.spacing(1.5),
		display: "flex"
	},
	reason: {
		flexBasis: "70%"
	},
	amount: {
		flexBasis: "30%",
		textAlign: "right",
		color: green[700],
		fontWeight: "bold"
	},
	menuIcon: {
		position: "absolute",
		bottom: theme.spacing(2),
		right: theme.spacing(1),
		color: theme.palette.text.secondary
	}
}));

const Transaction = props => {
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

	return (
		<Paper className={classes.root}>
			<div className={classes.text}>
				<Typography variant="body1" className={classes.reason}>
					Paper can be used to build surface or other elements for
					your application.
				</Typography>
				<Typography variant="body1" className={classes.amount}>
					₹ 2,000 /-
				</Typography>
			</div>
			{props.tag && <Tag name={props.tag.name} color={props.tag.color} />}
			<Typography variant="body2" color="textSecondary" component="span">
				{toDateString(new Date())}
			</Typography>
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

export default Transaction;
