import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.scss'
import Auth from "./components/auth/Auth.tsx";
import Home from "./components/home/Home.tsx";
import Profile from "./components/profile/Profile.tsx";
import CreateTask from "./components/create_task/CreateTask.tsx";
import EditTask from "./components/edit_task/EditTask.tsx";
import Fallback from "./components/fallback/Fallback.tsx";
import Start from "./components/start/Start.tsx";
import SignUp from "./components/sign-up/SignUp.tsx";

const router = createBrowserRouter([
    { path: "/", Component: Start },
    { path: "/home", Component: Home },
    { path: "/auth", Component: Auth },
    { path: "/sign-up", Component: SignUp },
    { path: "/profile", Component: Profile },
    { path: "/create-task", Component: CreateTask },
    { path: "/edit-task", Component: EditTask }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Fallback/>}/>
    </React.StrictMode>
)
