import { useFormik } from "formik";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Grid,
  FormHelperText,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { initialValues, validationSchema } from "./data";
import { addUser, editUser } from "../../logic/redux/slices/usersSlice";
import { useEffect, useState } from "react";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { rolesList } = useSelector((state) => state.roles);

  const [initialData, setInitialData] = useState(initialValues);

  useEffect(() => {
    if (!!state) {
      let info = { ...state };
      info["password"] = "";
      setInitialData(info);
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
        dispatch(editUser(data));
      } else {
        dispatch(addUser(data));
      }
      formik.resetForm();
      navigate("/");
    },
  });

  return (
    <Stack py={4} spacing={2} direction={"column"}>
      <Typography variant="h5">Add User</Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              name="username"
              label="Username"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              name="mobile"
              label="Mobile"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <FormControl
              fullWidth
              error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              sx={{ marginTop: "16px", marginBottom: "8px" }}
            >
              <InputLabel id="role">Role</InputLabel>
              <Select
                fullWidth
                name="roleKey"
                value={formik.values.roleKey}
                label="Role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {rolesList?.map((item) => (
                  <MenuItem key={crypto.randomUUID()} value={item?.roleKey}>
                    {item?.roleLabel}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.roleKey && formik.errors.roleKey && (
                <FormHelperText>{formik.errors.roleKey}</FormHelperText>
              )}
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

export default User;
