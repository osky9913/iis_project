import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LoginDialog from "./LoginDialog/LoginDialog";
import MenuIcon from "@material-ui/icons/Menu";

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
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenLoginDialog(true);
  };
  const handleClose = () => {
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
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton>
          <Button color="inherit" onClick={handleClickOpen}>
            Prihlásiť
          </Button>
        </Toolbar>
      </AppBar>
      <LoginDialog
        handleClose={handleClose}
        openLoginDialog={openLoginDialog}
      />
    </div>
  );
}
