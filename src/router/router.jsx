import { createBrowserRouter } from "react-router";
import Layout from "../pages/layout";
import Login from "../components/login";
import Signup from "../components/signup";
import Posts from "../components/posts";
import Home from "../components/home";
import Notfound from "../components/notfound";
import UserContextProvider from "../context/UserContext";
import ProtectedRoute from "./protectedRoute";
import Authprotection from "./authprotection";
import PostDetails from "../components/postDetails";
import Profile from "../components/profile";

export const router =createBrowserRouter([
    {path:"",element: <UserContextProvider><Layout/></UserContextProvider>, children:[
        {path:"/",element:<Home/>},
        {path:"/register",element:<Signup/>},
        {path:"posts",element:<ProtectedRoute><Posts/></ProtectedRoute>},
        {path:"/posts/:id",element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
        {path:"/login",element:<Authprotection><Login/></Authprotection>},
        { path: "*", element: <Notfound /> } ,
        { path: "/profile", element: <Profile /> }
    ]}
])
