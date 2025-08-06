import React from 'react'
import { Navigate } from 'react-router'

function ProtectedRoute( {children}) {
    if (localStorage.getItem("token"))
    {
        return children

    }else{
        return <Navigate to={"/login"}/>
    } 


}

export default ProtectedRoute
