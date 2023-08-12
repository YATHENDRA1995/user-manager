import * as Yup from "yup";

export const initialValues = {
  roleKey: "",
  roleLabel: "",
}

export const validationSchema = Yup.object({
  roleKey: Yup.string().required("Role key is required"),
  roleLabel: Yup.string().required("Role label is required"),
})