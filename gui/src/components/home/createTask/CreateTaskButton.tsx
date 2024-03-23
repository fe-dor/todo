import styles from "./CreateTaskButton.module.scss";
import {useNavigate} from "react-router-dom";

export default function CreateTaskButton() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button className={styles.createTaskButton} onClick={() => navigate("/create-task")}>
                Crete new task
            </button>
        </div>
    )

}