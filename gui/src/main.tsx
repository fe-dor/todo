import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.scss'
import Start from "./components/start/Start.tsx";
import Home from "./components/home/Home.tsx";
import Profile from "./components/profile/Profile.tsx";
import CreateTask from "./components/create_task/CreateTask.tsx";
import EditTask from "./components/edit_task/EditTask.tsx";

const router = createBrowserRouter([
    { path: "/", Component: Start },
    { path: "/home", Component: Home },
    { path: "/profile", Component: Profile },
    { path: "/create-task", Component: CreateTask },
    { path: "/edit-task", Component: EditTask },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
