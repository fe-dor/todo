import './App.scss'
import Home from "./components/home/Home.tsx"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Start from "./components/start/Start.tsx";


export function Fallback() {
    return <p>Performing initial data load</p>;
}
export default function App() {

  return (
     <>
      <RouterProvider router={router} fallbackElement={<Fallback />
      /*<Home />*/
    </>
  )
}



