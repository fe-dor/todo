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
    const [userPhoto, setUserPhoto] = useState(new File([""], ''));

    useEffect(() => {
        axios.get("http://localhost:5000/profile", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('SavedToken'),
            }
        } ).then((response) => { //TODO: env
            if (response.status == 200){
                const { username, photo } = response.data
                setName(username)
                //console.log(data)
                const data = photo.data
                setUserPhoto(new File(data, "photo"))
                //console.log(new File([data], ''))
                setIsLoading(false)
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


    if (isLoading) {
        return <></>
    }

    return (
        <>
            <HomeContext.Provider value={{name, userPhoto}}>
                <Navbar/>
                <Groups/>
                <Tasks/>
            </HomeContext.Provider>
            <img src={URL.createObjectURL(userPhoto)} alt={""}></img>
        </>
    )
}
