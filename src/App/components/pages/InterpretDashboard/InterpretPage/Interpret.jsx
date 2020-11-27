import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import InterpretPageContent from "./InterpretPageContent";
import Paper from "@material-ui/core/Paper";
import {api} from "../../../../../api/api";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    page: {
        height: "500px",
    },
}));

const Interpret = () => {
    const classes = useStyles();
    const [interpretDialogData, setInterpretDialogData] = useState([] | undefined);

    useEffect(() => {
        api.getInterpretByID(interpretId).then((response) => {
            const data = response.data;
            setInterpretDialogData(data);
        });
    }, []);

    const {interpretId} = useParams();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div style={{padding: "20px"}}>
                <Container maxWidth="lg">
                    <Paper className={classes.page}>
                        <h1>{interpretDialogData["name"]}</h1>
                        <InterpretPageContent/>
                    </Paper>
                </Container>
            </div>
        </main>
    );
};

export default Interpret;