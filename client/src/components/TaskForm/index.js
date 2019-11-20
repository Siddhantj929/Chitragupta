import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Context from "../App/context";

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

const TaskForm = () => {
	const classes = useStyles();
	const context = useContext(Context);

	const tags = [...context.tags, { _id: -1, name: "Add new Tag" }];

	const [description, setDescription] = React.useState(null);
	const [tagName, setTagName] = React.useState(null);
	const [tagColor, setTagColor] = React.useState("#000000");

	const [tag, setTag] = React.useState(tags[0]._id);

	const handleChange = event => {
		setTag(event.target.value);
	};

	const handleDescChange = e => setDescription(e.target.value);
	const handleNameChange = e => setTagName(e.target.value);
	const handleColorChange = e => setTagColor(e.target.value);

	const submit = async () => {
		context.openLoader();
		const response = await fetch(`http://localhost:5000/v1/api/notes`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${context.token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				description,
				tag: {
					name: tagName,
					color: tagColor
				}
			})
		});

		const data = await response.json();
		console.log("task", data);

		if (data.error) {
			// handle error
			console.log(data.error);
		} else {
			context.closeLoader();
			context.addTasks([data.payload.note]);
			context.updateQueue(data.payload.queue);
		}
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
					onChange={handleDescChange}
				/>
				{tag !== -1 && (
					<TextField
						id="standard-select-tag"
						select
						fullWidth
						label="Select"
						value={tag}
						onChange={handleChange}
						helperText="Please select your tag"
						margin="normal"
					>
						{tags.map(option => (
							<MenuItem key={option._id} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				)}
				{tag === -1 && (
					<div className={classes.tagFields}>
						<TextField
							id="tag-name"
							className={classes.tagName}
							label="Tag Name"
							margin="none"
							onChange={handleNameChange}
						/>
						<TextField
							fullWidth
							type="color"
							label="Tag Color"
							margin="none"
							value={tagColor}
							onChange={handleColorChange}
						/>
					</div>
				)}
				<Button
					variant="contained"
					color="primary"
					className={classes.submitButton}
					onClick={submit}
				>
					Submit
				</Button>
			</Paper>
		</Fragment>
	);
};

export default TaskForm;
