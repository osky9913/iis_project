import * as yup from "yup";

export const AddNewInterpretValidationSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  logoUri: yup.string().nullable(),
  rating: yup
    .number("Hodnotenie je povinne", "Hodnotenie je povinne")
    .required("Hodnotenie je povinne")

    .min(1, "Minimalna hodnota je 1 ")
    .max(10, "Maximalna hodnota je 10"),
  description: yup.string().nullable(),
});
