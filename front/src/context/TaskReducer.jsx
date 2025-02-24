const cachedTasks = JSON.parse(sessionStorage.getItem('tasks')) || [];

export const TaskInitialState = {
    tasks: cachedTasks,
    message: null,
    error: null,
    success: false
}

export const TaskReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK_SUCCESS':
            return {
                ...state,
                message: action.payload.message,
                success: true

            }
        case 'ADD_TASK_ERROR':
            return {
                ...state,
                error: action.payload.error,
                success: false
            }
        case 'GET_TASKS_SUCCESS':
            return {
                ...state,
                tasks: action.payload.tasks,
                message: action.payload.message
            }
        case 'GET_TASKS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'DELETE_TASKS_SUCCESS':
            return {
                ...state,
                message: action.payload.message
            }
        case 'DELETE_TASKS_ERROR':
            return {
                ...state,
                error: action.payload.message
            }
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                message: null,
                error: null
            }
        default:
            return state
    }
}