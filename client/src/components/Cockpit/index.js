import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "../Menu";

const useStyles = makeStyles(theme => ({
	Cockpit: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: "16px 0",
		position: "relative"
	},
	bigAvatar: {
		width: 80,
		height: 80,
		marginTop: -8
	},
	button: {
		marginLeft: -8
	},
	userInfo: {
		marginLeft: 16
	},
	menuIcon: {
		position: "absolute",
		top: 4,
		color: theme.palette.text.secondary,
		right: 0
	}
}));

const Cockpit = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const menuItems = [
		{
			icon: <Icon fontSize="small">edit</Icon>,
			text: "Edit Profile"
		},
		{
			icon: <Icon fontSize="small">exit_to_app</Icon>,
			text: "Logout"
		}
	];

	return (
		<div className={classes.Cockpit}>
			<Avatar
				src="https://i.imgur.com/ADAlTe2.jpg"
				className={classes.bigAvatar}
			/>
			<div className={classes.userInfo}>
				<Typography variant="h6">Siddhant Jain</Typography>
				<Typography variant="body2" color="textSecondary">
					Full Stack Developer
				</Typography>
				<Button color="primary" className={classes.button}>
					edit profile
				</Button>
			</div>
			<Icon
				className={classes.menuIcon}
				aria-controls="user-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				more_vert
			</Icon>
			<Menu
				anchor={anchorEl}
				handleClose={handleClose}
				items={menuItems}
			/>
		</div>
	);
};

export default Cockpit;
