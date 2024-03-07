import styles from './Profile.module.scss';

export default function Profile(){


    return (
        <>
            <div className={styles.head}>
                <div className={styles.user}>
                    <div className={styles.photo}></div>
                    <div className={styles.name}></div>
                </div>
            </div>
            <div className={styles.form}>

            </div>
        </>
    )
}