import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Register from "../components/Register";
import HomeAuthenticated from "./HomeAuthenticated";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { state } = useContext(AuthContext);
  return (
    <>
    {!state.isAuthenticated ? <div className="grid md:grid-cols-2 lg:grid-cols-2 bg-neutral-200">
        <div className="flex items-center justify-center h-screen">
          <img
            className="h-screen w-screen p-5 rounded-4xl"
            src="../../images/todoLogin.webp"
            alt=""
          />
        </div>
        <div>
          <Register />
        </div>
      </div> : <HomeAuthenticated />}
      <ToastContainer />
    </>
  );
};

export default Home;
