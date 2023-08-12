import { useEffect, useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation, useNavigate } from "react-router-dom";

import { userTableHeaders, roleTableHeaders } from "./data";
import CustomTable from "../../shared/components/table/CustomTable";
import { deleteUser } from "../../logic/redux/slices/usersSlice";
import { deleteRole } from "../../logic/redux/slices/rolesSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { usersList } = useSelector((state) => state.users);
  const { rolesList } = useSelector((state) => state.roles);

  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    if (!!state) {
      setTabValue(String(state));
    }
  }, [state]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        mb={2}
      >
        <Button variant="contained" onClick={() => navigate("/user/add")}>
          Add User
        </Button>
        <Button variant="outlined" onClick={() => navigate("/role/add")}>
          Add Role
        </Button>
      </Stack>

      <Box>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Users" value="1" />
              <Tab label="Roles" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CustomTable
              tableHeaders={userTableHeaders}
              tableBody={usersList}
              navRoute={"/user/"}
              delRow={(data) => dispatch(deleteUser(data))}
            />
          </TabPanel>
          <TabPanel value="2">
            <CustomTable
              tableHeaders={roleTableHeaders}
              tableBody={rolesList}
              navRoute={"/role/"}
              delRow={(data) => dispatch(deleteRole(data))}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Home;
