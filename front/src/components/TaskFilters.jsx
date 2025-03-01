import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskFilters = () => {
  const { getCompletedTasks, getTodayTasks, getCaducatedTasks, getTasks } = useContext(TaskContext);

  return (
    <>
      <button onClick={getTodayTasks} className="border w-full mb-3 mt-10 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
        Para hoy
      </button>
      <button onClick={getCompletedTasks} className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
        Completadas
      </button>
      <button onClick={getTasks} className="border w-full mb-3  rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
        Todas
      </button>
      <button onClick={getCaducatedTasks} className="border w-full mb-3 rounded-2xl p-2 hover:cursor-pointer bg-amber-50 ">
        Caducadas
      </button>
    </>
  );
};

export default TaskFilters;
