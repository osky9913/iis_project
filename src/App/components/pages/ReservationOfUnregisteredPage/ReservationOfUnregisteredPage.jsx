import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../custom/FormControl/input/CFormInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useParams } from "react-router-dom";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ReservationValidationSchema } from "./ReservationValidationSchema";

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

const ReservationOfUnregisteredPage = () => {
  const classes = useStyles();
  const id = useParams()["festivalId"];
  const pocetListkov = useParams()["countTickets"];
  const [festivalData, setFestivalData] = useState([] | undefined);

  const methods = useForm({
    resolver: yupResolver(ReservationValidationSchema),
  });
  let history = useHistory();
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  const [responseData, setResponseData] = useState(undefined);

  useEffect(() => {
    api.getFestivalByID(id).then((response) => {
      const data = response.data;
      setFestivalData(data);
    });
  }, []);

  const { handleSubmit, errors, control } = methods;
  const onSubmit = (data) => {
    api.deleteTokenFromHeader();
    setError(false);
    setSucces(false);
    data["role"] = 0;
    axiosInstance
      .post(endpoints.user, data)
      .then((response) => {
        if (response.status === 200) {
          setResponseData(response.data);
          const hello = {
            state: 0,
            tickets: pocetListkov,
            price: pocetListkov * festivalData["price"],
            description: "Vasa rezervacia je v progrese",
            userId: response.data["id"],
            festivalId: festivalData["id"],
          };

          axiosInstance.post(endpoints.reservation, hello).then((res2) => {
            if (res2.status === 200) {
              setSucces(true);
            }
          });
        }
      })
      .catch((err) => setError(true));
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ padding: "20px" }}>
        <Container maxWidth="md">
          <Paper className={classes.page}>
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
                    <Grid item xs={12}>
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
                      <h2>festival</h2>
                      {festivalData["name"]}
                    </Grid>
                    <Grid item xs={6}>
                      <h2>pocet listkov</h2>
                      {pocetListkov}
                    </Grid>

                    <Grid item xs={6}>
                      <h2>cena</h2>
                      {pocetListkov * festivalData["price"]}
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
              <div
                style={{
                  paddingTop: "40px",
                }}
              >
                <Button onClick={handleSubmit(onSubmit)}>Rezervacia</Button>
                {error ? (
                  <p style={{ color: "red" }}> Rezervacia sa nezdarila</p>
                ) : null}
                {succes ? (
                  <div>
                    <p style={{ color: "green" }}> Rezervacia sa zdarila </p>
                    <p>Dokonciť registraciu? </p>
                    <Button
                      onClick={() =>
                        history.push(
                          "/registration-unregistered-" + responseData["id"]
                        )
                      }
                    >
                      Registracia
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </main>
  );
};
export default ReservationOfUnregisteredPage;
