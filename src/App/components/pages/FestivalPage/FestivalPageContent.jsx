import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";

const FestivalPageContent = (props) => {
  const festivalDialogDataListOfInterprets =
    props.festivalDialogDataListOfInterprets;

  if (festivalDialogDataListOfInterprets) {
    return (
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
    );
  } else {
    return <CircularProgress />;
  }
};

export default FestivalPageContent;
