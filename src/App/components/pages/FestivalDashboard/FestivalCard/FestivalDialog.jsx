import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListSubheader from "@material-ui/core/ListSubheader";


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
    },
    form: {
        display: 'block',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
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

function generate(element) {
    return [0, 1, 2, 3, 4].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const FestivalDialog = (props) => {
    const classes = useStyles();
    const festival = props.festival

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.openDialog}
            onClose={props.setCloseDialog}
            className={classes.root}
        >
            <DialogTitle>{festival["name"]} festival</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    tabIndex={-1}
                    classes={classes.dialogTextContent}
                >
                    {[...new Array(3)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </DialogContentText>
            </DialogContent>
            <DialogContent dividers={true}>
                <Grid item xs={12} md={"auto"}>
                    <Typography variant="h6" className={classes.title}>
                        LINEUP
                    </Typography>
                    <div className={classes.demo}>
                        {generate(
                        <List dense={true}>
                            <ListSubheader disableSticky={true}>
                                Stage/or smthg
                            </ListSubheader>
                                {generate(
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single-line item"
                                            secondary= 'Description'
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
                                )}
                        </List>
                        )}
                    </div>
                </Grid>
            </DialogContent>
            <DialogContent dividers={true}>
                <form className={classes.form} noValidate>
                    <FormControl className={classes.formControl}>
                        <InputLabel  htmlFor="max-width">Počet lístkov</InputLabel>
                        <Select
                            autoFocus
                            value={"1"}
                            inputProps={{
                                name: 'max-width',
                                id: 'max-width',
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