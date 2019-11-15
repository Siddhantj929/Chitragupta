import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
		borderRadius: theme.shape.borderRadius,
		background: "#efefef",
		width: "100%",
		"&:hover": {
			cursor: "pointer"
		}
	},
	icon: {
		display: "block",
		fontSize: "3rem",
		marginBottom: theme.spacing(1)
	}
}));

const Placeholder = props => {
	const classes = useStyles();

	const { name, handler } = props;

	return (
		<div className={classes.root} onClick={handler}>
			<Icon className={classes.icon}>note_add</Icon>
			Add new {name}
		</div>
	);
};

export default Placeholder;
