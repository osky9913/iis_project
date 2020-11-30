import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { api } from "../../../../api/api";

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
  const classes = useStyles();
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    api.getAllReservation().then((response) => setReservationsData(response));
  }, []);

  console.log(reservationsData);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Prehlad rezervacii"
        columns={[
          { title: "Name", field: "name" },
          { title: "Price", field: "price", type: "numeric" },
          { title: "Tickets", field: "tickets", type: "numeric" },
          { title: "Birth Year", field: "birthYear", type: "numeric" },
          {
            title: "Birth Place",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
          {
            title: "State",
            field: "state",
            lookup: {
              0: "In progress",
              1: "Accepted",
              2: "ujebalo dekel",
            },
          },
          { title: "Description", field: "description" },
        ]}
        data={[
          {
            name: "Mehmet",
            price: 88,
            tickets: 69,
            birthYear: 1987,
            birthCity: 63,
            state: 2,
            description: "idk dood",
          },
          {
            name: "Zerya Betül",
            price: 1488,
            tickets: 69,
            birthYear: 2017,
            birthCity: 34,
            state: 0,
            description: "idk dood",
          },
        ]}
        actions={[
          {
            icon: "check",
            tooltip: "Save User",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
          {
            icon: "clear",
            tooltip: "Delete Record",
            onClick: () => alert("You deleted me :(!"),
          },
        ]}
      />
    </main>
  );
};

export default UserReservationPage;
