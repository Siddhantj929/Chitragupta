import React, { useEffect, useCallback, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cockpit from "../../../Cockpit";
import Accordian from "../../../Accordian";
import TaskList from "../../../TaskList";
import TransactionList from "../../../TransactionList";

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

	// expenses < 0
	const balance = context.report
		? {
				current:
					context.report.expenses.total +
					context.report.earnings.total,
				items: {
					Earnings: context.report.earnings.total,
					Expenses: context.report.expenses.total
				}
		  }
		: null;

	return (
		<div className={classes.ProfilePage}>
			<Cockpit user={context.user} />
			<div className={classes.Section}>
				{balance && context.report && (
					<Fragment>
						<Accordian
							isCurrency
							title="Current Balance"
							value={balance.current}
							items={balance.items}
						/>
						<Accordian
							title="Tasks Completed"
							value={context.report.tasksCompleted.total}
							items={context.report.tasksCompleted.report}
						/>
					</Fragment>
				)}
			</div>
			<div className={classes.Section}>
				<TaskList title="Active Tasks" showAddButton />
			</div>
			<div className={classes.Section}>
				<TransactionList title="Latest Transactions" showAddButton />
			</div>
		</div>
	);
};

export default ProfilePage;
