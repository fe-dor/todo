import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import axios from "axios";

export default function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    // Доступ к параметрам запроса

    // Используйте paramValue как вам нужно

    useEffect(() => {
        //const abortController = new AbortController();
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get("email"); // Замените "paramName" на имя вашего параметра
        const code = queryParams.get("code"); // Замените "paramName" на имя вашего параметра

        if (email == null || code == null) {
            navigate('/')
            return
        }
        try {
            axios.post("http://localhost:5000/confirmation", {
                email: email,
                code: code
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    const {token} = response.data
                    //console.log(token)
                    localStorage.setItem("SavedToken", token);
                    // Установка JWT в заголовки axios для последующих запросов
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    navigate('/home')
                }
            }).catch(() => {
                alert("Confirmation error. Most likely your link is out of date.")
                navigate('/')
                return
            })
        } catch (e) {
            console.error(e)
        }
    }, []);

    return(
        <></>
    )
}