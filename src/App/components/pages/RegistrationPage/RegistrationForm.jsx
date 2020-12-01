import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationValidationSchema } from "./RegistrationValidationSchema";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../custom/FormControl/input/CFormInput";
import { axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!

const RegistrationForm = () => {
  const methods = useForm({
    resolver: yupResolver(RegistrationValidationSchema),
  });
  let history = useHistory();
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const { handleSubmit, errors, control } = methods;
  const onSubmit = (data) => {
    data["role"] = 3;
    axiosInstance
      .post(endpoints.user, data)
      .then((response) => {
        if (response.status === 200) {
          setSucces(true);
          sleep(2000).then(() => {
            history.push("/");
          });
        }
      })
      .catch((error) => setError(true));
    console.log(data);
  };
  return (
    <div>
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
          </Grid>
        </form>
      </FormProvider>
      <Button onClick={handleSubmit(onSubmit)}>Registrovat</Button>
      {error ? <p style={{ color: "red" }}> Registracia sa nezdarila</p> : null}
      {succes ? (
        <div>
          <p style={{ color: "green" }}> Registracia sa zdarila</p>
          <CircularProgress />
        </div>
      ) : null}
    </div>
  );
};

export default RegistrationForm;
