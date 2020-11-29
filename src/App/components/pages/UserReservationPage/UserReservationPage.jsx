import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(6,2,2,11),
    },
}));

export default function StickyHeadTable() {
    const classes = useStyles();

    return (
        <div style={{ maxWidth: '100%' }}>
            <p className={classes.root}>kek</p>
        </div>
    );
}