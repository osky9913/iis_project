import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import GradeIcon from "@material-ui/icons/Grade";
import Button from "@material-ui/core/Button";
import UserContext from "../../../../../context/UserContext";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: "flex",
  },
  breadcrumbs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 17,
  },
}));

const InterpretPageContents = (props) => {
  const interpretData = props.interpretData;
  const classes = useStyles();
  const interpretDataListOfMembers = props.interpretDataListOfMembers;
  const interpretDataListOfFestivals = props.interpretDataListOfFestivals;
  const interpretDataListOfStages = props.interpretDataListOfStages;
  let history = useHistory();
  const { user } = useContext(UserContext);

    const genre = {
        0: "Rock",
        1: "Pop",
        2: "Metal",
        3: "HipHop",
        4: "Emd",
        5: "Chill",
    };

  if (interpretData) {
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
          <h1 style={{ textAlign: "center" }}>{interpretData["name"]}</h1>
        </div>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link
            color="inherit"
            onClick={() => console.log("FirstInterprepBreadcrumbButt")}
            className={classes.link}
          >
            <PeopleIcon className={classes.icon} />
            {genre[interpretData["genre"]]}
          </Link>
          <Link
            color="inherit"
            onClick={() => console.log("SecondInterprepBreadcrumbButt")}
            className={classes.link}
          >
            <GradeIcon className={classes.icon} />
            {interpretData["rating"]}
          </Link>
        </Breadcrumbs>
        <Typography
          variant="body2"
          align={"justify"}
          paragraph={true}
          gutterBottom={true}
          style={{textAlign: "center"}}
        >
            {interpretData["description"]}
        </Typography>
        <Divider variant={"middle"} />
        <List dense={true}>
          <Typography variant="h6">
            Členovia
            {interpretDataListOfMembers.map((member, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member["name"] + " " + member["surname"]}
                  />
                </ListItem>
              );
            })}
          </Typography>
        </List>
        <List dense={true}>
          <Typography variant="h6">
            Festivaly
            {interpretDataListOfFestivals.map((festivals, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar
                    onClick={() =>
                      history.push("/festival-" + festivals["festival"]["id"])
                    }
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={festivals["festival"]["logoUri"]}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={festivals["festival"]["name"] + " festival"}
                    secondary={
                      festivals["festival"]["country"] +
                      ", " +
                      festivals["festival"]["city"]
                    }
                    onClick={() =>
                        history.push("/festival-" + festivals["festival"]["id"])
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        history.push("/festival-" + festivals["festival"]["id"])
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
        <List dense={true}>
          <Typography variant="h6">
            Vystúpenia
            {interpretDataListOfStages.map((stage, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar
                    onClick={() =>
                      history.push(
                        "/stage-" + interpretData["id"] + "/" + stage["stageId"]
                      )
                    }
                  >
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={stage["stage"]["name"]}
                    secondary={
                      stage["stage"]["festivalName"] +
                      " festival, " +
                      "Kapacita: " +
                      stage["stage"]["capacity"] +
                      " , Začiatok: " +
                      stage["concertStart"]
                    }
                    onClick={() =>
                      history.push(
                        "/stage-" + interpretData["id"] + "/" + stage["stageId"]
                      )
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        history.push(
                          "/stage-" +
                            interpretData["id"] +
                            "/" +
                            stage["stageId"]
                        )
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

export default InterpretPageContents;
