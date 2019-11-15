import React, { useState, Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";

import SignStatus from "../../config/sign";

import Context from "../App/context";

const useStyles = makeStyles(theme => ({
	Logo: {
		width: "100%",
		maxWidth: 400
	},
	Sign: {
		minHeight: "100vh",
		backgroundColor: theme.palette.primary.main
	},
	Container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		height: "100vh"
	},
	Paper: {
		padding: theme.spacing(3),
		position: "relative",
		width: "100%",
		maxWidth: 500,
		marginTop: theme.spacing(3)
	},
	SecondaryText: {
		marginTop: theme.spacing(1)
	},
	Buttons: {
		marginTop: theme.spacing(3),
		textAlign: "right"
	},
	SecondaryButton: {
		marginRight: theme.spacing(1)
	}
}));

const Sign = () => {
	const classes = useStyles();
	const context = useContext(Context);

	const [name, setName] = useState(null);
	const [title, setTitle] = useState(null);
	const [email, setEmail] = useState("siddhant@webfixerr.com");
	const [password, setPassword] = useState("B0rnG3nius");
	const [image, setImage] = useState(null);

	const [status, setStatus] = useState(SignStatus.LOGIN);

	const toggleStatus = () => {
		if (status !== SignStatus.LOGIN) setStatus(SignStatus.LOGIN);
		else setStatus(SignStatus.SIGNUP);
	};

	const handleSign = status => {
		context.openLoader();

		let url = "/v1/api/auth/login";
		let headers = {
			"Content-Type": "application/json"
		};
		const body = new FormData();
		body.append("email", email);
		body.append("password", password);

		const options = {
			method: "POST",
			headers
		};

		if (status === SignStatus.SIGNUP) {
			url = "/v1/api/auth/signup";

			body.append("name", name);
			body.append("title", title);
			body.append("image", image, image.name);

			delete options.headers;
			options.body = body;
		} else {
			options.body = JSON.stringify(Object.fromEntries(body));
		}

		console.log(...options.body);

		fetch("http://localhost:5000" + url, options)
			.then(raw => raw.json())
			.then(data => {
				console.log(data);
				context.closeLoader();

				if (data.error) {
					// handle error
					console.log(data.error);
				} else {
					context.login(data.payload.user, data.payload.token);
				}
			})
			.catch(e => console.log(e));
	};

	return (
		<div className={classes.Sign}>
			<Container maxWidth="sm" className={classes.Container}>
				<img
					className={classes.Logo}
					src={require("../../logo.svg")}
					alt="Chitragupta"
					style={{
						maxWidth: status === SignStatus.LOGIN ? 300 : 150
					}}
				/>
				<Paper className={classes.Paper}>
					<Typography variant="h4">{status.name}</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						className={classes.SecondaryText}
					>
						{status.tagline}
					</Typography>
					{status !== SignStatus.LOGIN && (
						<Fragment>
							<TextField
								id="user-image"
								label="Image"
								fullWidth
								type="file"
								margin="normal"
								helperText="Profile Image"
								onChange={e => setImage(e.target.files[0])}
							/>
							<TextField
								id="user-name"
								label="Name"
								fullWidth
								margin="normal"
								onChange={e => setName(e.target.value)}
							/>
							<TextField
								id="user-title"
								label="Title"
								fullWidth
								helperText="Eg: Full Stack Developer"
								margin="normal"
								onChange={e => setTitle(e.target.value)}
							/>
						</Fragment>
					)}
					<TextField
						id="user-email"
						label="Email"
						type="email"
						fullWidth
						margin="normal"
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						id="user-password"
						label="Password"
						type="password"
						fullWidth
						margin="normal"
						onChange={e => setPassword(e.target.value)}
					/>
					<div className={classes.Buttons}>
						<Button
							onClick={toggleStatus}
							className={classes.SecondaryButton}
							variant="outlined"
							color="primary"
						>
							{status.contrast}
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSign.bind(this, status)}
							endIcon={<Icon>send</Icon>}
						>
							{status.name}
						</Button>
					</div>
				</Paper>
			</Container>
		</div>
	);
};

export default Sign;
