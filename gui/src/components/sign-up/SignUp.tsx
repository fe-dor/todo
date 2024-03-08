import styles from "./SignUp.module.scss"
import {useState} from "react";
import axios from "axios";





export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            console.log("Signing up");
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04832 0.407715C10.413 0.407715 13.1406 3.13533 13.1406 6.50002H7.04832V0.407715Z"
                              fill="black"/>
                        <path d="M13.1402 12.5925C9.77547 12.5925 7.04785 9.86491 7.04785 6.50022H13.1402V12.5925Z"
                              fill="black"/>
                        <path d="M0.955544 12.5925C4.32023 12.5925 7.04785 9.86491 7.04785 6.50022H0.955544V12.5925Z"
                              fill="black"/>
                        <path d="M0.955544 6.50024C4.32023 6.50024 7.04785 3.77263 7.04785 0.407937H0.955544V6.50024Z"
                              fill="black"/>
                    </svg>
                    <span className={styles.logoText}>TodoHive</span>
                </div>
                <div className={styles.formTop}>
                    <span className={styles.signUpText}>Sign up</span>
                    <div className={styles.profilePic}>
                        <img className={styles.profilePicMan} src={"src/assets/man.png"} alt={"Profile picture"}/>
                    </div>
                    <div className={styles.editIcon}></div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input}
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <input className={styles.input}
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <input className={styles.input}
                        type="text"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <input className={styles.input}
                        type="text"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br/>
                    <input className={styles.signIn} type="submit" value="Sign-up"/>
                </form>


                <IconLeaf/>
            </div>
        </div>
    </>
    )
}

function IconLeaf() {
    return (
        <div className={styles.iconLeaf}>
            <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_128_1509)">
                    <path
                        d="M64.4988 129.386C28.8771 129.171 0.173658 100.121 0.387876 64.499L64.8867 64.8868L64.4988 129.386Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M0.776556 6.34445e-05C36.3983 0.214281 65.1017 29.2651 64.8875 64.8868L0.388679 64.4989L0.776556 6.34445e-05Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M129.774 0.775815C94.1525 0.561597 65.1017 29.2651 64.8875 64.8868L129.386 65.2747L129.774 0.775815Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M129.386 65.2746C93.7638 65.0604 64.7131 93.7638 64.4988 129.386L128.998 129.773L129.386 65.2746Z"
                        fill="white" fill-opacity="0.42"/>
                </g>
                <defs>
                    <filter id="filter0_b_128_1509" x="-3.61328" y="-4" width="137.388" height="137.773"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_128_1509"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_128_1509" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}