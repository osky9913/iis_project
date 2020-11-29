import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

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
  const festival = props.festival;
  const festivalId = festival["id"];
  let history = useHistory();

  if (festival) {
    return (
      <div>
        <React.Fragment>
          <Card
            className={classes.root}
            onClick={() => history.push("/festival-" + festivalId)}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={festival["logoUri"]}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {festival["name"]} festival
                </Typography>
                <Typography>
                  <RoomIcon edge="start" className={classes.location} />
                  {festival["city"]}, {festival["country"]}
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
    return <CircularProgress />;
  }
};
export default FestivalCard;
