import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";

const Layout = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Home />} path="/"></Route>
        </Routes>
      </Router>
  );
};

export default Layout;
