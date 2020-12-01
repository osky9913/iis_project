import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";

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

const AdminReservationPage = () => {
  const classes = useStyles();
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    api.getAllReservation().then((response) => setReservationsData(response));
  }, []);

  console.log(reservationsData);
  //@todo preklad stavov
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Prehlad vsetkych rezervacii"
        columns={[
          {
            title: "Stav",
            field: "state",
            lookup: {
              0: "InProgress",
              1: "Accepted",
              2: "Declined",
              3: "Refused",
            },
          },

          { title: "Popis", field: "description" },
          { title: "Nazov festivalu", field: "festivalName" },
          { title: "Cena", field: "price" },
          { title: "Pocet listkov", field: "tickets" },
          { title: "UserName", field: "username" },
        ]}
        data={reservationsData}
        actions={[
          {
            icon: "check",
            tooltip: "Potvrdit rezervaciu",
            onClick: (event, rowData) => {
              api.deleteTokenFromHeader();

              axiosInstance
                .get(endpoints.reservation + "/" + rowData.id)
                .then((res) => {
                  if (res.status === 200) {
                    let tempData = res.data;
                    tempData["state"] = 1;
                    tempData["description"] = "Rezervacia bola potvrdena";

                    axiosInstance
                      .put(endpoints.reservation, tempData)
                      .then((helloWorld) =>
                        console.log("helloo", helloWorld.status)
                      );
                    location.reload();
                  }
                });
            },
          },
          {
            icon: "clear",
            tooltip: "Zrus rezervaciu",
            onClick: (event, rowData) => {
              api.deleteTokenFromHeader();

              axiosInstance
                .get(endpoints.reservation + "/" + rowData.id)
                .then((res) => {
                  if (res.status === 200) {
                    let tempData = res.data;
                    tempData["state"] = 2;
                    tempData["description"] =
                      "Rezervacia zrusena organizatormi";

                    axiosInstance
                      .put(endpoints.reservation, tempData)
                      .then((helloWorld) =>
                        console.log("helloo", helloWorld.status)
                      );
                    location.reload();
                  }
                });
            },
          },
        ]}
      />
    </main>
  );
};

export default AdminReservationPage;
