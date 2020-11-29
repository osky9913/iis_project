import {
  FormControl,
  Select,
  SelectProps,
  InputLabel,
} from "@material-ui/core";
import React from "react";

export const SdeSelect = ({ name, label, children, ...selectProps }) => {
  return (
    <FormControl variant="outlined">
      {label && (
        <InputLabel
          htmlFor={name}
          shrink={
            (selectProps.displayEmpty && selectProps.value === "") ||
            selectProps.value !== ""
          }
        >
          {label}
        </InputLabel>
      )}
      <Select label={label} {...selectProps}>
        {children}
      </Select>
    </FormControl>
  );
};
