import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { state } = useContext(AuthContext);

  return <>
    {!state.isAuthenticated ? '' : (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="btn btn-secondary" to={'/'}>Home</Link>
            </div>
        </nav>
    )}
  </>;
};

export default Navbar;
