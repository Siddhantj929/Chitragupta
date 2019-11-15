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
		flexShrink: 0,
		fontWeight: "bold"
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
		backgroundColor: "#f7f7f7",
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
		<ExpansionPanel {...props}>
			<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
				<Typography className={classes.heading}>
					{props.title}
				</Typography>
				<Typography className={classes.secondaryHeading}>
					{props.value}
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails className={classes.accordianSummary}>
				{props.items &&
					props.items.map(e => (
						<AccordianItem primary={e.title} secondary={e.value} />
					))}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

export default Accordian;
