import { createContext, useReducer } from "react";
import { TaskReducer, TaskInitialState } from './TaskReducer.jsx'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [state, dispatch] = useReducer(TaskReducer, TaskInitialState)

    const getTasks = async (userId) => {
        try {
            const response = await fetch(`localhost:3000/tasks/${userId}`)

            const data = await response.json()
            if (response.ok){
                dispatch({type: 'GET_TASKS_SUCCESS', payload: {"tasks": data}})
            }else {
                dispatch({type: 'GET_TASKS_ERROR', payload: {"error": data.error}})
            }
        }catch(error){
            dispatch({type: 'GET_TASKS_ERROR', payload: {"error": error.message}})
        }
    }

    return (
        <TaskContext.Provider value={{state, dispatch, getTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

