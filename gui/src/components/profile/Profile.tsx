import styles from './Profile.module.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import man from "../../assets/man.png";

export default function Profile(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState("");

    /*useEffect(() => {
        axios.get("http://localhost:5000/profile", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('SavedToken'),
            }
        } ).then((response) => { //TODO: env
            if (response.status == 200){
                const { username, photo, email } = response.data
                setName(username)
                setEmail(email)
                setUserPhoto(photo)
                return
            } else {
                console.log("error on getting profile from server")
                navigate('/sign-in')
            }
        }).catch((error) => {
            console.error('error on getting profile from server:', error);
            navigate('/sign-in')
        })
    }, []); // Пустой массив зависимостей гарантирует, что эффект будет вызван только один раз*/

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files != null) { /* empty */
        }
    }

    return (
        <>

            <div className={styles.head}>
                <label className={styles.photoLabel} htmlFor="fileUpload">
                    <img className={styles.profilePic} src={
                        userPhoto.length > 0 ? userPhoto : man
                    } alt={"Profile picture"}/>
                    <div className={styles.editIcon}/>
                    <p className={styles.nameText}>{name}</p>
                </label>
                <input hidden id="fileUpload" type="file" name="pic" accept=".jpg, .jpeg, .png"
                       onChange={(e) => handleFileChange(e)}
                />
                <ProfileLeafHead class={styles.leaf1}/>
                <ProfileLeafHead class={styles.leaf2}/>
                <ProfileLeafHead class={styles.leaf3}/>
                <ProfileLeafHead class={styles.leaf4}/>
                <ProfileLeafHead class={styles.leaf5}/>
                <ProfileLeafHead class={styles.leaf6}/>
                <div className={styles.leafTop} />
            </div>
            <div className={styles.form}>
                <p className={styles.textForm}>Username</p>
                <input className={styles.input}
                       type="text"
                       id="username"
                       placeholder={name}
                       value={newName}
                       onChange={(e) => setNewName(e.target.value)}
                />
                <p className={styles.textForm}>Email</p>
                <input className={styles.input}
                       type="text"
                       id="email"
                       placeholder={email}
                       value={newEmail}
                       onChange={(e) => setNewEmail(e.target.value)}
                />
                <button className={styles.logOut}>Log out</button>
            </div>
        </>
    )
}


type MyProps = {
    // using `interface` is also ok
    class: string;
};
function ProfileLeafHead(props: MyProps) {
    return (
        <div className={props.class}>
            <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_114_603)">
                    <path d="M48.8938 0C75.8968 0 97.7871 21.8903 97.7871 48.8933H48.8938V0Z" fill="white"
                          fill-opacity="0.3"/>
                    <path d="M97.7859 97.7866C70.7828 97.7866 48.8926 75.8964 48.8926 48.8933H97.7859V97.7866Z" fill="white"
                          fill-opacity="0.3"/>
                    <path d="M-0.000701904 97.7866C27.0023 97.7866 48.8926 75.8964 48.8926 48.8933H-0.000701904V97.7866Z"
                          fill="white" fill-opacity="0.3"/>
                    <path d="M0.000274658 48.8933C27.0033 48.8933 48.8936 27.003 48.8936 3.05176e-05H0.000274658V48.8933Z"
                          fill="white" fill-opacity="0.3"/>
                </g>
                <defs>
                    <filter id="filter0_b_114_603" x="-3.03312" y="-3.03214" width="103.852" height="103.851"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.51607"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_114_603"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_114_603" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}