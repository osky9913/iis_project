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
import { AddNewFestivalValidationSchema } from "./AddNewFestivalValidationSchema";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const genre = [
  { key: 0, name: "Rock" },
  { key: 1, name: "Pop" },
  { key: 2, name: "Metal" },
  { key: 3, name: "HipHop" },
  { key: 4, name: "Emd" },
  { key: 5, name: "Chill" },
];

const AddNewFestivalForm = () => {
  const methods = useForm({
    resolver: yupResolver(AddNewFestivalValidationSchema),
  });
  let history = useHistory();
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { handleSubmit, errors, control } = methods;
  const onSubmit = (data) => {
    setError(false);
    if (endDate < startDate) {
      setError(true);
    } else {
      let tempStartDate = startDate;
      let tempEndDate = endDate;

      tempStartDate.setMinutes(0);
      tempEndDate.setMinutes(0);

      data["startTime"] = startDate.toISOString();
      data["endTime"] = endDate.toISOString();
      axiosInstance.post(endpoints.festival, data).then((response) => {
        if (response.status === 200) {
          history.push("/festivals");
        }
      });
    }
  };
  return (
    <div style={{ padding: "30px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                  label="Nazov festivalu"
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
                  name="logoUri"
                  label="logo url addresa"
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
                  name="street"
                  label="Ulica"
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
                <CFormInput
                  name="price"
                  label="cena"
                  errorobj={errors}
                  type="string"
                  control={control}
                  defaultValue=""
                />
              </Grid>

              <Grid item xs={6}>
                <DateTimePicker value={startDate} onChange={setStartDate} />
                <p>Zaciatok</p>
              </Grid>

              <Grid item xs={6}>
                <DateTimePicker value={endDate} onChange={setEndDate} />
                <p>Koniec</p>
              </Grid>
              <Grid item xs={6}>
                <CFormInput
                  name="capacity"
                  label="Kapacita"
                  errorobj={errors}
                  type="string"
                  control={control}
                  defaultValue=""
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </FormProvider>
      <Button onClick={handleSubmit(onSubmit)}>Vytvorit</Button>

      {error ? (
        <div>
          <p style={{ color: "red" }}>
            {" "}
            Koniec festivalu je skorej ako zaciatok
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default AddNewFestivalForm;
