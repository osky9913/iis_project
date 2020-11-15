import React from "react";
import { FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../../custom/FormControl/input/CFormInput";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

export default function LoginDialogForm(props) {
  let { errors, control, methods, handleSubmit, onSubmit } = props;

  return (
    <div style={{ padding: "10px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12}>
              <CFormInput
                name="username"
                label="Uživateľské meno"
                required={true}
                errorobj={errors}
                type="string"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <CFormInput
                name="password"
                label="Heslo"
                required={true}
                errorobj={errors}
                control={control}
                type="password"
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
