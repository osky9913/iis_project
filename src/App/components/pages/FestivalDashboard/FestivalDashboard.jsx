import React, { useContext, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FestivalCard from "./FestivalCard/FestivalCard";
import UserContext from "../../../../context/UserContext";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { api } from "../../../../api/api";

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

export const FestivalDashboard = () => {
  const classes = useStyles();
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    api.getFestival().then((response) => setFestivals(response));
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {festivals.map((festival, index) => (
              <Grid item key={index}>
                <FestivalCard festival={festival} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
};