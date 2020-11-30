import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 200,
        minHeight: 287,
    },
    media: {
        height: 140,
    },
    location: {
        verticalAlign: "text-bottom",
    },
});

const FestivalCardAdd = () => {
    const classes = useStyles();

    return (
        <div>
            <React.Fragment>
                <Card
                >
                    <CardActionArea className={classes.root} onClick={() => console.log("addNewFestival")}>
                        <CardContent style={{textAlign: "center"}}>
                            <AddIcon style={{width: "70px",
                                height: "70px"}} />
                            <Typography gutterBottom variant="h5" component="h2">
                                Add new festival
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </React.Fragment>
        </div>
    );
};
export default FestivalCardAdd;
