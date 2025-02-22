import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const {state: taskState} = useContext(TaskContext)
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }

  return (
    <>
      <ul className="m-10">
        {taskState.tasks.length > 0
          ? taskState.tasks.map((task) => (
                <li className="mb-3 border rounded-3xl text-2xl" key={task._id}>
                  {task.title}
                  {!task.isDone ? <small className="ml-10 text-sm text-red-600">Caduca el {formatDate(task.date)}</small> : <small className="ml-10 text-sm text-green-600">Completada ✅</small>} 
                  
                </li>
              
            )) : <h2>Este usuario no tiene tareas</h2>}
      </ul>
      
    </>
  );
};

export default TaskList;
