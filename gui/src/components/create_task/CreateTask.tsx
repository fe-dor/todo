import styles from "./CreateTask.module.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Select, {ActionMeta, SingleValue} from 'react-select';

const options = [{'All': 'All'}, 'op1', 'op2'];

export default function CreateTask(){

    const navigate = useNavigate();
    const [taskName, setTaskName] = useState("");
    const [userGroups, setUserGroups] = useState([""]);
    const [selectedGroup, setSelectedGroup] = useState("All");

    const handleChange = (newValue: SingleValue<string>) => {
        if (newValue !== null) {
            setSelectedGroup(newValue);
        }
    };


    useEffect(() => {
        axios.get("http://localhost:5000/groups", {
            withCredentials: true
        } ).then((response) => { //TODO: env
            if (response.status == 200){
                const { groups } = response.data
                setUserGroups(groups)
                return
            } else {
                console.log("error on getting groups from server")
                navigate('/sign-in')
            }
        }).catch((error) => {
            console.error('error on getting groups from server:', error);
            navigate('/sign-in')
        })
    }, []);



    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.headerButton}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.68376 9.97272C5.55192 10.1044 5.37321 10.1784 5.18688 10.1784C5.00055 10.1784 4.82184 10.1044 4.69001 9.97272L0.705631 5.98835C0.573959 5.85651 0.5 5.6778 0.5 5.49147C0.5 5.30514 0.573959 5.12643 0.705631 4.9946L4.69001 1.01022C4.82338 0.886088 4.99968 0.818491 5.18185 0.821638C5.36402 0.824785 5.53788 0.898431 5.66688 1.0271C5.79555 1.1561 5.86919 1.32996 5.87234 1.51213C5.87549 1.6943 5.80789 1.8706 5.68376 2.00397L2.89938 4.78835H9.87438C10.0609 4.78835 10.2397 4.86243 10.3716 4.99429C10.5034 5.12615 10.5775 5.30499 10.5775 5.49147C10.5775 5.67795 10.5034 5.85679 10.3716 5.98866C10.2397 6.12052 10.0609 6.1946 9.87438 6.1946H2.89938L5.68376 8.97897C5.81543 9.11081 5.88939 9.28952 5.88939 9.47585C5.88939 9.66218 5.81543 9.84089 5.68376 9.97272Z"
                                fill="#444444"/>
                        </svg>
                    </button>
                    <p className={styles.headerText}>Create a new task</p>
                </div>
                <div className={styles.body}>
                    <div className={styles.block}>
                        <h1 className={styles.textHead}>Task Name</h1>
                        <input className={styles.input}
                               type="text"
                               id="username"
                               placeholder="Task Name"
                               value={taskName}
                               onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className={styles.block}>
                        <h1 className={styles.textHead}>Category</h1>
                        <Select
                            defaultValue={options[0]}
                            onChange={handleChange}
                            options={options}
                        />
                        {/*<select value={selectedGroup} onChange={handleChange} className={styles.select}>
                            {userGroups?.map((item) => (
                                <option className={styles.option} value={item}>{item}</option>
                            ))}
                        </select>*/}
                    </div>
                </div>

            </div>
        </>
    )
}