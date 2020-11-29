import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import UsersSettings from "./UsersSettings/UsersSettings";

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

const SettingsPage = () => {
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
            <Paper>
              <ProfileSettings />
            </Paper>
          </Grid>

          <Grid item>
            <Paper>
              <UsersSettings />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default SettingsPage;
