import styles from "../../styles/page-components/Athletee/Header.module.css"
import parseJWT from "../../Helpers/parseJWT";
import { useEffect, useState } from "react";
import User from "../../components/User";

const Header = () => {

    const [name, setName] = useState("-");
    const [showUser, setShowUser] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('coachCalcUserToken')?.toString();
        if(token){
            const userObj = parseJWT(token);
            setName(userObj.name)
        }
    }, [])

    const handleShowUser = (show: boolean) => {
        setShowUser(show)
    }

    const userPrpsObj = {handleShowUser: handleShowUser}

    return(
        <>
            {showUser && <User {... userPrpsObj}/>}
            <div className={styles.container}>
                <div className={styles.profile} onClick={()=>setShowUser(true)}>{name[0].toUpperCase()}</div>
            </div>
        </>
    )
}
export default Header;