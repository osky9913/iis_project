import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import "./index.css";

function CFormInput(props) {
  let { name, label, required, errorobj, control, type, defaultValue } = props;
  if (defaultValue === undefined) {
    defaultValue = "";
  }

  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  if (type === "password") {
    return (
      <Controller
        as={TextField}
        name={name}
        control={control}
        type="password"
        defaultValue={defaultValue.toString()}
        label={label}
        fullWidth={true}
        InputLabelProps={{
          className: required ? "required-label" : "",
          required: required || false,
        }}
        error={isError}
        helperText={errorMessage}
        {...props}
      />
    );
  } else {
    return (
      <Controller
        as={TextField}
        name={name}
        control={control}
        defaultValue={defaultValue.toString()}
        label={label}
        fullWidth={true}
        InputLabelProps={{
          className: required ? "required-label" : "",
          required: required || false,
        }}
        error={isError}
        helperText={errorMessage}
        {...props}
      />
    );
  }
}

export default CFormInput;
