import React, { useState, Fragment, useContext, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";

import SignStatus from "../../config/sign";

import Context from "../App/context";

import testUser from "../../test/user";

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

	const imageRef = createRef();
	const nameRef = createRef();
	const titleRef = createRef();
	const emailRef = createRef();
	const passwordRef = createRef();

	const [status, setStatus] = useState(SignStatus.LOGIN);

	const toggleStatus = () => {
		if (status !== SignStatus.LOGIN) setStatus(SignStatus.LOGIN);
		else setStatus(SignStatus.SIGNUP);
	};

	const handleSign = status => {
		let url = "/api/v1/users/login";
		let contentType = "application/json";
		const body = {
			email: emailRef.current.value,
			password: passwordRef.current.value
		};

		if (status === SignStatus.SIGNUP) {
			url = "/api/v1/users/signup";
			contentType = "multipart/form-data";
			body.image = imageRef.current.value;
			body.name = nameRef.current.value;
			body.title = titleRef.current.value;
		}

		// fetch(url, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": contentType
		// 	},
		// 	body: JSON.stringify(body)
		// })
		// 	.then(raw => raw.json())
		// 	.then(data => {
		// 		if (data.error) {
		// 			// handle error
		// 		} else {
		// 			context.login(data.payload.user, data.payload.token);
		// 		}
		// 	})
		// 	.catch(e => console.log(e));
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
								ref={imageRef}
							/>
							<TextField
								id="user-name"
								label="Name"
								fullWidth
								margin="normal"
								ref={nameRef}
							/>
							<TextField
								id="user-title"
								label="Title"
								fullWidth
								helperText="Eg: Full Stack Developer"
								margin="normal"
								ref={titleRef}
							/>
						</Fragment>
					)}
					<TextField
						id="user-email"
						label="Email"
						type="email"
						fullWidth
						margin="normal"
						ref={emailRef}
					/>
					<TextField
						id="user-password"
						label="Password"
						type="password"
						fullWidth
						margin="normal"
						ref={passwordRef}
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
