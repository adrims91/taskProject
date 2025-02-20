const HomeAuthenticated = () => {
    return (
      <div className="flex h-screen bg-amber-50">
        <div className="flex flex-col w-60 justify-center bg-white">
          <button className="border w-full mb-3 rounded-2xl p-2 bg-amber-50 text-black">Todas</button>
          <button className="border w-full mb-3 rounded-2xl p-2 bg-amber-50 text-black">Completadas</button>
          <button className="border w-full mb-3 rounded-2xl p-2 bg-amber-50 text-black">Pendientes</button>
          <button className="border w-full mb-3 rounded-2xl p-2 bg-amber-50 text-black">Para hoy</button>
          <button className="border w-full mb-3 rounded-2xl p-2 bg-amber-50 text-black">Caducadas</button>
        </div>
        <div className="flex justify-center items-center flex-1">
          <img className="h-100" src="../../images/todays_plans_wide.jpg" alt="" />
        </div>
      </div>
    );
  };
  
  export default HomeAuthenticated;
  