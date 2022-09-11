import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/pages/Athletee/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["login-container"]}>
        <div className={styles["login-header"]}>coachCalc</div>
        <div className={styles["login-block"]}>
          <div className={styles["terms-text"]}>
            By clicking LOG IN, you agree with our Terms.
          </div>
          <div className={styles["login-mode"]}>
            {/* <Comp-icons-google className="login-icon" />*/}
            <Link href="/Athletee">
              <div className={styles["l-mode"]}>LOG IN WITH GOOGLE</div>
            </Link>
          </div>
          <div className={styles["login-mode"]}>
            {/* <Comp-icons-facebook className="login-icon" />*/}
            <Link href="/Athletee">
              <div className={styles["l-mode"]}>LOG IN WITH FACEBOOK</div>
            </Link>
          </div>
          <div className={styles["login-mode"]}>
            {/*<Comp-icons-email className="login-icon" />*/}
            <Link href="/Athletee">
              <div className={styles["l-mode"]}>LOG IN WITH EMAIL</div>
            </Link>
          </div>
          <div className={styles["trouble-text"]}>Trouble logging in?</div>
        </div>
      </div>
    </div>
  );
}

export default Home
