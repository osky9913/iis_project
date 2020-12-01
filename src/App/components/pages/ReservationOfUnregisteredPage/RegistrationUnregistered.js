import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../custom/FormControl/input/CFormInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useParams } from "react-router-dom";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ReservationValidationSchema } from "./ReservationValidationSchema";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ReserVationRegistrationValidationSchema } from "./ReserVationRegistrationValidationSchema";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const role = [
  { key: 0, name: "Admin" },
  { key: 1, name: "Organizer" },
  { key: 2, name: "Cashier" },
  { key: 3, name: "Viewer" },
  { key: 4, name: "Unregistered" },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  adminPage: {
    minWidth: "33%",
  },

  page: {
    height: "auto",
    padding: theme.spacing(3),
  },
  container: {
    margin: 4,
  },
}));

const RegistrationUnregistered = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  let history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const classes = useStyles();
  const id = useParams()["id"];

  const methods = useForm({
    resolver: yupResolver(ReserVationRegistrationValidationSchema),
  });
  const { handleSubmit, errors, control, reset } = methods;

  useEffect(() => {
    axiosInstance.get(endpoints.user + "/" + id).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        setName(res.data["name"]);
        setSurname(res.data["surname"]);
        setEmail(res.data["email"]);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      reset({
        name: name,
        surname: surname,
        email: email,
      });
    }
  }, [user, name, surname, email]);

  const onSubmit = (data) => {
    data["role"] = 3;
    data["id"] = id;
    axiosInstance.put(endpoints.user, data).then((res) => {
      if (res.status === 200) {
        setSuccess(true);
        sleep(2000).then(() => {
          history.push("/");
        });
      }
    });
  };
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="md">
          <Paper className={classes.page}>
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
                </Grid>
              </form>
            </FormProvider>
            {error ? (
              <p style={{ color: "red" }}> Registracia sa nezdarila</p>
            ) : null}
            {success ? (
              <div>
                <p style={{ color: "green" }}> Registracia sa zdarila</p>
                <CircularProgress />
              </div>
            ) : null}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Registrovat
            </Button>
          </Paper>
        </Container>
      </div>
    </main>
  );
};
export default RegistrationUnregistered;
