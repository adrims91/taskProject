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
      <div className="flex items-center justify-center h-screen">
          
      </div>
    </>
);
}
export default Login;