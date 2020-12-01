import * as yup from "yup";

export const ReservationValidationSchema = yup.object().shape({
  name: yup.string().required("Name is Required").nullable(),

  surname: yup.string().required("surname is Required").nullable(),
  email: yup.string().required("email is Required").nullable(),
});
