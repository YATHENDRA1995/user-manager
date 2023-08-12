import { useEffect, useState } from "react";
import { Button, TextField, Typography, Stack, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { initialValues, validationSchema } from "./data";
import { addRole, editRole } from "../../logic/redux/slices/rolesSlice";

const Role = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [initialData, setInitialData] = useState(initialValues);

  useEffect(() => {
    if (!!state) {
      setInitialData(state);
    }
  }, [state]);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      const data = { id: crypto.randomUUID(), ...values };
      if (!!state) {
        dispatch(editRole(data));
      } else {
        dispatch(addRole(data));
      }
      formik.resetForm();
      navigate("/", {state: 2});
    },
  });

  return (
    <Stack py={4} spacing={2} direction={"column"}>
      <Typography variant="h5">Add Role</Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="roleKey"
              label="Role Key"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roleKey}
              error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              helperText={formik.touched.roleKey && formik.errors.roleKey}
            />
            <TextField
              fullWidth
              margin="normal"
              name="roleLabel"
              label="Role Label"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roleLabel}
              error={
                formik.touched.roleLabel && Boolean(formik.errors.roleLabel)
              }
              helperText={formik.touched.roleLabel && formik.errors.roleLabel}
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ marginTop: "16px" }}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {!!state ? "Edit" : "Submit"}
            </Button>
          </form>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Stack>
  );
};

export default Role;
