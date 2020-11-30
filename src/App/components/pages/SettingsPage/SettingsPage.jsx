import React, { useContext } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  adminPage: {
    textAlign: "center",
    width: "100%",
  },
}));

const SettingsPage = () => {
  const { user } = useContext(UserContext);

  const classes = useStyles();
  if (user["user"]) {
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

          </Grid>
        </div>
      </main>
    );
  } else {
    return <CircularProgress />;
  }
};

export default SettingsPage;
