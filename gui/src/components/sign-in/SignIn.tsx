import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import stylesSignUp from "./../sign-up/SignUp.module.scss"
import styles from "./SignIn.module.scss";
import SignIconLeaf from "../signIconLeaf/SignIconLeaf.tsx";

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
            <div className={stylesSignUp.container}>
                <div className={stylesSignUp.content}>
                    <div className={stylesSignUp.logo}>
                        <Link className={stylesSignUp.linkLogo} to={'/'}>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.04832 0.407715C10.413 0.407715 13.1406 3.13533 13.1406 6.50002H7.04832V0.407715Z"
                                    fill="black"/>
                                <path
                                    d="M13.1402 12.5925C9.77547 12.5925 7.04785 9.86491 7.04785 6.50022H13.1402V12.5925Z"
                                    fill="black"/>
                                <path
                                    d="M0.955544 12.5925C4.32023 12.5925 7.04785 9.86491 7.04785 6.50022H0.955544V12.5925Z"
                                    fill="black"/>
                                <path
                                    d="M0.955544 6.50024C4.32023 6.50024 7.04785 3.77263 7.04785 0.407937H0.955544V6.50024Z"
                                    fill="black"/>
                            </svg>
                            <span className={stylesSignUp.logoText}>TodoHive</span>
                        </Link>
                    </div>

                    <div className={styles.formContainer}>
                        <h1 className={styles.welcome}>
                            Welcome Back !
                        </h1>
                        <form className={stylesSignUp.form} onSubmit={handleSubmit}>
                            <input className={stylesSignUp.input}
                                   type="text"
                                   id="email"
                                   placeholder="Email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                            <input className={stylesSignUp.input}
                                   type="password"
                                   id="password"
                                   placeholder="Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                            <input className={stylesSignUp.signUp} type="submit" value="Login"/>
                        </form>
                        <Link className={stylesSignUp.linkSignIn} to={"/sign-up"}>
                            <text className={stylesSignUp.formBottom}>Don’t have an account?<span> </span>
                                <span className={stylesSignUp.formBottomDec}> Sign up</span>
                            </text>
                        </Link>
                        <Link className={stylesSignUp.linkStart} to={"/"}>
                            <p className={stylesSignUp.footer}>
                                Join our new beta program to test <br className={stylesSignUp.footerBr}/>
                                our new experimental feature
                            </p>
                        </Link>
                    </div>
                </div>
                <SignIconLeaf class={styles.iconLeafUp}/>
                <SignIconLeaf class={styles.iconLeafDown}/>
            </div>


            {/*<form onSubmit={handleSubmit}>
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
            </form>*/}
        </>
    )
}