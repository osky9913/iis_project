import MaterialTable from "material-table";
import { api, axiosInstance } from "../../../../../../api/api";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../../context/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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

const UserSettings = () => {
  const [data, setData] = useState(undefined);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    api.getAllUsers().then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  const [columns, setColumns] = useState([
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    {
      title: "Name",
      field: "name",
      initialEditValue: "initial edit value",
    },
    {
      title: "username",
      field: "username",
      initialEditValue: "initial edit value",
    },
  ]);

  if (user["user"]) {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MaterialTable
          title="Admin page"
          columns={columns}
          data={data}
          actions={[
            {
              icon: "edit",
              tooltip: "edit User",
              onClick: (event, rowData) => {
                history.push("admin-edit-" + rowData["id"]);
              },
            },
          ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (
                    oldData["id"] === user["user"]["id"] ||
                    oldData["role"] === 0
                  ) {
                    return reject("You can't delete admin");
                  }

                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  api.deleteTokenFromHeader();
                  axiosInstance.delete("/User/" + oldData.id).then((res) => {
                    location.reload();
                  });
                }, 1000);
              }),
          }}
        />
      </main>
    );
  } else {
    return <CircularProgress />;
  }
};

export default UserSettings;
