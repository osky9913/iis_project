import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LoginDialog from "./LoginDialog/LoginDialog";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../../../../context/UserContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogoutDialog from "./LogoutDialog/LogoutDialog";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },

  hide: {
    display: "none",
  },
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
  navStyle: {
    color: "white",
  },
}));

export default function CustomAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(null); // because null don't know why
  const [openLeftNavBar, setOpenNavBar] = React.useState(false);

  const { user } = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpenNavBar(true);
  };

  const handleDrawerClose = () => {
    setOpenNavBar(false);
  };

  const handleLogoutOpen = (event) => {
    setOpenLogoutDialog(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setOpenLogoutDialog(null);
  };

  const handleLoginOpen = () => {
    setOpenLoginDialog(true);
  };
  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openLeftNavBar,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={clsx(classes.menuButton, {
              [classes.hide]: openLeftNavBar,
            })}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Festivaly
          </Typography>

          {user["user"] ? (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <SettingsIcon
                onClick={() => {
                  history.push("/settings");
                }}
              />
            </IconButton>
          ) : null}

          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton>
          {user["user"] ? (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleLogoutOpen}
            >
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleLoginOpen}>
              Prihlásiť
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog
        handleClose={handleLoginClose}
        openLoginDialog={openLoginDialog}
      />
      <LogoutDialog
        handleLogoutOpen={handleLogoutOpen}
        handleLogoutClose={handleLogoutClose}
        openLogoutDialog={openLogoutDialog}
      />
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
          {["Festivaly", "Interpreti", "Placeholder1", "Placeholder2"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Placeholder3", "Placeholder4", "Placeholder5"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
}
