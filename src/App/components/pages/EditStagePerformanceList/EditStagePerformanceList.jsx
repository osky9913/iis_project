import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "../../../../api/api";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(6, 2, 2, 11),
    },
}));

const EditStagePerformanceList = (props) => {
    const classes = useStyles();

    const [stagePerformanceData, setStagePerformanceData] = useState([]);
    const { stageId } = useParams();

    useEffect(() => {
        api.getStageByID(stageId).then((response) => {
            const data = response.data;
            setStagePerformanceData(data["stageInterpret"])
        });
    }, []);


    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <MaterialTable
                title="Editovat zoznam vystupeni"
                columns={[
                    { title: "ID", field: "interpretId" },
                ]}
                data={stagePerformanceData}
                actions={[
                    {
                        icon: "check",
                        tooltip: "Potvrdit rezervaciu",
                        onClick: (event, rowData) => {
                            console.log("click CHECK")
                        },
                    },
                    {
                        icon: "clear",
                        tooltip: "Zrus rezervaciu",
                        onClick: (event, rowData) => {
                            console.log("remove");
                        },
                    },
                ]}
            />
        </main>
    );
};

export default  EditStagePerformanceList;