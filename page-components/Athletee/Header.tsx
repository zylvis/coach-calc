import styles from "../../styles/page-components/Athletee/Header.module.css"
import Logout from "../../icons/Logout.svg"
import Router from "next/router";
import userAuth from "../../Helpers/userAuth";

const Header = () => {

    
    const logoutHandler = () => {
        localStorage.removeItem("coachCalcUserToken");
        Router.push("/")
    }

    return(
        <div className={styles.container}>
            <div className={styles.profile}></div>
            <div className={styles.logoutcontainer} onClick={logoutHandler}>
              <Logout className={styles.logout}/>
                <div></div>
            </div>  
        </div>
    )
}
export default Header;