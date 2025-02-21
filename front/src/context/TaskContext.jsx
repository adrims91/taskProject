import { createContext, useReducer } from "react";
import { TaskReducer, TaskInitialState } from './TaskReducer.jsx'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [state, dispatch] = useReducer(TaskReducer, TaskInitialState)

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

