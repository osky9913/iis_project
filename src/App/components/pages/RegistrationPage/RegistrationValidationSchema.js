import * as yup from "yup";

export const RegistrationValidationSchema = yup.object().shape({
  username: yup.string().required("username is Required").nullable(),
  email: yup.string().required("email is Required").nullable(),
  password: yup.string().required("Name is Required").nullable(),
  name: yup.string().nullable(),
  surname: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  psc: yup.string().nullable(),
  street: yup.string().nullable(),
});
