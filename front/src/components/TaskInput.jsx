import { useState } from "react";

const TaskInput = () => {

    const [newTask, setNewtask] = useState(false);
  return (
    <>
      {!newTask && (
        <button
          onClick={() => setNewtask(true)}
          className="text-2xl text-center font-serif mt-5 hover: cursor-pointer shadow shadow-gray-600"
        >
          Crear Tarea
        </button>
      )}
      {newTask && 
      <form className="mt-5 flex-col text-center">
        <label className="text-center font-bold" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          className="border text-center justify-center w-full rounded-2xl mb-1"
          type="text"
        />
        <label className="text-center font-bold" htmlFor="date">
          Fecha
        </label>
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
}
    </>
  );
};

export default TaskInput;
