import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, register } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <div className="grid justify-center items-center h-screen">
        <div className="grid-cols-subgrid">
          <h1 className="text-4xl font-bold mb-3 text-center">Crear una cuenta</h1>
          <p className="mb-5 text-center">
            Ya tienes una cuenta?
            <span
              onClick={() => navigate("/login")}
              className="underline font-bold"
            >
              Inicia sesión
            </span>
          </p>
       
        <div>
          <input className="border p-3 m-1 rounded-2xl" type="text" placeholder="Nombre"/>
          <input className="border p-3 m-1 rounded-2xl" type="text" placeholder="Apellido" />
        </div>
        <div>
          <input className="border p-3 m-1 w-100 rounded-2xl" type="email" placeholder="Introduce un email"/>
        </div>
        <div>
          <input className="border p-3 m-1 w-100 rounded-2xl" type="email" placeholder="Introduce una contraseña"/>
        </div>
        <div>
          <input type="checkbox"  className="m-2 size-4"/>
          <label>Acepto los <small className="underline text-blue-400">Terminos y Condiciones</small></label>
        </div>
        <button className="border p-3 w-100 mt-3 bg-blue-400 rounded-2xl">
          Crear Cuenta
        </button>
        </div>
      </div>
    </>
  );
};

export default Register;
