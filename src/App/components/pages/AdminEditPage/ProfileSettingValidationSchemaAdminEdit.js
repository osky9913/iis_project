import * as yup from "yup";

export const ProfileSettingsValidationSchemaAdminEdit = yup.object().shape({
  username: yup.string().required("username is Required").nullable(),
  name: yup.string().required("Name is Required").nullable(),
  surname: yup.string().required("surname is Required").nullable(),
  city: yup.string().required("city is Required").nullable(),
  country: yup.string().required("country is Required").nullable(),
  email: yup.string().required("email is Required").nullable(),
  psc: yup.string().required("psc is Required").nullable(),
  role: yup.number().required("role is Required").nullable(),
  street: yup.string().required("Name is Required").nullable(),
  password: yup.string().required("Name is Required").nullable(),
});
