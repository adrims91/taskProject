import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      surname,
      email,
      password,
      username
    };
    try {
      await register(formData);
      setName('')
      setEmail('')
      setPassword('')
      setUsername('')
      setSurname('')

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
              className="underline font-bold ml-2"
            >
              Inicia sesión
            </span>
          </p>
       <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 w-100">
          <input required onChange={(e) => setName(e.target.value)} value={name} className="border p-3 rounded-2xl mr-1 bg-white" type="text" placeholder="Nombre"/>
          <input required onChange={(e) => setSurname(e.target.value)} value={surname} className="border p-3 rounded-2xl ml-1 bg-white" type="text" placeholder="Apellido" />
        </div>
        <div>
          <input required onChange={(e) => setEmail(e.target.value)} value={email} className="border p-3 mt-1 w-100 rounded-2xl bg-white" type="email" placeholder="Introduce un email"/>
        </div>
        <div>
          <input required onChange={(e) => setUsername(e.target.value)} value={username} className="border p-3 mt-1 w-100 rounded-2xl bg-white" type="text" placeholder="Introduce un nombre de usuario"/>
        </div>
        <div>
          <input required onChange={(e) => setPassword(e.target.value)} value={password} className="border p-3 mt-1 w-100 rounded-2xl bg-white" type="password" placeholder="Introduce una contraseña"/>
        </div>
        <div>
          <input type="checkbox" required  className="m-2 size-4"/>
          <label>Acepto los <small className="underline text-blue-300">Terminos y Condiciones</small></label>
        </div>
        <button className="cursor-pointer text-2xl border p-3 w-100 mt-3 bg-blue-300 rounded-2xl font-bold">
          Crear cuenta
        </button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Register;
