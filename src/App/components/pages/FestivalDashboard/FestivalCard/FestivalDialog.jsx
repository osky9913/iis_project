import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { api } from "../../../../../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import FestivalListOfInterprets from "./FestivalListOfInterprets";

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
}));

const FestivalDialog = (props) => {
  const classes = useStyles();
  const festivalId = props.festivalId;
  const openDialog = props.openDialog;
  const setCloseDialog = props.setCloseDialog;

  const [festivalDialogData, setFestivalDialogData] = useState([] | undefined);
  const [
    festivalDialogDataListOfInterprets,
    setFestivalDialogDataListOfInterprets,
  ] = useState([]);

  useEffect(() => {
    api.getFestivalByID(festivalId).then((response) => {
      const data = response.data;
      setFestivalDialogData(data);
      setFestivalDialogDataListOfInterprets(data["festivalInterpret"]);
    });
  }, []);

  if (festivalDialogData) {
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openDialog}
        onClose={setCloseDialog}
        className={classes.root}
      >
        <DialogTitle>{festivalDialogData["name"]}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1}>
            {[...new Array(3)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogContent dividers={true}>
          <Grid item xs={12} md={"auto"}>
            <Typography variant="h6" className={classes.title}>
              LINEUP
            </Typography>
            <div className={classes.demo}>
              <FestivalListOfInterprets
                festivalDialogDataListOfInterprets={
                  festivalDialogDataListOfInterprets
                }
              />
            </div>
          </Grid>
        </DialogContent>

        <DialogContent dividers={true}>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Počet lístkov</InputLabel>
              <Select
                autoFocus
                value={"1"}
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setCloseDialog} color="primary">
            Zatvoriť
          </Button>
          <Button variant="contained" color="primary">
            Rezervovať
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <CircularProgress />;
  }
};
export default FestivalDialog;
/*
{generate(
<List dense={true}>
    {generate(
        <Typography variant="h7" className={classes.title}>
            Line-up
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Single-line item"
                    secondary={'Secondary text'}
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
        </Typography>,
    )}
</List>
)}
* */
