import { createContext, useReducer } from "react";
import { AuthInitialState, AuthReducer } from "./authReducer";
import { toast } from "react-toastify";

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
        toast.success(data.message)
        dispatch({ type: 'REGISTER_SUCCESS', payload: { message: data.message } });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error)
        dispatch({ type: 'REGISTER_ERROR', payload: { error: errorData.error } });
      };
    } catch (error) {
      toast.error(error.message)
      dispatch({ type: 'REGISTER_ERROR', payload: { error: error.message } });
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
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        toast.success(data.message)
        dispatch({ type: 'LOGIN_SUCCESS', payload: { "message": data.message, "user": data.user, "token": data.token } });
      } else {
        const errorData = await response.json();
        dispatch({ type: 'LOGIN_ERROR', payload: { "error": errorData.error } });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: { 'error': error.message } });
    }
  }

  const logout = async () => {
    try {
      dispatch({type: 'LOGOUT_SUCCESS', payload: {"message": 'Usuario desconectado correctamente'}})

    }catch(error) {
      dispatch({type: 'LOGOUT_ERROR', payload: {"error": 'Ha ocurrido un error desconocido'}})
    }
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};