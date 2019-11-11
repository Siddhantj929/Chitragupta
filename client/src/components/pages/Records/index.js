import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Accordian from "../../Accordian";

const useStyles = makeStyles(theme => ({
	RecordsPage: {
		paddingTop: 0,
		paddingBottom: theme.spacing(2)
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
		value: "JAN",
		label: "January"
	},
	{
		value: "FEB",
		label: "Feburary"
	},
	{
		value: "MAR",
		label: "March"
	},
	{
		value: "APR",
		label: "April"
	},
	{
		value: "MAY",
		label: "May"
	},
	{
		value: "JUN",
		label: "June"
	},
	{
		value: "JUL",
		label: "July"
	},
	{
		value: "AUG",
		label: "August"
	},
	{
		value: "SEP",
		label: "September"
	},
	{
		value: "OCT",
		label: "October"
	},
	{
		value: "NOV",
		label: "November"
	},
	{
		value: "DEC",
		label: "December"
	}
];

const RecordsPage = () => {
	const classes = useStyles();
	const [month, setMonth] = React.useState("NOV");

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
				<Accordian expanded />
				<Accordian expanded />
				<Accordian expanded />
			</div>
		</div>
	);
};

export default RecordsPage;
