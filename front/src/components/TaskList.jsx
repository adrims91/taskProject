import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { state } = useContext(TaskContext);

  return (
    <>
    {state.tasks.length > 1 ? <ul>
        <li></li>
      </ul> : 'Este usuario no tiene tareas'}
      
    </>
  );
};

export default TaskList;
