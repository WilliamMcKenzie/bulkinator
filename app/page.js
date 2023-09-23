import Image from 'next/image'
import styles from './modulestyle/home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navbar}>
        <h1 className={styles.logo_container}>
          <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
          BULKINATOR
        </h1>
        <div className={styles.navbar_buttons}>
          <a
            href="./excercises"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          />
          <button>
            Home
          </button>
          <button>
            Meals
          </button>
          <button>
            Excercises
          </button>
        </div>
      </div>

      <div className={styles.center}>
        <img></img>
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
      </div>

      <div className={styles.grid}>
        <a
          href="./meals"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Plan Meals <span>-&gt;</span>
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
            Find Excercises<span>-&gt;</span>
          </h2>
          <p>It all starts with the gym.</p>
        </a>
      </div>
    </main >
  )
}
