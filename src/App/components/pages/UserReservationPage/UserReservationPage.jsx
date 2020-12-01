import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import UserContext from "../../../../context/UserContext";

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

const UserReservationPage = () => {
  const { user } = useContext(UserContext);

  const classes = useStyles();
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    if (user["user"]) {
      axiosInstance
        .get(endpoints.user + "/" + user["user"]["id"])
        .then((response) =>
          setReservationsData(response.data["reservationList"])
        );
    }
  }, [user]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Prehlad vasich rezervacii"
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
            icon: "clear",
            tooltip: "Zrus rezervaciu",
            onClick: (event, rowData) => {
              /*
              let tempData = rowData;
              tempData["state"] = 3;
              delete tempData["tableData"];
              delete tempData["festivalName"];

              tempData["description"] = "Rezervacia zrusena Vami";
              console.log(tempData);
              console.log(JSON.stringify(tempData));
              axiosInstance
                .put(endpoints.reservation, tempData)
                .then((response) => {
                  console.log("helloo", response);
                });
              */
              api.deleteTokenFromHeader();
              axiosInstance
                .get(endpoints.reservation + "/" + rowData.id)
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    let tempData = res.data;
                    tempData["state"] = 2;
                    tempData["description"] = "Rezervacia zrusena Vami";
                    console.log(tempData);
                    console.log(JSON.stringify(tempData));
                    axiosInstance
                      .put(endpoints.reservation, tempData)
                      .then((helloWorld) => location.reload());
                  }
                });
            },
          },
        ]}
      />
    </main>
  );
};

export default UserReservationPage;
