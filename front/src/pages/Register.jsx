import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    try {
      await register(formData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container text-center d-flex vh-100 justify-content-center align-items-center">
        <div className="row shadow p-5">
          <div className="col">
            <h1 className="fs-1 fw-bold text-secondary text-nowrap mb-3">
              Registro
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
              <button type="submit" className="btn btn-secondary">
                Regístrate
              </button>
            </form>
            {state.message && (
              <div>
                <p className="text-success">{state.message}</p>
              </div>
            )}
            {state.error && (
              <div>
                <p className="text-danger">{state.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
