import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaTrash } from "react-icons/fa";
import { CiUndo } from "react-icons/ci";
import {AuthContext} from "../context/AuthContext"

const TaskList = () => {
  const {state: taskState, deleteTask, getTasks, changeTaskStatus} = useContext(TaskContext)
  const {state: authState} = useContext(AuthContext)
  
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }

  return (
    <>
      <ul className="m-10">
        {taskState.tasks.length > 0
          ? taskState.tasks.map((task) => (
                <li className="mb-3 border rounded-3xl text-2xl flex justify-between" key={task._id}>
                  <div onClick={async () => {
                    await deleteTask(task._id)
                    await getTasks(authState.user._id)
                    }} className="ml-10 p-1 hover:cursor-pointer"><FaTrash /></div>  <div>{task.title}</div> 
                  {!task.isDone ? <div><small className="mr-1 text-sm text-red-600">Caduca el {formatDate(task.date)}</small> <small onClick={async () => {
                    await changeTaskStatus(task._id)
                    await getTasks(authState.user._id)
                  }} className="mr-1 hover:cursor-pointer">✅</small> </div> : <div className="flex"><small className="mr-2 text-sm text-green-600">Completada</small><CiUndo onClick={async () => {
                    await changeTaskStatus(task._id)
                    await getTasks(authState.user._id)
                  }} className="mr-1 hover:cursor-pointer"/> </div>} 
                  
                </li>
              
            )) : <h2>Este usuario no tiene tareas</h2>}
      </ul>
      
    </>
  );
};

export default TaskList;
