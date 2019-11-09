import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "66.66%",
		color: theme.palette.text.secondary,
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		textAlign: "right",
		flexGrow: 1
	},
	accordianSummary: {
		flexDirection: "column"
	},
	accordianItem: {
		backgroundColor: theme.palette.background.default,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1),
		marginTop: theme.spacing(0.5),
		width: "100%",
		display: "flex",
		"&:nth-child(1)": {
			marginTop: 0
		}
	}
}));

const AccordianItem = props => {
	const classes = useStyles();

	return (
		<div className={classes.accordianItem}>
			<Typography className={classes.heading}>{props.primary}</Typography>
			<Typography className={classes.secondaryHeading}>
				{props.secondary}
			</Typography>
		</div>
	);
};

const Accordian = props => {
	const classes = useStyles();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
				<Typography className={classes.heading}>
					Current Balance
				</Typography>
				<Typography className={classes.secondaryHeading}>
					₹ 10,000 /-
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails className={classes.accordianSummary}>
				<AccordianItem primary="Current Balance" secondary="10 Notes" />
				<AccordianItem primary="Current Balance" secondary="10 Notes" />
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

export default Accordian;
