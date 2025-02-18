import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Login from '../components/Login'

const Home = () => {

    const {state} = useContext(AuthContext)
  return (
    <>
        {!state.isAuthenticated ? (
              <Login />
        ) : 
        <h1>Bienvenido al home mr {state.user.email}</h1>
        }
    </>
  )
}

export default Home