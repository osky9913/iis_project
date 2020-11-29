import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';
import AccessTime from '@material-ui/icons/AccessTime'
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useHistory} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";


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
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    breadcrumbs: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 17,
    },

}));

const FestivalPageContent = (props) => {
    const festivalDataListOfInterprets = props.festivalDataListOfInterprets;
    const festivalDataListOfStages = props.festivalDataListOfStages
    const festivalData = props.festivalData
    const classes = useStyles()
    const [reservationClickCount, setReservationClickCount] = useState(1);
    let history = useHistory();

    if (festivalDataListOfInterprets) {
        return (
            <div className={classes.root}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                    <Link color="inherit" className={classes.link}>
                        <AccessTime className={classes.icon}/>
                        {festivalData["startTime"]}
                    </Link>
                    <Link
                        color="inherit"
                        className={classes.link}
                        onClick={() => window.open("https://goo.gl/maps/LD1JC4g4WNXtp13s5", "_blank")}
                    >
                        <PlaceIcon className={classes.icon}/>
                        {festivalData["street"]}, {festivalData["city"]}, {festivalData["country"]}

                    </Link>
                    <Typography color="textPrimary" className={classes.link}>
                        <PeopleIcon className={classes.icon}/>
                        {festivalData["capacity"]}
                    </Typography>
                </Breadcrumbs>
                <Typography variant="body2"
                            align={"justify"}
                            paragraph={true}
                            gutterBottom={true}>
                    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <Divider variant={"middle"}/>
                <List dense={true}>
                    <Typography variant="h6">
                        Interpreti
                        {festivalDataListOfInterprets.map((festival, index) => {
                            return (
                                <ListItem key={index} divider={true}>
                                    <ListItemAvatar
                                        onClick={() => history.push("/interpret-" + festival["interpret"]["id"])}>
                                        <Avatar alt="Remy Sharp" src={festival["interpret"]["logoUri"]}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={festival["interpret"]["name"]}
                                        secondary={"Rating: " + festival["interpret"]["rating"] + ", Genre: " +
                                        festival["interpret"]["genre"]}
                                        onClick={() => history.push("/interpret-" + festival["interpret"]["id"])}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="edit">
                                            <EditIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </Typography>
                </List>
                <List dense={true}>
                    <Typography variant="h6">
                        Stage
                        {festivalDataListOfStages.map((stage, index) => {
                            return (
                                <ListItem key={index} divider={true}>
                                    <ListItemAvatar
                                        onClick={() => history.push("/stage-" + festivalData["id"] + "/" +
                                            stage["id"])}>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={stage["name"]}
                                        secondary={"Capacity: " + stage["capacity"]}
                                        onClick={() => history.push("/stage-" + festivalData["id"] + "/" +
                                            stage["id"])}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="edit">
                                            <EditIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </Typography>
                </List>
                <div align={"left"}>
                    <Typography gutterBottom={true} variant="h5">{festivalData["price"]}$</Typography>
                    <Typography variant="body1">Permanentný lístok</Typography>
                    <Typography variant="body1">Max x lístkov na objednávku</Typography>
                </div>
                <div className={classes.buttons}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button variant="contained"
                                onClick={() => setReservationClickCount(reservationClickCount + 1)}>+</Button>
                        <Button>{reservationClickCount}</Button>
                        <Button variant="contained"
                                onClick={() => setReservationClickCount(reservationClickCount - 1)}>-</Button>
                    </ButtonGroup>
                    <Button style={{paddingLeft: 30, paddingRight: 30,}}
                            onClick={() => {
                                history.goBack()
                            }} color="primary">
                        Zatvoriť
                    </Button>
                    <Button variant="contained" color="primary">
                        Rezervovať
                    </Button>
                </div>
            </div>
        );
    } else {
        return <CircularProgress style={{marginLeft: '47%'}}/>;
    }
};

export default FestivalPageContent;
