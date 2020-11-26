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
    height: "500px",
  },
}));

const Festival = () => {
  const classes = useStyles();
  const [festivalDialogData, setFestivalDialogData] = useState([] | undefined);
  const [
    festivalDialogDataListOfInterprets,
    setFestivalDialogDataListOfInterprets,
  ] = useState([]);

  useEffect(() => {
    api.getFestivalByID(festivalId).then((response) => {
      const data = response.data;
      setFestivalDialogData(data);
      setFestivalDialogDataListOfInterprets(data["festivalInterpret"]);
    });
  }, []);

  const { festivalId } = useParams();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="lg">
          <Paper className={classes.page}>
            <h1>{festivalDialogData["name"]}</h1>
            <FestivalPageContent
              festivalDialogDataListOfInterprets={
                festivalDialogDataListOfInterprets
              }
            />
          </Paper>
        </Container>
      </div>
    </main>
  );
};

export default Festival;
