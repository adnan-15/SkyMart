import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    const {login} = useContext(Auth)
    if(login){
        return  <Navigate to={"/main"}/>
    }
  return <Outlet/>
}

export default PublicRoute