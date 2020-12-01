import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../custom/FormControl/input/CFormInput";
import { axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { AddNewInterpretValidationSchema } from "./AddNewInterpretValidationSchema";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";

const genre = [
  { key: 0, name: "Rock" },
  { key: 1, name: "Pop" },
  { key: 2, name: "Metal" },
  { key: 3, name: "HipHop" },
  { key: 4, name: "Emd" },
  { key: 5, name: "Chill" },
];

const AddNewInterpretForm = () => {
  const methods = useForm({
    resolver: yupResolver(AddNewInterpretValidationSchema),
  });
  let history = useHistory();
  const [error, setError] = useState(false);
  const { handleSubmit, errors, control } = methods;
  const [columns, setColumns] = useState([
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        rowData.name === "" ? "Name cannot be empty" : "",
    },
    {
      title: "Surname",
      field: "surname",
      validate: (rowData) =>
        rowData.surname === "" ? "Surname cannot be empty" : "",
    },
  ]);

  const [memberData, setMemberData] = useState([]);
  const onSubmit = (data) => {
    setError(false);
    let tempMemberData = [];
    memberData.forEach((item, index) => {
      tempMemberData.push({ name: item.name, surname: item.surname });
    });
    data["memberList"] = tempMemberData;

    axiosInstance
      .post(endpoints.interpret, data)
      .then((response) => {
        if (response.status === 200) {
          history.push("interprets");
        }
      })
      .catch((error) => setError(true));
  };

  return (
    <div style={{ padding: "30px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
            spacing={4}
          >
            <Grid item xs={6}>
              <CFormInput
                name="name"
                label="Nazov Kapely"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="logoUri"
                label="Logo url adresa"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="rating"
                label="Hodnotenie"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="description"
                label="Popis"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                as={
                  <Select label="Zaner" name="genre">
                    {genre.map((person) => (
                      <MenuItem key={person.key} value={person.key}>
                        {person.name}
                      </MenuItem>
                    ))}
                  </Select>
                }
                control={control}
                fullWidth={true}
                label="Zaner"
                name="genre"
                errorobj={errors}
                defaultValue={0}
              />
            </Grid>
          </Grid>
        </form>

        <div
          style={{
            width: "900px",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          <MaterialTable
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            title="Členovia"
            columns={columns}
            data={memberData}
            options={{
              paging: false,
              search: false,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (newData["surname"] || newData["name"]) {
                      if (
                        newData["surname"].toString().length === 0 ||
                        newData["name"].toString().length === 0
                      ) {
                        reject("Lenght");
                      } else {
                        setMemberData([...memberData, newData]);
                        resolve();
                      }
                    } else {
                      reject("Lenght");
                    }
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...memberData];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setMemberData([...dataUpdate]);

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...memberData];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setMemberData([...dataDelete]);

                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </FormProvider>
      <Button onClick={handleSubmit(onSubmit)}>Vytvorit</Button>

      {error ? (
        <div>
          <p style={{ color: "red" }}> Vytvorenie nebolo uspesne</p>
        </div>
      ) : null}
    </div>
  );
};

export default AddNewInterpretForm;
