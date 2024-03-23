import Navbar from "./navbar/Navbar.tsx"
import Tasks from "./tasks/Tasks.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Group, HomeContext} from './HomeContext';
import {useNavigate} from "react-router-dom";
import CreateTaskButton from "./createTask/CreateTaskButton.tsx";
import Groups from "./groups/Groups.tsx";


export default function Home(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [userGroups, setUserGroups] = useState([new Group("", "", "")]);

    useEffect(() => {
        axios.get("http://localhost:5000/home", {
            withCredentials: true
        } ).then((response) => { //TODO: env
            if (response.status == 200){
                const { username, photo, groups } = response.data
                setUserName(username)
                setUserPhoto(photo)
                setUserGroups(groups)
                return
            } else {
                console.log("error on getting profile from server")
                navigate('/sign-in')
            }
        }).catch((error) => {
            console.error('error on getting profile from server:', error);
            navigate('/sign-in')
        })
    }, []); // Пустой массив зависимостей гарантирует, что эффект будет вызван только один раз


    /*if (isLoading) {
        return <></>
    }*/

    return (
        <>
            <HomeContext.Provider value={{userName, userPhoto, userGroups}}>
                <Navbar/>
                <Groups/>
                <Tasks/>
                <CreateTaskButton />
            </HomeContext.Provider>
        </>
    )
}
