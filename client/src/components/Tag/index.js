import React from "react";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core/styles";

const Tag = props => {
	const theme = useTheme();

	return (
		<Chip
			label={props.name}
			size="small"
			icon={props.icon}
			style={{
				background: props.color,
				color: theme.palette.getContrastText(props.color),
				marginRight: theme.spacing(1),
				fontSize: theme.typography.caption.fontSize,
				height: "auto",
				fontWeight: "bold"
			}}
		/>
	);
};

export default Tag;
