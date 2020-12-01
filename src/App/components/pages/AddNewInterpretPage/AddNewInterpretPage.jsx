import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddNewInterpretForm from "./AddNewInterpretForm";

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
}));

const AddNewInterpretPage = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={4}>
            <Paper style={{ width: "1000px" }}>
              <AddNewInterpretForm />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default AddNewInterpretPage;
/*


 */
