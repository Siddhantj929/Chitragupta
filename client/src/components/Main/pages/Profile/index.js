import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../../Cockpit";
import Accordian from "../../../Accordian";
import TaskList from "../../../TaskList";
import TransactionList from "../../../TransactionList";
import InlineLoader from "../../../InlineLoader";

import { toINR } from "../../../../config/currency";

import Context from "../../../App/context";

const useStyles = makeStyles({
	ProfilePage: {
		paddingTop: 8,
		paddingBottom: 40
	},
	Section: {
		margin: "32px 0"
	}
});

const ProfilePage = () => {
	const classes = useStyles();
	const context = useContext(Context);

	const tasks = context.user.notes.active;

	const [audit, setAudit] = useState(context.audit);
	const [transactions, setTransactions] = useState(
		context.transactions.slice(3)
	);

	const addAudit = data => {
		setAudit(data);
		context.addAudit(data);
	};

	const addTransactions = data => {
		setTransactions(data.slice(3));
		context.updateTransactions(data);
	};

	const fetchAudit = async () => {
		const month = new Date().getMonth();
		const year = new Date().getFullYear();

		const response = await fetch(
			`http://localhost:5000/v1/api/audit/${month}/${year}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${context.token}`
				}
			}
		);

		const data = await response.json();
		console.log("audit", data);

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			addAudit(data.payload);
		}
	};

	const fetchTransactions = async () => {
		const response = await fetch(
			`http://localhost:5000/v1/api/transactions`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${context.token}`
				}
			}
		);

		const data = await response.json();

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			addTransactions(data);
		}
	};

	if (!audit) fetchAudit();
	if (!transactions) fetchTransactions();

	return (
		<div className={classes.ProfilePage}>
			<Cockpit />
			<div className={classes.Section}>
				{context.user && (
					<Accordian
						title="Current Balance"
						value={toINR(context.user.balance.current)}
						items={[
							{
								title: "Earnings",
								value: toINR(context.user.balance.earnings)
							},
							{
								title: "Expenses",
								value: toINR(context.user.balance.expenses)
							}
						]}
					/>
				)}
				{!audit && <InlineLoader />}
				{audit && audit.notes && context.user && (
					<Accordian
						title="Tasks Completed"
						value={context.user.notes.completed}
						items={Object.keys(audit.notes).map(k => ({
							title: k,
							value: audit.notes[k]
						}))}
					/>
				)}
			</div>
			<div className={classes.Section}>
				<TaskList title="Active Tasks" items={tasks} showAddButton />
			</div>
			<div className={classes.Section}>
				<TransactionList
					title="Latest Transactions"
					items={transactions}
					showAddButton
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
