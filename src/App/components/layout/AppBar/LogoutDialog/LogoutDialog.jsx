import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "../../../../../api/api";
import UserContext from "../../../../../context/UserContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
  },
});

export default function LogoutDialog(props) {
  const classes = useStyles();
  const { openLogoutDialog, handleLogoutClose } = props;
  const { setUser } = useContext(UserContext);
  let history = useHistory();

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={openLogoutDialog}
        keepMounted
        open={Boolean(openLogoutDialog)}
        onClose={handleLogoutClose}
        className={classes.root}
      >
        <MenuItem
          onClick={() => {
            handleLogoutClose();
            history.push("/settings");
          }}
        >
          Settings
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleLogoutClose();
            api.logout();
            api.deleteTokenFromHeader();
            setUser({ token: undefined, user: undefined });
            history.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
