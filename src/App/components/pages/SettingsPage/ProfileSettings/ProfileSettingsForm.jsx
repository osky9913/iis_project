import React, { useEffect, useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../../custom/FormControl/input/CFormInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { axiosInstance } from "../../../../../api/api";

export default function ProfileSettingsForm(props) {
  let { errors, control, methods, handleSubmit, onSubmit, user, reset } = props;
  const [disabled, setDisabled] = useState(false);
  const [notPassword, setNotPassword] = useState("");

  useEffect(() => {
    if (user["user"]) {
      axiosInstance.get("/User/password/" + user["user"]["id"]).then((res) => {
        if (res.status === 200) {
          setNotPassword(res.data["password"]);
          console.log(res.data["password"]);
        }
      });
    }
  }, []);

  const role = [
    { key: 0, name: "Admin" },
    { key: 1, name: "Organizer" },
    { key: 2, name: "Cashier" },
    { key: 3, name: "Viewer" },
    { key: 4, name: "Unregistered" },
  ];

  useEffect(() => {
    if (user["user"]) {
      reset({
        username: user["user"]["username"],
        name: user["user"]["name"],
        surname: user["user"]["surname"],
        password: notPassword,
        city: user["user"]["city"],
        country: user["user"]["country"],
        email: user["user"]["email"],
        psc: user["user"]["psc"],
        reservationList: user["user"]["reservationList"],
        role: user["user"]["role"],
        street: user["user"]["street"],
        token: user["user"]["token"],
      });
      if (user["user"]["role"] !== 0) {
        // vypinanie dialogu
        setDisabled(true);
      }
      console.log(user["user"]);
    }
  }, [user["user"], notPassword]);

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
                required
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
                required
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
                required
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
                required
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
                required
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
                disabled={disabled}
                fullWidth={true}
                label="Role"
                name="role"
                errorobj={errors}
                defaultValue={user["user"] ? user["user"]["role"] : 4}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
