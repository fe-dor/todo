import styles from './Profile.module.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import man from "../../assets/man.png";
import ProfileLeaf from "../profileLeaf/ProfileLeaf.tsx";
import {Icon} from "../home/groups/Groups.tsx";

type Group = {
    color: string,
    name: string,
    icon: string
}
export default function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState("");
    const [newUserPhoto, setNewUserPhoto] = useState("");
    const [groups, setGroups] = useState(new Array<Group>);

    useEffect(() => {
        axios.get("http://localhost:5000/profile", {
            withCredentials: true
        }).then((response) => { //TODO: env
            if (response.status == 200) {
                const {username, photo, email, groups} = response.data
                setName(username)
                setEmail(email)
                setUserPhoto(photo)
                setGroups(groups)
                console.log(response.data)
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

    useEffect(() => {
        if (newUserPhoto != '') {
            axios.post("http://localhost:5000/photo",
                {
                    'photo': newUserPhoto
                },{
                    withCredentials: true
                },).then((response) => {
                if (response.status != 200) {
                    alert(response.statusText)
                } else {
                    window.location.reload()
                }
            })
        }
    }, [newUserPhoto]);

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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
                    // Создаем новый объект с измененным разрешением и качеством сжатия
                    setNewUserPhoto(canvas.toDataURL('image/png', 0.8));
                }
            };
        }
    }

    async function logOut() {
        const response = await axios.get("http://localhost:5000/logout", {
            withCredentials: true
        })
        if (response.status == 200) {
            navigate('/sign-in')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.containerBack}>
                    <button className={styles.backButton} onClick={() => navigate('/home')}>
                        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 15L2 8.5L8.5 2" stroke="#3D3A3A" strokeWidth="2.16667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <label className={styles.photoLabel} htmlFor="fileUpload">
                    <img className={styles.profilePic} src={
                        userPhoto.length > 0 ? userPhoto : man
                    } alt={"Profile picture"}/>
                    <div className={styles.editIcon}/>
                </label>
                <p className={styles.nameText}>{name}</p>
                <input hidden id="fileUpload" type="file" name="pic" accept=".jpg, .jpeg, .png"
                       onChange={(e) => handleFileChange(e)}
                />
                <ProfileLeafHead class={styles.leaf1}/>
                <ProfileLeafHead class={styles.leaf2}/>
                <ProfileLeafHead class={styles.leaf3}/>
                <ProfileLeafHead class={styles.leaf4}/>
                <ProfileLeafHead class={styles.leaf5}/>
                <ProfileLeafHead class={styles.leaf6}/>
                <div className={styles.leafTop}/>
            </div>
            <div className={styles.form}>
                <p className={styles.textForm}>Username</p>
                <div className={styles.inputDiv}>
                    <input className={styles.input}
                           type="text"
                           id="username"
                           placeholder={name}
                           value={newName}
                           onChange={(e) => setNewName(e.target.value)}
                    />
                    <svg className={styles.inputIcon} width="14" height="14" viewBox="0 0 14 14" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.7415 9.26925L9.65767 3.35309L8.83283 2.52825L2.91667 8.44442V9.26925H3.7415ZM4.22508 10.4359H1.75V7.96084L8.42042 1.29042C8.52981 1.18106 8.67815 1.11963 8.83283 1.11963C8.98751 1.11963 9.13586 1.18106 9.24525 1.29042L10.8955 2.94067C11.0049 3.05006 11.0663 3.19841 11.0663 3.35309C11.0663 3.50777 11.0049 3.65611 10.8955 3.7655L4.22508 10.4359ZM1.75 11.6026H12.25V12.7693H1.75V11.6026Z"
                            fill="#757575"/>
                    </svg>
                </div>
                <p className={styles.textForm}>Email</p>
                <div className={styles.inputDiv}>
                    <input className={styles.input}
                           type="text"
                           id="email"
                           placeholder={email}
                           value={newEmail}
                           onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <svg className={styles.inputIcon} width="14" height="14" viewBox="0 0 14 14" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.7415 9.26925L9.65767 3.35309L8.83283 2.52825L2.91667 8.44442V9.26925H3.7415ZM4.22508 10.4359H1.75V7.96084L8.42042 1.29042C8.52981 1.18106 8.67815 1.11963 8.83283 1.11963C8.98751 1.11963 9.13586 1.18106 9.24525 1.29042L10.8955 2.94067C11.0049 3.05006 11.0663 3.19841 11.0663 3.35309C11.0663 3.50777 11.0049 3.65611 10.8955 3.7655L4.22508 10.4359ZM1.75 11.6026H12.25V12.7693H1.75V11.6026Z"
                            fill="#757575"/>
                    </svg>
                </div>
                <p className={styles.textForm}>Categories</p>
                <div className={styles.groups}>
                    {groups?.map((item) => (
                        <GroupElem {...item} />
                    ))}
                </div>
                <PlusButton />
                <button className={styles.logOut} onClick={logOut}>Log out</button>
            </div>

            <ProfileLeaf class={styles.botLeaf}/>
        </div>
    )
}

function GroupElem(props: Group) {
    return (
        <button className={styles.groupButton} style={{backgroundColor: props.color}}>
            <div className={styles.iconGroup}><Icon icon={props.icon} color={props.color}/></div>
            <span className={styles.nameGroup}>{props.name}</span>
            <svg className={styles.editIconGroup} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.5605 10.4781L10.167 2.87159L9.1065 1.81109L1.5 9.41759V10.4781H2.5605ZM3.18225 11.9781H0V8.79584L8.57625 0.21959C8.7169 0.0789865 8.90763 0 9.1065 0C9.30537 0 9.4961 0.0789865 9.63675 0.21959L11.7585 2.34134C11.8991 2.48199 11.9781 2.67272 11.9781 2.87159C11.9781 3.07046 11.8991 3.26119 11.7585 3.40184L3.18225 11.9781ZM0 13.4781H13.5V14.9781H0V13.4781Z"
                    fill="#757575"/>
            </svg>
        </button>
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
                          fillOpacity="0.3"/>
                    <path d="M97.7859 97.7866C70.7828 97.7866 48.8926 75.8964 48.8926 48.8933H97.7859V97.7866Z" fill="white"
                          fillOpacity="0.3"/>
                    <path d="M-0.000701904 97.7866C27.0023 97.7866 48.8926 75.8964 48.8926 48.8933H-0.000701904V97.7866Z"
                          fill="white" fillOpacity="0.3"/>
                    <path d="M0.000274658 48.8933C27.0033 48.8933 48.8936 27.003 48.8936 3.05176e-05H0.000274658V48.8933Z"
                          fill="white" fillOpacity="0.3"/>
                </g>
                <defs>
                    <filter id="filter0_b_114_603" x="-3.03312" y="-3.03214" width="103.852" height="103.851"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.51607"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_114_603"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_114_603" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}

function PlusButton() {
    return(
        <button className={styles.blockPlus}>
            <div className={styles.plus}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1" height="21" transform="translate(10)" fill="#757575"/>
                    <rect width="1" height="21" transform="matrix(0 -1 1 0 0 11)" fill="#757575"/>
                </svg>
            </div>
        </button>
    )
}