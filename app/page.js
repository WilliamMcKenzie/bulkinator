import Image from 'next/image'
import styles from './modulestyle/home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navbar_background}></div>
      <div className={styles.navbar}>
        <h1 className={styles.logo_container}>
          <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
          BULKINATOR
        </h1>
        <div className={styles.navbar_buttons}>
          <a className={styles.highlighted} href="./">
            Home
          </a>
          <a href="./meals">
            Meals
          </a>
          <a href="./exercises">
            Excercises
          </a>
        </div>
        <div className={styles.auth_container}>
          <a className={styles.login} href="./login">
            Login
          </a>
          <a className={styles.register} href="./register">
            Register
          </a>
        </div>
      </div>

      <div className={styles.center_background}></div>
      <div className={styles.center}>
        <div className={styles.center_header}>
          <h1>
            Eat massive
            <br />
            <code className={styles.highlighted}>Lift massive</code>
          </h1>
          <p>
            Bulkinator is a workout and meal planner designed to optimize muscle growth on the bulk, sign up now to get huge in no time.
          </p>
        </div>
        <img ></img>
      </div>

      <div className={styles.grid}>
        <a
          href="./meals"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Find Meals <span>-&gt;</span>
          </h2>
          <p>Cook meals that work for you.</p>
        </a>
        <a
          href="./excercises"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Plan Diet<span>-&gt;</span>
          </h2>
          <p>Organization is power.</p>
        </a>
      </div>
    </main >
  )
}

