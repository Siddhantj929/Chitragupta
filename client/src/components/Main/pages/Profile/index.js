import React, { useState, useContext, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../../Cockpit";
import Accordian from "../../../Accordian";
import TaskList from "../../../TaskList";
import TransactionList from "../../../TransactionList";
import InlineLoader from "../../../InlineLoader";

import { toINR } from "../../../../config/currency";
import bottomNavConfig from "../../../../config/bottomNav";

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

	const addTags = useCallback(
		data => (data.length !== 0 ? context.addTags(data) : null),
		[context]
	);

	const addAudit = useCallback(
		data => {
			setAudit(data);
			context.addAudit(data);
		},
		[context]
	);

	const addTransactions = useCallback(
		data => {
			if (data.length !== 0) {
				setTransactions(data.slice(3));
				context.updateTransactions(data);
			}
		},
		[context]
	);

	const fetchAudit = useCallback(async () => {
		const start = null;
		const end = null;

		const response = await fetch(`http://localhost:5000/v1/users/report`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${context.token}`,
				"Content-Type": "application/json",
				body: JSON.stringify({ start, end })
			}
		});

		const data = await response.json();
		console.log("report", data);

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			addAudit(data.payload);
		}
	}, [addAudit, context.token]);

	const fetchTags = useCallback(async () => {
		const response = await fetch(`http://localhost:5000/v1/api/tags`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${context.token}`
			}
		});

		const data = await response.json();
		console.log("tags", data);

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			addTags(data.payload);
		}
	}, [addTags, context.token]);

	const fetchTransactions = useCallback(async () => {
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
			addTransactions(data.payload);
		}
	}, [addTransactions, context.token]);

	useEffect(() => {
		if (!audit) fetchAudit();
		if (context.tags.length === 0) fetchTags();
		if (context.transactions.length === 0) fetchTransactions();
	}, [context, audit, fetchAudit, fetchTags, fetchTransactions]);

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
				<TaskList
					title="Active Tasks"
					addButtonHandler={e =>
						context.changeTab(e, bottomNavConfig.values.tasks)
					}
					items={tasks}
					showAddButton
				/>
			</div>
			<div className={classes.Section}>
				<TransactionList
					title="Latest Transactions"
					items={transactions}
					showAddButton
					addButtonHandler={e =>
						context.changeTab(
							e,
							bottomNavConfig.values.transactions
						)
					}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
