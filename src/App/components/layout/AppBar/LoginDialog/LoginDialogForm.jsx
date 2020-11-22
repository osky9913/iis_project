import React from "react";
import { FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../../custom/FormControl/input/CFormInput";

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
                errorobj={errors}
                type="string"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <CFormInput
                name="password"
                label="Heslo"
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
