import React from "react";
import Typography from "@material-ui/core/Typography";
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';
import GrainIcon from '@material-ui/icons/Grain';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    link: {
        display: 'flex',
    },
    breadcrumbs: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 17,
    },
}));

const InterpretPageContents = () => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                <Link color="inherit" onClick={() => console.log("FirstInterprepBreadcrumbButt")} className={classes.link}>
                    <PeopleIcon className={classes.icon} />
                    Material-UI
                </Link>
                <Link
                    color="inherit"
                    onClick={() => console.log("SecondInterprepBreadcrumbButt")}
                    className={classes.link}
                >
                    <GrainIcon className={classes.icon} />
                    Core
                </Link>
                <Typography color="textPrimary" className={classes.link}>
                    <PlaceIcon className={classes.icon} />
                    Breadcrumb
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
                </Typography>
            </List>
            <List dense={true}>
                <Typography variant="h6">
                    Stage
                </Typography>
            </List>
        </div>
    );
};

export default InterpretPageContents;