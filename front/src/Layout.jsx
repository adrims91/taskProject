import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const Layout = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<Home />} path="/"></Route>
        </Routes>
      </Router>
  );
};

export default Layout;
