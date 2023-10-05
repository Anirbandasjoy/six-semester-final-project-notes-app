import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import PrivetRoutes from "./PrivetRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <PrivetRoutes><Profile /></PrivetRoutes>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/settings",
                element: <PrivetRoutes><Settings /></PrivetRoutes>
            }
        ]
    }
])