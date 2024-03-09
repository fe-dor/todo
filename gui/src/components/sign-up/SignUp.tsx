import styles from "./SignUp.module.scss"
import {ChangeEvent, useState} from "react";
import SignIconLeaf from "../signIconLeaf/SignIconLeaf.tsx";
import {Link} from "react-router-dom";
import axios from "axios";

import man from './../../assets/man.png'
/*const myPopup = new Popup({
    id: "my-popup",
    title: "My First Popup",
    content: `
        An example popup.
        Supports multiple lines.`,
});*/

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState("");


    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            if (password != confirmPassword) {
                alert("Passwords don't match");
                return
            }
            console.log(selectedImage);
            const formData = new FormData();
            formData.append('email', email)
            formData.append('password', password)
            formData.append('username', username)
            formData.append('photo', selectedImage);
            const response = await axios.post('http://localhost:5000/registration', formData)
            if (response.status === 200) {
                alert("Follow the link in the email sent to you");
            }
            console.log("Signing up");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Проверка, является ли ошибка ошибкой Axios
               alert(error.response?.data); // Получение statusText
            } else {
                // Обработка других типов ошибок
                console.error(error);
            }
        }
    };

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files != null) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = URL.createObjectURL(event.target.files[0]); // file - это ваш объект File
            img.onload = () => {
                // Установите размеры canvas в соответствии с желаемым разрешением
                canvas.width = 200;
                canvas.height = 200;
                if (ctx != null) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Создаем новый объект File с измененным разрешением и качеством сжатия
                    const photo = canvas.toDataURL('image/png', 0.8);
                    setSelectedImage(photo)
                    console.log(photo)
                }
            };
        }
    }

    return (
    <>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link className={styles.linkLogo} to={'/'}>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.04832 0.407715C10.413 0.407715 13.1406 3.13533 13.1406 6.50002H7.04832V0.407715Z"
                                fill="black"/>
                            <path d="M13.1402 12.5925C9.77547 12.5925 7.04785 9.86491 7.04785 6.50022H13.1402V12.5925Z"
                                  fill="black"/>
                            <path
                                d="M0.955544 12.5925C4.32023 12.5925 7.04785 9.86491 7.04785 6.50022H0.955544V12.5925Z"
                                fill="black"/>
                            <path
                                d="M0.955544 6.50024C4.32023 6.50024 7.04785 3.77263 7.04785 0.407937H0.955544V6.50024Z"
                                fill="black"/>
                        </svg>
                        <span className={styles.logoText}>TodoHive</span>
                    </Link>
                </div>
                <div className={styles.formTop}>
                    <span className={styles.signUpText}>Sign up</span>
                    <label className={styles.photoLabel} htmlFor="fileUpload">
                        <img className={styles.profilePic} src={
                            selectedImage.length > 0 ? selectedImage : man
                        } alt={"Profile picture"}/>
                        <div className={styles.editIcon}></div>
                    </label>
                </div>
                <input hidden id="fileUpload" type="file" name="pic" accept=".jpg, .jpeg, .png"
                       onChange={(e) => handleFileChange(e)}
                />
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input}
                           type="text"
                           id="username"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className={styles.input}
                           type="text"
                           id="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className={styles.input}
                           type="password"
                           id="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className={styles.input}
                           type="password"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input className={styles.signIn} type="submit" value="Sign-up"/>
                </form>
                <Link className={styles.linkSignIn} to={"/sign-in"}>
                    <text className={styles.formBottom}>Already have an account?<span> </span>
                        <span className={styles.formBottomDec}>Sign in</span>
                    </text>
                </Link>
                <Link className={styles.linkStart} to={"/"}>
                    <p className={styles.footer}>
                        Join our new beta program to test <br className={styles.footerBr}/>
                        our new experimental feature
                    </p>
                </Link>
                <SignIconLeaf class={styles.iconLeafUp}/>
                <SignIconLeaf class={styles.iconLeafDown}/>
            </div>
        </div>
    </>
    )
}
