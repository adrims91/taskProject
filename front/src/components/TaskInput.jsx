import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";

const TaskInput = () => {
  const {state:taskState ,createTask, getTasks} = useContext(TaskContext)
  const {state: authState} = useContext(AuthContext)
  const [newTask, setNewtask] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState('');

  
  useEffect(() => {
    getTasks(authState.user._id)
  }, [authState.user._id])



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask({title, date})
      await getTasks(authState.user._id)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    const { success } = taskState;
    if (success){
      setTitle('')
      setDate('')
      setNewtask(false)
      taskState.success = false
    }
  }, [taskState.success])



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
      {newTask && (
        <form onSubmit={handleSubmit} className="mt-5 flex-col text-center">
          <label className="text-center font-bold" htmlFor="title">
            Título
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title"
            className="border text-center justify-center w-full rounded-2xl mb-1"
            type="text"
          />
          <label className="text-center font-bold" htmlFor="date">
            Fecha
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            id="date"
            className="border text-center justify-center w-full rounded-2xl mb-10"
            type="date"
          />
          <input
            className="border text-center justify-center w-full rounded-2xl mb-3 hover: cursor-pointer font-mono bg-gray-100"
            type="submit"
            value={"Confirmar"}
          />
        </form>
      )}
    </>
  );
};

export default TaskInput;
