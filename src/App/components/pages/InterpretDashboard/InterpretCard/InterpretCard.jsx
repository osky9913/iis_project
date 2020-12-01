import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GradeIcon from '@material-ui/icons/Grade';
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 200,
    },
    media: {
        height: 140,
    },
    location: {
        verticalAlign: "text-bottom",
    },
});

const FestivalCard = (props) => {
    const classes = useStyles();
    const interpret = props.interpret;
    let history = useHistory();

    if (interpret) {
        const interpretId = interpret["id"];
        return (
            <div>
                <React.Fragment>
                    <Card
                        className={classes.root}
                        onClick={() => history.push("/interpret-" + interpretId)}
                    >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={interpret["logoUri"]}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {interpret["name"]}
                                </Typography>
                                <Typography>
                                    <GradeIcon edge="start" className={classes.location}/>
                                    {interpret["rating"]}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </React.Fragment>
            </div>
        );
    } else {
        return <CircularProgress/>;
    }
};
export default FestivalCard;