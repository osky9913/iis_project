import React, { useEffect, useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CFormInput from "../../custom/FormControl/input/CFormInput";
import { axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";

export default function ProfileSettingsFormAdminEdit(props) {
  let { errors, control, methods, handleSubmit, onSubmit, reset, id } = props;
  const [disabled, setDisabled] = useState(false);

  const [notPassword, setNotPassword] = useState("");

  const [editedUser, setEditedUser] = useState("");

  useEffect(() => {
    axiosInstance
      .get(endpoints.user + "/" + id)
      .then((res) => res.data)
      .then((user) => setEditedUser(user));
  }, []);

  useEffect(() => {
    axiosInstance.get("/User/password/" + id).then((res) => {
      if (res.status === 200) {
        setNotPassword(res.data["password"]);
      } else {
      }
    });
  }, []);

  const role = [
    { key: 0, name: "Admin" },
    { key: 1, name: "Organizer" },
    { key: 2, name: "Cashier" },
    { key: 3, name: "Viewer" },
    { key: 4, name: "Unregistered" },
  ];

  useEffect(() => {
    if (editedUser) {
      reset({
        username: editedUser["username"],
        name: editedUser["name"],
        surname: editedUser["surname"],
        city: editedUser["city"],
        country: editedUser["country"],
        email: editedUser["email"],
        psc: editedUser["psc"],
        reservationList: editedUser["reservationList"],
        role: editedUser["role"],
        street: editedUser["street"],
        token: editedUser["token"],
        password: notPassword,
      });
      if (editedUser["role"] !== 0) {
        setDisabled(true);
      }
    }
  }, [editedUser, notPassword]);

  console.log(editedUser);
  return (
    <div style={{ padding: "10px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item xs={6}>
              <CFormInput
                name="username"
                label="Pouzivatelske meno"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="name"
                label="Meno"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="surname"
                label="Priezvisko"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="password"
                label="Heslo"
                errorobj={errors}
                type="password"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="city"
                label="Mesto"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="country"
                label="Krajina"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="email"
                label="Email"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>

            <Grid item xs={6}>
              <CFormInput
                name="psc"
                label="psc"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={6}>
              <CFormInput
                name="street"
                label="ulica"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue=""
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                as={
                  <Select label="Role" name="role">
                    {role.map((person) => (
                      <MenuItem key={person.key} value={person.key}>
                        {person.name}
                      </MenuItem>
                    ))}
                  </Select>
                }
                control={control}
                fullWidth={true}
                label="Role"
                name="role"
                errorobj={errors}
                defaultValue={editedUser ? editedUser["role"] : 4}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
