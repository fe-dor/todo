import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie'

export default function Start(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            console.log(password)
            const response = await axios.post('http://192.168.0.105:5000/login', { //TODO: переделать в env
                email: email,
                password: password
            });
            console.log(Cookies.get)
            console.log(response)
            console.log(response.headers)
            Cookies.set('auth', response.headers["auth"]) //не получается...
            if (response.status == 200) {
                console.log('hi')
                return redirect('/home');
            }

        } catch (error) {
            console.error(error);
        }

        console.log(`Username: ${email}, Password: ${password}`);
    };

    return (
        <>
            <div>Start page</div>
            <Link to="/home">
                <text>Visit your profile</text>
            </Link>

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