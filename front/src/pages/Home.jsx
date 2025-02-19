import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Register from "../components/Register";

const Home = () => {
  const { state } = useContext(AuthContext);
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 bg-neutral-200">
        <div className="flex items-center justify-center h-screen">
          <img
            className="h-screen w-screen p-5 rounded-4xl"
            src="../../images/todays_plans_wide.jpg"
            alt=""
          />
        </div>
        <div>
          <Register />
        </div>
      </div>
    </>
  );
};

export default Home;
