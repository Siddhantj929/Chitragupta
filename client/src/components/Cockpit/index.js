import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
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
		right: 0
	}
});

const Cockpit = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.Cockpit}>
			<Avatar
				src="http://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png"
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
				id="user-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Icon fontSize="small">edit</Icon>
					</ListItemIcon>
					<ListItemText primary="Profile" />
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Icon fontSize="small">exit_to_app</Icon>
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</MenuItem>
			</Menu>
		</div>
	);
};

export default Cockpit;
