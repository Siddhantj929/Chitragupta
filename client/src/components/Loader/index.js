import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		paddingBottom: theme.spacing(2)
	},
	text: {
		marginLeft: theme.spacing(2)
	}
}));

const Loader = props => {
	const classes = useStyles();
	const { closeLoader, open } = props;

	return (
		<Dialog onClose={closeLoader} open={open} fullWidth maxWidth="xs">
			<DialogTitle>Loading</DialogTitle>
			<DialogContent>
				<div className={classes.root}>
					<CircularProgress />
					<Typography className={classes.text}>
						Please Wait...
					</Typography>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Loader;
