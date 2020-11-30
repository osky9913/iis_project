import * as yup from "yup";

export const AddNewFestivalValidationSchema = yup.object().shape({
  name: yup.string().required("Name is Required").nullable(),
  genre: yup.number(),
  country: yup.string().required("country is Required").nullable(),
  logoUri: yup.string(),
  city: yup.string().required("city is Required").nullable(),
  street: yup.string().required("Name is Required").nullable(),
  description: yup.string().nullable(),
  price: yup.number().positive().required("Price is required"),
  capacity: yup.number().positive().required("Capacity is required"),
});
