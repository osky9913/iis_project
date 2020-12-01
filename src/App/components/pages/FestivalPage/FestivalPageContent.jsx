import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import AccessTime from "@material-ui/icons/AccessTime";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import UserContext from "../../../../context/UserContext";
import { axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
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

const FestivalPageContent = (props) => {
  const festivalDataListOfInterprets = props.festivalDataListOfInterprets;
  const festivalDataListOfStages = props.festivalDataListOfStages;
  const festivalData = props.festivalData;
  const classes = useStyles();
  const [reservationClickCount, setReservationClickCount] = useState(1);
  let history = useHistory();
  const { user } = useContext(UserContext);
  const [maxTicketCount, setMaxTicketCount] = useState(0);
  console.log(festivalData);

  const makeReservation = () => {
    let data = {};
    if (user["user"] && festivalData["id"]) {
      data = {
        state: 0,
        tickets: reservationClickCount,
        price: reservationClickCount * festivalData["price"],
        description: "Vasa rezervacia je v progresse",
        userId: user["user"]["id"],
        festivalId: festivalData["id"],
      };
      axiosInstance.post(endpoints.reservation, data).then((res) => {
        if (res.status === 200) {
          location.reload();
        }
      });
    } else {
      data = {};
    }
  };

  useEffect(() => {
    if (festivalData) {
      axiosInstance
        .get("Festival/tickets/" + festivalData["id"])
        .then((resposne) => {
          if (resposne.status === 200) {
            setMaxTicketCount(
              festivalData["capacity"] - resposne.data["reservedTickets"]
            );
          }
        });
    }
  }, [festivalData]);

  if (festivalDataListOfInterprets) {
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
          <h1 style={{ textAlign: "center" }}>
            {festivalData["name"]} festival
          </h1>
        </div>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" className={classes.link}>
            <AccessTime className={classes.icon} />
            {festivalData["startTime"]}
          </Link>
          <Link
            color="inherit"
            className={classes.link}
          >
            <PlaceIcon className={classes.icon} />
            {festivalData["street"]}, {festivalData["city"]},{" "}
            {festivalData["country"]}
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <PeopleIcon className={classes.icon} />
            {festivalData["capacity"]}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="body2"
          align={"justify"}
          paragraph={true}
          gutterBottom={true}
          style={{textAlign: "center"}}
        >
          {festivalData["description"]}
        </Typography>
        <Divider variant={"middle"} />
        <List dense={true}>
          <Typography variant="h6">
            Interpreti
            <div>
              {user["user"] ? (
                <div>
                  {user["user"]["role"] === 0 || user["user"]["role"] === 1 ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        history.push(
                          "/edit-interpret-list-" + festivalData["id"]
                        );
                      }}
                    >
                      Edit
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            {festivalDataListOfInterprets.map((festival, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar
                    onClick={() =>
                      history.push("/interpret-" + festival["interpret"]["id"])
                    }
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={festival["interpret"]["logoUri"]}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={festival["interpret"]["name"]}
                    secondary={
                      "Rating: " +
                      festival["interpret"]["rating"] +
                      ", Genre: " +
                      festival["interpret"]["genre"]
                    }
                    onClick={() =>
                      history.push("/interpret-" + festival["interpret"]["id"])
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        history.push(
                          "/interpret-" + festival["interpret"]["id"]
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
        <List dense={true}>
          <Typography variant="h6">
            <div>
              Stage
              {user["user"] ? (
                <div>
                  {user["user"]["role"] === 0 || user["user"]["role"] === 1 ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        history.push("/edit-stage-list-" + festivalData["id"]);
                      }}
                    >
                      Edit
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            {festivalDataListOfStages.map((stage, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <ListItemAvatar
                    onClick={() =>
                      history.push(
                        "/stage-" + festivalData["id"] + "/" + stage["id"]
                      )
                    }
                  >
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={stage["name"]}
                    secondary={"Capacity: " + stage["capacity"]}
                    onClick={() =>
                      history.push(
                        "/stage-" + festivalData["id"] + "/" + stage["id"]
                      )
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        history.push(
                          "/stage-" + festivalData["id"] + "/" + stage["id"]
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

        <div align={"left"}>
          <Typography gutterBottom={true} variant="h5">
            {festivalData["price"]}$
          </Typography>
          <Typography variant="body1">Permanentný lístok</Typography>
          <Typography variant="body1">
            Max {maxTicketCount} lístkov na objednávku
          </Typography>
        </div>
        {maxTicketCount ? (
          <div className={classes.buttons}>
            <ButtonGroup
              size="small"
              aria-label="small outlined button group"
              style={{ paddingRight: 30 }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (reservationClickCount > 1) {
                    setReservationClickCount(reservationClickCount - 1);
                  }
                }}
              >
                -
              </Button>
              <Button>{reservationClickCount}</Button>

              <Button
                variant="contained"
                onClick={() => {
                  if (reservationClickCount < maxTicketCount) {
                    setReservationClickCount(reservationClickCount + 1);
                  }
                }}
              >
                +
              </Button>
            </ButtonGroup>
            {user["user"] ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => makeReservation()}
              >
                Rezervovať
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(
                    "unregistered-festival-" +
                      festivalData["id"] +
                      "-count-" +
                      reservationClickCount
                  );
                }}
              >
                Rezervovať
              </Button>
            )}
          </div>
        ) : (
          <p>Vypredane</p>
        )}
      </div>
    );
  } else {
    return <CircularProgress style={{ marginLeft: "47%" }} />;
  }
};

export default FestivalPageContent;
