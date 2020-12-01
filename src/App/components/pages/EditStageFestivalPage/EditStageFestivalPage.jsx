import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import Avatar from "@material-ui/core/Avatar";
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

function isNumeric(num) {
  return !isNaN(num);
}

const EditStageFestivalPage = (props) => {
  const classes = useStyles();

  const [festivalData, setFestivalData] = useState([] | undefined);
  const [
    festivalDataListOfInterprets,
    setFestivalDataListOfInterprets,
  ] = useState([]);
  const [festivalDataListOfStages, setFestivalDataListOfStages] = useState([]);
  const { festivalId } = useParams();

  useEffect(() => {
    api.getFestivalByID(festivalId).then((response) => {
      const data = response.data;
      setFestivalData(data);
      setFestivalDataListOfInterprets(data["festivalInterpret"]);
      setFestivalDataListOfStages(data["stageList"]);
    });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Editovanie Stage"
        columns={[
          {
            title: "Nazov ",
            field: "name",
            validate: (rowData) =>
              rowData.name === "" ? "Name cannot be empty" : "",
          },
          {
            title: "Kapacita ",
            field: "capacity",
            validate: (rowData) =>
              isNumeric(rowData.capacity) === false
                ? "Capacity must be a number"
                : "",
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (newData)
                setTimeout(() => {
                  const data = {
                    name: newData.name,
                    capacity: newData.capacity,
                    festivalId: festivalId,
                  };
                  axiosInstance.post(endpoints.stage, data);
                  location.reload();
                  resolve();
                }, 1000);
            }),
        }}
        data={festivalDataListOfStages}
        actions={[
          {
            icon: "clear",
            tooltip: "Zrus rezervaciu",
            onClick: (event, rowData) => {
              console.log(rowData);
            },
          },
        ]}
      />
    </main>
  );
};

export default EditStageFestivalPage;
