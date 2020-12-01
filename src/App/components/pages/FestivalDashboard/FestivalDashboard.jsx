import React, { useContext, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FestivalCard from "./FestivalCard/FestivalCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { api } from "../../../../api/api";
import FestivalCardAdd from "./FestivalCard/FestivalCardAdd";
import UserContext from "../../../../context/UserContext";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { fade } from "@material-ui/core";

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

export const FestivalDashboard = () => {
  const classes = useStyles();
  const [festivals, setFestivals] = useState([]);
  const [filtered, setFiltered] = useState("");
  const { user } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    api.getFestival().then((response) => setFestivals(response));
  }, []);

  const handleChange = (event) => {
    setFiltered(event.target.value);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
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
            {festivals.map((festival, index) => {
              const ques = festival["name"].toLowerCase().includes(filtered.toLowerCase());
              if (ques) {
                return (
                    <Grid item key={index}>
                      <FestivalCard festival={festival} />
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
                    <FestivalCardAdd />
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
