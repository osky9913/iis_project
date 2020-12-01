import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import RegistrationForm from "./RegistrationForm";

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
  adminPage: {
    minWidth: "33%",
  },

  page: {
    height: "auto",
    padding: theme.spacing(3),
  },
  container: {
    margin: 4,
  },
}));

const RegistrationPage = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="md">
          <Paper className={classes.page}>
            <RegistrationForm />
          </Paper>
        </Container>
      </div>
    </main>
  );
};
export default RegistrationPage;
