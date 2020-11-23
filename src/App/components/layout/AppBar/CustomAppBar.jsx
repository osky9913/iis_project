import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navStyle: {
    color: "white",
  },
}));

export default function CustomAppBar() {
  const classes = useStyles();
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(null); // because null don't know why
  const { user } = useContext(UserContext);

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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
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
              <Link to="/settings" className={classes.navStyle}>
                <SettingsIcon />
              </Link>
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
    </div>
  );
}
