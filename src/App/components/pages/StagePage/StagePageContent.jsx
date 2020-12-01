import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Button from "@material-ui/core/Button";
import UserContext from "../../../../context/UserContext";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  form: {
    display: "block",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 100,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    height: 200,
  },
  buttons: {
    marginTop: 20,
    textAlign: "center",
    bottom: 0,
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 17,
  },
}));

const StagePageContent = (props) => {
  const stageData = props.stageData;
  const stageDataListOfInterprets = props.stageDataListOfInterprets;
  const classes = useStyles();
  let history = useHistory();
  const { user } = useContext(UserContext);

  if (stageData) {
    return (
      <div className={classes.root}>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              history.goBack();
            }}
            style={{ marginRight: 10 }}
          >
            Späť
          </Button>
          {user["user"] ? (
            <div>
              {user["user"]["role"] === 0 || user["user"]["role"] === 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log("fuckYOu");
                  }}
                >
                  Editovať
                </Button>
              ) : null}
            </div>
          ) : null}
          <h1 style={{ textAlign: "center" }}>{stageData["name"]}</h1>
        </div>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" className={classes.link}>
            <MusicNoteIcon className={classes.icon} />
            {stageData["festival"]["name"] + " festival"}
          </Link>
          <Link color="inherit" className={classes.link}>
            <PlaceIcon className={classes.icon} />
            {stageData["festival"]["city"] +
              ", " +
              stageData["festival"]["country"]}
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <PeopleIcon className={classes.icon} />
            Kapacita {stageData["capacity"]} ľudí
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="body2"
          align={"justify"}
          paragraph={true}
          gutterBottom={true}
        ></Typography>
        <Divider variant={"middle"} />
        <List dense={true}>
          <Typography variant="h6">
            Zoznam vystúpení
            {user["user"] ? (
              <div>
                {user["user"]["role"] === 0 || user["user"]["role"] === 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      history.push(
                        "/edit-stage-performance-list-" + stageData["id"]
                      );
                    }}
                  >
                    Editovať
                  </Button>
                ) : null}
              </div>
            ) : null}
            {stageDataListOfInterprets.map((interpret, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar
                    onClick={() =>
                      history.push("/interpret-" + interpret["interpretId"])
                    }
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={interpret["interpret"]["logoUri"]}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      interpret["interpret"]["name"] +
                      " (" +
                      interpret["concertStart"] +
                      "<->" +
                      interpret["concertEnd"] +
                      ")"
                    }
                    secondary={
                      "Rating: " +
                      interpret["interpret"]["rating"] +
                      ", Genre: " +
                      interpret["interpret"]["genre"]
                    }
                    onClick={() =>
                      history.push("/interpret-" + interpret["interpretId"])
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        history.push("/interpret-" + interpret["interpretId"])
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </Typography>
        </List>
      </div>
    );
  } else {
    return <CircularProgress style={{ marginLeft: "47%" }} />;
  }
};

export default StagePageContent;
