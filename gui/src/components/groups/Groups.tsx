import styles from "./Groups.module.css"
export default function Groups() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.block1}>Project</div>
          <div className={styles.block2}>Work</div>
          <div className={styles.block3}>Daily Tasks</div>
          <div className={styles.block4}>Groceries</div>
        </div>
      </div>
    </>
  )
}