import Navbar from "./navbar/Navbar.tsx"
import Groups from "./groups/Groups.tsx"
import Tasks from "./tasks/Tasks.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { HomeContext } from './HomeContext';
import {useNavigate} from "react-router-dom";



export default function Home(){

    const [name, setName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://192.168.0.105:5000/profile").then((response) => { //TODO: env
            if (response.status == 200){
                const { username } = response.data
                setName(username)
                return
            } else {
                console.log("error on getting profile from server")
                navigate('/')
            }
        }).catch((error) => {
            console.error('error on getting profile from server:', error);
            navigate('/')
        })
    }, []); // Пустой массив зависимостей гарантирует, что эффект будет вызван только один раз


    return (
    <>
    <HomeContext.Provider value={name}>
      <Navbar />
      <Groups />
      <Tasks />
    </HomeContext.Provider>
    </>
  )
}