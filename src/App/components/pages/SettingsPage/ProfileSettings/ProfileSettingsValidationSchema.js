import * as yup from "yup";

export const ProfileSettingsValidationSchema = yup.object().shape({
  username: yup.string().required("username is Required").nullable(),
  name: yup.string().required("Name is Required").nullable(),
  surname: yup.string().required("surname is Required").nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  email: yup.string().required("email is Required").nullable(),
  psc: yup.string().nullable(),
  role: yup.number().nullable(),
  street: yup.string().nullable(),
  password: yup.string().required("Name is Required").nullable(),
});
