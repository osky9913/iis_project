import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {api} from "../../../../../api/api";
import InterpretPageContents from "./InterpretPageContents";

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
        height: "auto",
        padding: theme.spacing(3),
    },
}));

const Interpret = () => {
    const classes = useStyles();
    const [interpretData, setInterpretData] = useState([] | undefined);
    const [
        interpretDataListOfMembers,
        setInterpretDataListOfMembers,
    ] = useState([]);
    const [
        interpretDataListOfFestivals,
        setInterpretDataListOfFestivals,
    ] = useState([]);
    const [
        interpretDataListOfStages,
        setInterpretDataListOfStages,
    ] = useState([]);

    useEffect(() => {
        api.getInterpretByID(interpretId).then((response) => {
            const data = response.data;
            setInterpretData(data);
            setInterpretDataListOfMembers(data["memberList"])
            setInterpretDataListOfFestivals(data["festivalInterpret"])
            setInterpretDataListOfStages(data["stageInterpret"])
        });
    }, []);

    const {interpretId} = useParams();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div style={{padding: "20px"}}>
                <Container maxWidth="md">
                    <Paper className={classes.page}>
                        <InterpretPageContents interpretData={interpretData}
                        interpretDataListOfMembers={interpretDataListOfMembers}
                        interpretDataListOfFestivals={interpretDataListOfFestivals}
                        interpretDataListOfStages={interpretDataListOfStages}/>
                    </Paper>
                </Container>
            </div>
        </main>
    );
};

export default Interpret;