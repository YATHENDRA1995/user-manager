import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./shared/components/navbar/Navbar";
import User from "./pages/user/User";
import Role from "./pages/role/Role";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ marginTop: "64px" }}>
          <Routes>
            <Route path="/" Component={Home} />

            <Route path="/user/add" Component={User} />
            <Route path="/user/:id" Component={User} />

            <Route path="/role/add" Component={Role} />
            <Route path="/role/:id" Component={Role} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
