import * as Yup from "yup";

export const initialValues = {
  name: "",
  email: "",
  username: "",
  mobile: "",
  roleKey: "",
  password: "",
}

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  username: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("Username is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile number is required"),
  roleKey: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Password is required"),
})