import * as yup from "yup";

export const ProfileSettingsValidationSchema = yup.object().shape({
  usernameSettings: yup.string().required("Name is Required"),
  passwordSettings: yup.string().required("Password is Required"),
});
