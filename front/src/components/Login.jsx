import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import '../../styles/login.css'
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated){
      setTimeout(() => {
        navigate('/')
      }, 1500);
    }
  }, [state.isAuthenticated])

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
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <img className="absolute size-235" src="../../images/todays_plans_wide.jpg" alt="" />
        <div className="rounded-4xl shadow-2xl p-5 absolute">
          <h1 className="text-4xl mb-3 text-center">Inicio de sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                className="border p-3 w-100 rounded-4xl mb-3"
                type="text"
                placeholder="email"
              />
              <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
                className="border p-3 w-100 rounded-4xl"
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <button className="bg-blue-400 border p-3 mt-3 rounded-4xl w-100 hover:cursor-pointer">Iniciar sesión</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
