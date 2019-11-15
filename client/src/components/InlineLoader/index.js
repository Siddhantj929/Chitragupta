import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0),
        borderRadius: theme.shape.borderRadius,
        background: '#efefef',
        width: "100%"
    }
}));

const InlineLoader = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={24} thickness={3} />
        </div>
    )
}

export default InlineLoader
