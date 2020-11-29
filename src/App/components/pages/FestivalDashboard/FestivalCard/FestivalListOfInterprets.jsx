import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    background: "white",
  },
});

const FestivalListOfInterprets = (props) => {
  const festivalDialogDataListOfInterprets =
    props.festivalDialogDataListOfInterprets;

  if (festivalDialogDataListOfInterprets) {
    return (
      <Paper>
        <List dense={true}>
          <Typography variant="h6">
            {festivalDialogDataListOfInterprets.map((festival, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={festival["interpret"]["name"]}
                    secondary={"Secondary text"}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </Typography>
        </List>
      </Paper>
    );
  } else {
    return <CircularProgress />;
  }
};

export default FestivalListOfInterprets;
