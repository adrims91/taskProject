import { createContext, useEffect, useReducer } from "react";
import { TaskReducer, TaskInitialState } from "./TaskReducer.jsx";
import { toast } from "react-toastify";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, TaskInitialState);

  const clearMessages = () => {
    setTimeout(() => {
      dispatch({ type: "CLEAR_MESSAGES" });
    }, 2000);
  };

  useEffect(() => {
    clearMessages();
  }, [state.message, state.error]);

  const getTasks = async (userId) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("tasks", JSON.stringify(data.tasks));
        dispatch({ type: "GET_TASKS_SUCCESS", payload: { tasks: data.tasks } });
      } else {
        dispatch({ type: "GET_TASKS_ERROR", payload: { error: data.error } });
      }
    } catch (error) {
      dispatch({ type: "GET_TASKS_ERROR", payload: { error: error.message } });
    }
  };

  const createTask = async ({ title, date }) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({ title, date }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: "ADD_TASK_SUCCESS",
          payload: { "task": data.task, "message": data.message, "success": true },
        });
        toast.success(data.message)
      } else {
        dispatch({ type: "ADD_TASK_ERROR", payload: { "error": data.error, "success": false } });
        toast.error(data.error)
      }
    } catch (error) {
      dispatch({ type: "ADD_TASK_ERROR", payload: { "error": error.message, "success": false } });
      toast.error(error.message)
    }
  };

  const deleteTask = async (id) => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + token
        }
      })
      const data = await response.json()
      if (response.ok){
        dispatch({type: 'DELETE_TASK_SUCCESS', payload: {"message": data.message}})
        toast.success(data.message)
      }else {
        dispatch({type: 'DELETE_TASK_ERROR', payload: {"error": data.message}})
        toast.error(data.error)
      }

    }catch(error) {
      dispatch({type: 'DELETE_TASK_ERROR', payload: {"error": error.message}})
      toast.error(error.message)
    }
  }

  const changeTaskStatus = async (id) => {
      const token = sessionStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:3000/doneTask/${id}`, {
          method: 'PUT',
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token
          }
        })
        const data = await response.json()
        if (response.ok){
          toast.success(data.message)
          dispatch({type: 'CHANGE_TASK_SUCCESS', payload: {"message": data.message}})
        }else {
          toast.error(data.error)
          dispatch({type: 'CHANGE_TASK_ERROR', payload: {"error": data.error}})
        }
      }catch(error) {
        toast.error(error.message)
        dispatch({type: 'CHANGE_TASK_ERROR', payload: {"error": error.message}})
      }
    }

  return (
    <TaskContext.Provider value={{ state, dispatch, getTasks, createTask, deleteTask, changeTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
