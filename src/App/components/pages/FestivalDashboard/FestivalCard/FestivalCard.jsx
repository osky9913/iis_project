import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RoomIcon from '@material-ui/icons/Room';
import FestivalDialog from "./FestivalDialog";
import {api} from "../../../../../api/api";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const festivalID = props.festival["id"]
  const [festival, setFestivalByID] = useState([]);

  useEffect(() => {
    api.getFestivalByID(festivalID).then((response) => setFestivalByID(response));
  }, []);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
  <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClickOpenDialog}>
          <CardMedia
            className={classes.media}
            image={festival["logoUri"]}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {festival["name"]} festival
            </Typography>
            <Typography >
              <RoomIcon
                  edge="start"
              className={classes.location}>
              </RoomIcon>
              {festival["city"]}, {festival["country"]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpenDialog}>
            Learn More
          </Button>
        </CardActions>
        <FestivalDialog openDialog={openDialog} setOpenDialog={handleClickOpenDialog}
                        setCloseDialog={handleCloseDialog} festival={festival}/>
      </Card>
  </React.Fragment>
  );
};
export default FestivalCard;

