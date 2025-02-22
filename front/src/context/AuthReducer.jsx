export const AuthInitialState = {
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    isAuthenticated: !!sessionStorage.getItem('token'),
    token: sessionStorage.getItem('token'),
    message: null,
    error: null
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                message: action.payload.message,
                error: null
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.payload.error,
                message: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                message: action.payload.message,
                user: action.payload.user,
                error: null,
                token: action.payload.token,
                isAuthenticated: true
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload.error,
                message: null,
                user: null,
                token: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}