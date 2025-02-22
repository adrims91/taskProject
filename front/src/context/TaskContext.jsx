import { createContext, useReducer } from "react";
import { TaskReducer, TaskInitialState } from './TaskReducer.jsx'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [state, dispatch] = useReducer(TaskReducer, TaskInitialState)


        const getTasks = async (userId) => {
            const token = sessionStorage.getItem('token')
            try {
                const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        "authorization": "Bearer " + token
                    }
                })
    
                const data = await response.json()
                if (response.ok){
                    sessionStorage.setItem('tasks', JSON.stringify(data.tasks))
                    dispatch({type: 'GET_TASKS_SUCCESS', payload: {"tasks": data.tasks}})
                }else {
                    dispatch({type: 'GET_TASKS_ERROR', payload: {"error": data.error}})
                }
            }catch(error){
                dispatch({type: 'GET_TASKS_ERROR', payload: {"error": error.message}})
            }
        }

        

        const createTask = async ({title, date}) => {
            const token = sessionStorage.getItem('token')
            try {
                const response = await fetch(`http://localhost:3000/tasks`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify({title, date})
                })
                const data = await response.json()
                if (response.ok) {
                    dispatch({type: 'ADD_TASK_SUCCESS', payload: {"task": data.task, "message": data.message}})
                }else {
                    dispatch({type: 'ADD_TASK_ERROR', payload: {"error": data.error}})
                }

            }catch(error) {
                dispatch({type: 'ADD_TASK_ERROR', payload: {"error": error.message}})
            }
        }
        
    

    return (
        <TaskContext.Provider value={{state, dispatch, getTasks, createTask}}>
            {children}
        </TaskContext.Provider>
    )
}

