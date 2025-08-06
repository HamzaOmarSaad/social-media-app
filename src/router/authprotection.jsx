import React from 'react'
import { Navigate } from 'react-router'

function Authprotection({children}) {
    if (localStorage.getItem("token"))
    {
        return <Navigate to={"/posts"}/>


    }else{
        return children

    } 
}

export default Authprotection
