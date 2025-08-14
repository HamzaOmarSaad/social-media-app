import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

export const UserContext=createContext(null)


export default function UserContextProvider({children}) {
    const [userData ,setUserData] =useState(null)
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));
    const router =useNavigate()

    async function getUserData(token){
        try {
            const {data}= await axios("https://linked-posts.routemisr.com/users/profile-data",{
                headers:{
                    token,
                },
            })
            setUserData(data)
            localStorage.setItem("userId",data?.user._id)

        } catch (error) {
            console.log("🚀  getUserData ~ error:", error)
            
        }
    }
    function logout(){
        localStorage.removeItem("token")
         localStorage.removeItem("userId");
        setUserToken(null);
        setUserData(null)
        router("/login")
    
    }
    const values = {
      userData,
      setUserData,
      getUserData,
      logout,
      userToken,
      setUserToken,
    };

    return (
      <UserContext.Provider value={ values}>
        {children}
      </UserContext.Provider>
    );
}

