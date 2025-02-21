import { useState } from "react";

const HomeAuthenticated = () => {
  const [newTask, setNewtask] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-screen sm:w-60 pt-10 bg-white p-3">
        <div className="flex">
          <img
            className="size-12 rounded-full"
            src="../../images/Logo.webp"
            alt=""
          />
          <h1 className="text-2xl ml-3 font-bold underline">Task Center</h1>
        </div>
        <button className="border w-full mb-3 mt-10 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
          Todas
        </button>
        <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
          Completadas
        </button>
        <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
          Pendientes
        </button>
        <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
          Para hoy
        </button>
        <button className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
          Caducadas
        </button>

        {!newTask && (
          <button
            onClick={() => setNewtask(true)}
            className="text-2xl text-center font-serif mt-5 hover: cursor-pointer shadow shadow-gray-600"
          >
            Crear Tarea
          </button>
        )}
        {newTask && (
          <form className="mt-5 flex-col text-center">
            <label className="text-center font-bold" htmlFor="title">Título</label>
            <input
            id="title"
              className="border text-center justify-center w-full rounded-2xl mb-1"
              type="text"
            />
            <label className="text-center font-bold" htmlFor="date">Fecha</label>
            <input
            id="date"
              className="border text-center justify-center w-full rounded-2xl mb-10"
              type="date"
            />
            <input
              onClick={() => setNewtask(false)}
              className="border text-center justify-center w-full rounded-2xl mb-3 hover: cursor-pointer font-mono bg-gray-100"
              type="submit"
              value={"Confirmar"}
            />
          </form>
        )}

      </div>
      <section className="flex justify-center flex-1 h-200 m-auto">
        <div className="grid grid-cols-1">
          {}
        </div>
      </section>
    </div>
  );
};

export default HomeAuthenticated;
