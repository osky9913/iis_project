import MaterialTable from "material-table";
import { api } from "../../../../../api/api";
import React, { useEffect, useState } from "react";

const UserSettings = () => {
  const [data, setData] = useState(undefined);

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
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};
export default UserSettings;
