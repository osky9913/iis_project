import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import { useHistory } from "react-router-dom";
import UserContext from "../../../../../context/UserContext";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function CustomDrawerMenu(props) {
  const { user, setUser } = useContext(UserContext);
  const openLeftNavBar = props.openLeftNavbar;
  const handleDrawerClose = props.handleDrawerClose;
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openLeftNavBar,
        [classes.drawerClose]: !openLeftNavBar,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openLeftNavBar,
          [classes.drawerClose]: !openLeftNavBar,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["festivals", "interprets"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              history.push("/" + text);
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <NaturePeopleIcon /> : <HeadsetMicIcon />}
            </ListItemIcon>
            <ListItemText primary={text === "festivals" ? "Festivaly" : "Interpreti"} />
          </ListItem>
        ))}

        {user["user"] ? (
          <ListItem
            button
            key={"user-reservation"}
            onClick={() => {
              history.push("/" + "user-reservation");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <WatchLaterIcon />
            </ListItemIcon>
            <ListItemText primary="Moje rezervácie" />
          </ListItem>
        ) : null}
      </List>
      <Divider />
      {user["user"] ? (
        <div>
          {user["user"]["role"] !== 3 && user["user"]["role"] !== 4 ? (
            <List>
              {["management of tickets"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => {
                    history.push("/" + "admin-reservation");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon>
                    <AccessibleForwardIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Správa rezervácii"} />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      ) : null}

      {user["user"] ? (
          <div>
            {user["user"]["role"] === 0 ? (
                <List>
                  {["admin page"].map((text, index) => (
                      <ListItem
                          button
                          key={text}
                          onClick={() => {
                            history.push("/admin-settings");
                            handleDrawerClose();
                          }}
                      >
                        <ListItemIcon>
                          <PregnantWomanIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Správa užívateľov"} />
                      </ListItem>
                  ))}
                </List>
            ) : null}
          </div>
      ) : null}
    </Drawer>
  );
}
