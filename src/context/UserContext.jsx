import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

export const UserContext=createContext(null)


export default function UserContextProvider({children}) {
    const [userData ,setUserData] =useState(localStorage.getItem("token"))

    const router =useNavigate()

    async function getUserData(token){
        try {
            const {data}= await axios("https://linked-posts.routemisr.com/users/profile-data",{
                headers:{
                    token,
                },
            })
            setUserData(data)

        } catch (error) {
            console.log("🚀  getUserData ~ error:", error)
            
        }
    }
    function logout(){
        localStorage.removeItem("token")
        setUserData(null)
        router("/login")
    
    }

    return (
        <UserContext.Provider value={{ userData,setUserData ,getUserData,logout}}>{children}</UserContext.Provider>
    )
}

