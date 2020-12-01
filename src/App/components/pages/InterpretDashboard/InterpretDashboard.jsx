import React, {useContext, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {api} from "../../../../api/api";
import InterpretCard from "./InterpretCard/InterpretCard";
import InterpretCardAdd from "./InterpretCard/InterpretCardAdd";
import UserContext from "../../../../context/UserContext";
import {fade} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

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
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        marginBottom: theme.spacing(4),
        maxWidth: 380,
        margin: "auto",

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const InterpretDashboard = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [filtered, setFiltered] = useState("");
    const [interprets, setInterprets] = useState([]);

    useEffect(() => {
        api.getInterpret().then((response) => setInterprets(response));
    }, []);

    const handleChange = (event) => {
        setFiltered(event.target.value);
    };

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div style={{padding: "20px"}}>
                <div className={classes.search}>
                    <Box className={classes.searchIcon}>
                        <SearchIcon />
                    </Box>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={handleChange}
                    />
                </div>
                <Container maxWidth="lg">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        {interprets.map((interpret, index) => {
                            const ques = interpret["name"].toLowerCase().includes(filtered.toLowerCase());
                            if (ques) {
                                return (
                                    <Grid item key={index}>
                                        <InterpretCard interpret={interpret} />
                                    </Grid>
                                );
                            } else {
                                return "";
                            }
                        })}
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
