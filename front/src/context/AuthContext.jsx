import { createContext, useReducer } from "react";
import { AuthInitialState, AuthReducer } from "./authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

  const register = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'REGISTER_SUCCESS', payload: { message: data.message } });
      } else {
        const errorData = await response.json();
        dispatch({ type: 'REGISTER_ERROR', payload: { message: errorData.error } });
      }
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: { message: error.message } });
    }
  };

  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch({ type: 'LOGIN_SUCCESS', payload: { "message": data.message, "user": data.user, "token": data.token } });
      } else {
        const errorData = await response.json();
        dispatch({ type: 'LOGIN_ERROR', payload: { "error": errorData.error } });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: { 'error': error.message } });
    }
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};