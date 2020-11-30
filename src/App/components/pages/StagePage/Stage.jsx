import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {api} from "../../../../api/api";
import StagePageContent from "./StagePageContent";

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
    container: {
        margin: 4,
    },
}));

const Stage = () => {
    const classes = useStyles();
    const [stageData, setInterpretData] = useState([] | undefined);
    const {someId, stageId} = useParams()
    const [
        stageDataListOfInterprets,
        setStageDataListOfInterprets,
    ] = useState([]);

    useEffect(() => {
        api.getStageByID(stageId).then((response) => {
            const data = response.data;
            setInterpretData(data);
            setStageDataListOfInterprets(data["stageInterpret"])
        });
    }, []);

    console.log(someId)

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div style={{padding: "20px"}}>
                <Container maxWidth="md">
                    <Paper className={classes.page}>
                        <StagePageContent stageData={stageData}
                                          stageDataListOfInterprets={stageDataListOfInterprets}/>
                    </Paper>
                </Container>
            </div>
        </main>
    );
};

export default Stage;