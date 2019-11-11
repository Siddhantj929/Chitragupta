import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		position: "relative"
	},
	header: {
		display: "block",
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	},
	tagFields: {
		display: "flex",
		alignItems: "flex-end",
		marginTop: theme.spacing(2)
	},
	tagName: {
		marginRight: theme.spacing(1)
	},
	submitButton: {
		display: "block",
		marginLeft: "auto",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1)
	}
}));

const currencies = [
	{
		value: "USD",
		label: "$"
	},
	{
		value: "EUR",
		label: "€"
	},
	{
		value: "BTC",
		label: "฿"
	},
	{
		value: "JPY",
		label: "¥"
	},
	{
		value: "NEW",
		label: "Add new Tag"
	}
];

const TaskForm = () => {
	const classes = useStyles();
	const [currency, setCurrency] = React.useState("EUR");

	const handleChange = event => {
		setCurrency(event.target.value);
	};

	return (
		<Fragment>
			<Typography variant="button" className={classes.header}>
				Add Task
			</Typography>
			<Paper className={classes.root}>
				<TextField
					id="task-description"
					label="Description"
					multiline
					fullWidth
					margin="none"
				/>
				{currency !== "NEW" && (
					<TextField
						id="standard-select-currency"
						select
						fullWidth
						label="Select"
						value={currency}
						onChange={handleChange}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				)}
				{currency === "NEW" && (
					<div className={classes.tagFields}>
						<TextField
							id="tag-name"
							className={classes.tagName}
							label="Name"
							margin="none"
						/>
						<Input fullWidth type="color" label="Color" />
					</div>
				)}
				<Button
					variant="contained"
					color="primary"
					className={classes.submitButton}
				>
					Submit
				</Button>
			</Paper>
		</Fragment>
	);
};

export default TaskForm;
