import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(16, 0, 8),
        height: "100%",
        marginTop: 180,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export default function Album() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Festival IS
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Informační systém pro rezervaci vstupenek na hudební festivaly obsahující koncerty vybraných kapel.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={() =>  history.push("/festivals") }>
                                Prehliadať festivaly
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined"
                                    color="primary"
                                    onClick={() =>  history.push("/interprets") }>
                                Prehliadať interpretov
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}