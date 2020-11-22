import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { StyledInputLabel } from "../styles/CustomStyles";
import FormHelperText from "@material-ui/core/FormHelperText";

const CMuiSelect = (props) => {
  const { label, name, options, required, errorobj } = props;
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl fullWidth={true} error={isError}>
      <StyledInputLabel htmlFor={name}>
        {label} {required ? <span className="req-label">*</span> : null}
      </StyledInputLabel>
      <Select id={name} {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

function CFormSelect(props) {
  const { control } = useFormContext();
  const { name, label } = props;
  return (
    <React.Fragment>
      <Controller
        as={CMuiSelect}
        control={control}
        name={name}
        label={label}
        defaultValue=""
        {...props}
      />
    </React.Fragment>
  );
}

export default CFormSelect;
