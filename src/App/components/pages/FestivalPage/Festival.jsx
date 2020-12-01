import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useParams } from "react-router-dom";
import FestivalPageContent from "./FestivalPageContent";
import Paper from "@material-ui/core/Paper";
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
  page: {
    height: "auto",
    padding: theme.spacing(3),
  },
  container: {
    margin: 4,
  },
}));

const Festival = () => {
  const classes = useStyles();
  const [festivalData, setFestivalData] = useState([] | undefined);
  const [
    festivalDataListOfInterprets,
    setFestivalDataListOfInterprets,
  ] = useState([]);
  const [festivalDataListOfStages, setFestivalDataListOfStages] = useState([]);

  const { festivalId } = useParams();

  useEffect(() => {
    api.getFestivalByID(festivalId).then((response) => {
      const data = response.data;
      setFestivalData(data);
      setFestivalDataListOfInterprets(data["festivalInterpret"]);
      setFestivalDataListOfStages(data["stageList"]);
    });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="md">
          <Paper className={classes.page}>
            <FestivalPageContent
              festivalDataListOfInterprets={festivalDataListOfInterprets}
              festivalDataListOfStages={festivalDataListOfStages}
              festivalData={festivalData}
            />
          </Paper>
        </Container>
      </div>
    </main>
  );
};

export default Festival;
