import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect } from 'react'
import userAuth from '../Helpers/userAuth'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

useEffect(()=>{

if (userAuth() == true){
  console.log(JSON.stringify(userAuth()))
  console.log("dsf")
  Router.push("/Athletee")
}

},[])

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
              <div className={styles["l-mode"]}>LOG IN WITH GOOGLE</div>
          </div>
          <div className={styles["login-mode"]}>
            {/* <Comp-icons-facebook className="login-icon" />*/}
              <div className={styles["l-mode"]}>LOG IN WITH FACEBOOK</div>
          </div>
          <div className={styles["login-mode"]}>
            {/*<Comp-icons-email className="login-icon" />*/}
            <Link href="/Login">
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
