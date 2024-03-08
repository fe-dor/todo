import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            console.log(password)
            const response = await axios.post('http://localhost:5000/login', { //TODO: переделать в env
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status == 200) {
                const {token} = response.data
                //console.log(token)
                localStorage.setItem("SavedToken", token);
                // Установка JWT в заголовки axios для последующих запросов
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                navigate('/home')
            }

        } catch (error) {
            console.error(error);
        }

        console.log(`Username: ${email}, Password: ${password}`);
    };

    return (
        <>
            <div>Start page</div>
           {/* <Link to="/home">
                <text>Visit your profile</text>
            </Link>*/}

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}