import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api, axiosInstance } from "../../../../api/api";
import { useParams } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";

function parseISOString(s) {
  var b = s.split(/\D+/);
  const date = new Date();

  date.setFullYear(b[0]);
  date.setMonth(--b[1]);
  date.setDate(b[2]);
  date.setHours(b[3]);
  date.setMinutes(b[4]);

  return date;
}

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

const checkData = (data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let startDate = parseISOString(data[i]["concertStart"]);
    let endDate = parseISOString(data[i]["concertEnd"]);

    if (startDate >= endDate) {
      console.log("Riadok", startDate, endDate, startDate >= endDate);
      return false;
    }
    for (let j = 0; j < data.length; j++) {
      if (j !== i) {
        let destStartDate = parseISOString(data[j]["concertStart"]);
        let destEndDate = parseISOString(data[j]["concertEnd"]);

        console.log(startDate >= destStartDate, startDate <= destEndDate);
        if (
          (startDate >= destStartDate && startDate <= destEndDate) ||
          (endDate >= destStartDate && endDate <= destEndDate)
        ) {
          console.log("Medzi riadok");

          return false;
        }
      }
    }
  }
  return true;
};

const EditStagePerformanceList = (props) => {
  const classes = useStyles();

  const [stagePerformanceData, setStagePerformanceData] = useState([]);
  const { stageId } = useParams();

  useEffect(() => {
    api.getStageByID(stageId).then((response) => {
      const data = response.data;

      const tableData = [];
      data["stageInterpret"].forEach((concert) =>
        tableData.push({
          name: concert["interpret"]["name"],
          interpretId: concert["interpretId"],
          concertStart: concert["concertStart"],
          concertEnd: concert["concertEnd"],
        })
      );

      setStagePerformanceData(tableData);
    });
  }, []);

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MaterialTable
          title="Editovat zoznam vystupeni"
          columns={[
            { title: "Meno interpreta", field: "name" },
            {
              title: "Zaciatok",
              field: "concertStart",
              editComponent: (props) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    value={props.value}
                    onChange={(e) => {
                      props.onChange(e);
                    }}
                  />
                </MuiPickersUtilsProvider>
              ),
            },
            {
              title: "Koniec",
              field: "concertEnd",
              editComponent: (props) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    value={props.value}
                    onChange={(e) => {
                      props.onChange(e.toISOString());
                    }}
                  />
                </MuiPickersUtilsProvider>
              ),
            },
          ]}
          data={stagePerformanceData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...stagePerformanceData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setStagePerformanceData([...dataUpdate]);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setStagePerformanceData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
        <Button
          onClick={() => {
            if (checkData(stagePerformanceData)) {
              stagePerformanceData.forEach((interpret) => {
                const tempResponse = interpret;
                delete tempResponse["tableData"];
                tempResponse["stageId"] = stageId;
                axiosInstance.put("StageInterpret", interpret).then((res) => {
                  if (res.status !== 200) {
                    alert("Chyba Servera");
                  }
                });
              });
              location.reload();
            } else {
              alert("Casovy interval z niektoreho vystupenia sa prekryva");
            }
          }}
        >
          Ulozit{" "}
        </Button>
      </main>
    </div>
  );
};

export default EditStagePerformanceList;
