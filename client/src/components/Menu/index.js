import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import blue from "@material-ui/core/colors/blue";

const StyledMenu = props => (
	<Menu elevation={2} getContentAnchorEl={null} {...props} />
);

const StyledMenuItem = withStyles(theme => ({
	root: {
		"&:focus": {
			backgroundColor: blue["50"],
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.primary.dark
			}
		},
		"& .MuiListItemIcon-root": {
			minWidth: theme.spacing(4)
		},
		"& .MuiListItemText-root": {
			marginTop: 6
		}
	}
}))(MenuItem);

const CustomizedMenu = props => {
	const { anchor, handleClose, items } = props;

	return (
		<StyledMenu
			id="customized-menu"
			anchorEl={anchor}
			keepMounted
			open={Boolean(anchor)}
			onClose={handleClose}
		>
			{items.map((e, i) => (
				<StyledMenuItem key={i} onClick={e.handler}>
					{e.icon && <ListItemIcon>{e.icon}</ListItemIcon>}
					<ListItemText primary={e.text} />
				</StyledMenuItem>
			))}
		</StyledMenu>
	);
};

export default CustomizedMenu;
