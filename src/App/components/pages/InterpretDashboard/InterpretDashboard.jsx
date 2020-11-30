import React, {useContext, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {api} from "../../../../api/api";
import InterpretCard from "./InterpretCard/InterpretCard";
import InterpretCardAdd from "./InterpretCard/InterpretCardAdd";
import UserContext from "../../../../context/UserContext";

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
}));

export const InterpretDashboard = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);

    const [interprets, setInterprets] = useState([]);

    useEffect(() => {
        api.getInterpret().then((response) => setInterprets(response));
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div style={{padding: "20px"}}>
                <Container maxWidth="lg">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        {interprets.map((interpret, index) => (
                            <Grid item key={index}>
                                <InterpretCard interpret={interpret}/>
                            </Grid>
                        ))}
                        {user["user"] ? (
                            <div>
                                {user["user"]["role"] === 0 || user["user"]["role"] === 1 ? (
                                    <Grid item>
                                        <InterpretCardAdd />
                                    </Grid>
                                ) : null}
                            </div>
                        ) : null}
                    </Grid>
                </Container>
            </div>
        </main>
    );
};
