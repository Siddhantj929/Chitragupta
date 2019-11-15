import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Accordian from "../../../Accordian";
import TransactionForm from "../../../TransactionForm";
import TransactionList from "../../../TransactionList";

import Context from "../../../App/context";

const useStyles = makeStyles({
	TransactionPage: {
		paddingTop: 8,
		paddingBottom: 40
	},
	Section: {
		margin: "32px 0"
	},
	Accordian: {
		marginTop: 16
	}
});

const objectToAccordianItems = obj => {
	const rv = [];

	Object.keys(obj).forEach(key => {
		rv.push({
			title: key,
			value: obj[key]
		});
	});

	return rv.length === 0 ? null : rv;
};

const TransactionPage = () => {
	const classes = useStyles();
	const { user, audit } = useContext(Context);

	let expenses = null;

	if (audit.expenses) expenses = objectToAccordianItems(audit.expenses);

	return (
		<div className={classes.TransactionPage}>
			<div className={classes.Accordian}>
				{expenses && (
					<Accordian
						expanded
						title="Expenses"
						value={user.balance.expenses}
						items={expenses}
					/>
				)}
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
