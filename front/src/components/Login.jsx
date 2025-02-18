import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    try {
      await login(formData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container text-center d-flex vh-100 justify-content-center align-items-center">
        <div className="row shadow p-5 border">
          <div className="col">
            <h1 className="fs-1 fw-bold text-secondary text-nowrap">
              Iniciar sesión
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control bg-secondary-subtle rounded-5 mb-1 text-center"
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-secondary-subtle rounded-5 mb-3 text-center"
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-secondary mb-3" type="submit">Confirmar</button>
            </form>
            <p>No tienes cuenta?</p>
            <button
              onClick={() => navigate("/register")}
              className="btn border shadow"
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
