import { createBrowserRouter } from "react-router";
import Layout from "../components/layout";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Posts from "../pages/posts";
import Home from "../pages/home";
import Notfound from "../pages/notfound";
import UserContextProvider from "../context/UserContext";
import ProtectedRoute from "./protectedRoute";
import Authprotection from "./authprotection";
import PostDetails from "../pages/postDetails";
import Profile from "../pages/profile";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Signup /> },
      {
        path: "posts",
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <Authprotection>
            <Login />
          </Authprotection>
        ),
      },
      { path: "*", element: <Notfound /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
