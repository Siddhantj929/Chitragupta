import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Accordian from "../../../Accordian";
import Placeholder from "../../../Placeholder";

import Context from "../../../App/context";

const useStyles = makeStyles(theme => ({
	RecordsPage: {
		paddingTop: 0,
		paddingBottom: theme.spacing(5)
	},
	Section: {
		margin: theme.spacing(4, 0)
	},
	heading: {
		marginBottom: theme.spacing(1)
	},
	monthString: {
		display: "flex",
		alignItems: "flex-end"
	},
	monthSelect: {
		marginLeft: theme.spacing(1)
	}
}));

const months = [
	{
		value: 0,
		label: "January"
	},
	{
		value: 1,
		label: "Feburary"
	},
	{
		value: 2,
		label: "March"
	},
	{
		value: 3,
		label: "April"
	},
	{
		value: 4,
		label: "May"
	},
	{
		value: 5,
		label: "June"
	},
	{
		value: 6,
		label: "July"
	},
	{
		value: 7,
		label: "August"
	},
	{
		value: 8,
		label: "September"
	},
	{
		value: 9,
		label: "October"
	},
	{
		value: 10,
		label: "November"
	},
	{
		value: 11,
		label: "December"
	}
];

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

const RecordsPage = () => {
	const current = new Date();
	const classes = useStyles();
	const { user, audit } = useContext(Context);

	// Data
	let earnings,
		expenses,
		tasksCompleted = null;

	if (audit.earnings) earnings = objectToAccordianItems(audit.earnings);
	if (audit.expenses) expenses = objectToAccordianItems(audit.expenses);
	if (audit.tasks) tasksCompleted = objectToAccordianItems(audit.tasks);

	// Month
	const [month, setMonth] = React.useState(current.getMonth());

	const handleChange = event => {
		setMonth(event.target.value);
	};

	return (
		<div className={classes.RecordsPage}>
			<div className={classes.Section}>
				<Typography variant="body1" className={classes.monthString}>
					Showing results for
					<TextField
						id="standard-select-currency"
						select
						className={classes.monthSelect}
						value={month}
						onChange={handleChange}
						margin="none"
					>
						{months.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Typography>
			</div>
			<div className={classes.Section}>
				<Typography variant="h4" className={classes.heading}>
					1 Nov - 4 Nov, 2019
				</Typography>
				<Typography variant="body1" color="textSecondary">
					The results will be updated as you add more data.
				</Typography>
			</div>
			<div className={classes.Section}>
				{!earnings && <Placeholder text="No Earnings Found" />}
				{!expenses && <Placeholder text="No Expenses Found" />}
				{!tasksCompleted && <Placeholder text="No Tasks Completed" />}
				{earnings && (
					<Accordian
						expanded
						title="Earnings"
						value={user.balance.earnings}
						items={earnings}
					/>
				)}
				{expenses && (
					<Accordian
						expanded
						title="Expenses"
						value={user.balance.expenses}
						items={expenses}
					/>
				)}
				{tasksCompleted && (
					<Accordian
						expanded
						title="Tasks Completed"
						value={user.notes.completed}
						items={tasksCompleted}
					/>
				)}
			</div>
		</div>
	);
};

export default RecordsPage;
