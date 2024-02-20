import styles from './Navbar.module.scss';
export default function Navbar(){


  return (
    <div className={styles.container}>
      <div className={styles.helloContainer}>
          <h1 className={styles.text1}>Hello Varun,</h1>
          <h2 className={styles.text2}>You have work today</h2>
      </div>
      <div className={styles.profilePic}></div>
    </div>
  )
}