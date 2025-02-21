export const TaskInitialState = {
    tasks: [],
    message: null,
    error: null
}

export const TaskReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK_SUCCESS':
            return {
                ...state,
                tasks: [...state, action.payload.task],

            }
        case 'ADD_TASK_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}