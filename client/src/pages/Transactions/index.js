import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Accordian from "../../components/Accordian";
import TransactionForm from "../../components/TransactionForm";
import TransactionList from "../../components/TransactionList";

const useStyles = makeStyles({
	TransactionPage: {
		paddingTop: 8,
		paddingBottom: 16
	},
	Section: {
		margin: "32px 0"
	},
	Accordian: {
		marginTop: 16
	}
});

const TransactionPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.TransactionPage}>
			<div className={classes.Accordian}>
				<Accordian expanded />
			</div>
			<div className={classes.Section}>
				<TransactionForm />
			</div>
			<div className={classes.Section}>
				<TransactionList title="All Transactions" />
			</div>
		</div>
	);
};

export default TransactionPage;
