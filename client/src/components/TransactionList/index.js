import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Transaction from "../Transaction";
import Placeholder from "../Placeholder";

const useStyles = makeStyles(theme => ({
	ListHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	}
}));

const TransactionList = props => {
	const classes = useStyles();
	const theme = useTheme();

	const { title, showAddButton } = props;

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};

	return (
		<div className="TransactionList">
			<div className={classes.ListHeader}>
				<Typography variant="button">{title}</Typography>
				{showAddButton && <Button color="primary">Add New</Button>}
			</div>
			{props.items &&
				props.items.map((e, i) => (
					<div
						className="animated fadeInUp fast"
						style={{
							animationDelay: `${i * transitionDuration.exit}ms`
						}}
					>
						<Transaction tag={e.tag} />
					</div>
				))}
			{!props.items || props.items.length === 0 ? (
				<Placeholder name="Task" handler={null} />
			) : null}
		</div>
	);
};

export default TransactionList;
