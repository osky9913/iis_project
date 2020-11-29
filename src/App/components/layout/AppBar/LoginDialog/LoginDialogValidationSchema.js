import * as yup from "yup";

export const loginDialogValidationSchema = yup.object().shape({
  username: yup.string().required("Name is Required"),
  password: yup.string().required("Password is Required"),
});
