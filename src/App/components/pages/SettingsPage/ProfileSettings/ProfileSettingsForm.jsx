import React, { useContext, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import CFormInput from "../../../custom/FormControl/input/CFormInput";
import UserContext from "../../../../../context/UserContext";

export default function ProfileSettingsForm(props) {
  let { errors, control, methods, handleSubmit, onSubmit, user } = props;
  const [nameHook, setName] = useState("");
  const [surnameHook, setSurname] = useState("");

  useEffect(() => {
    if (user["user"]) {
      const { name, surname } = user["user"];
      setName(name);
      setSurname(surname);
    }
  }, [user]);

  console.log(nameHook, surnameHook);

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
                name="usernameSettings"
                label="Meno"
                errorobj={errors}
                type="string"
                control={control}
                defaultValue={nameHook}
              />
            </Grid>
            <Grid item xs={12}>
              <CFormInput
                name="passwordSettings"
                label="Heslo"
                errorobj={errors}
                control={control}
                type="password"
                defaultValue={surnameHook}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
