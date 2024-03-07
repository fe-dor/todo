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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:5000/profile", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('SavedToken'),
            }
        } ).then((response) => { //TODO: env
            if (response.status == 200){
                const { username } = response.data
                setName(username)
                setIsLoading(false)
                return
            } else {
                console.log("error on getting profile from server")
                navigate('/auth')
            }
        }).catch((error) => {
            console.error('error on getting profile from server:', error);
            navigate('/auth')
        })
    }, []); // Пустой массив зависимостей гарантирует, что эффект будет вызван только один раз


    if (isLoading) {
        return <></>
    }

    return (
    <>
        <HomeContext.Provider value={name}>
            <Navbar/>
            <Groups/>
            <Tasks/>
        </HomeContext.Provider>
    </>
    )
}