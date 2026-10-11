import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Auth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const {login} = useContext(Auth)

    if(!login){
        return  <Navigate to={"/"}/>
    }
  return <Outlet/>
}

export default ProtectedRoute