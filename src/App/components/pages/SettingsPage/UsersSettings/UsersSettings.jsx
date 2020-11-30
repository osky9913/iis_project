import MaterialTable from "material-table";
import { api, axiosInstance } from "../../../../../api/api";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../context/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const UserSettings = () => {
  const [data, setData] = useState(undefined);
  const { user } = useContext(UserContext);

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
      <div style={{ width: 900 }}>
        <MaterialTable
          title="Admin page"
          columns={columns}
          data={data}
          actions={[
            {
              icon: "edit",
              tooltip: "edit User",
              onClick: (event, rowData) => alert("You saved " + rowData.name),
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
                  axiosInstance.delete("/User/" + oldData.id);
                  location.reload();
                }, 1000);
              }),
          }}
        />
      </div>
    );
  } else {
    return <CircularProgress />;
  }
};
export default UserSettings;
