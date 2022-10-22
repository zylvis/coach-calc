import styles from "../styles/components/User.module.css"
import { useEffect, useState } from "react";
import parseJWT from "../Helpers/parseJWT";
import Modal from "./Modal";
import Logout from "../icons/Logout.svg"
import {useRouter} from "next/router"

interface IUserProps{
    handleShowUser: (show:boolean)=>void
}

const User =(props: IUserProps)=>{

    const router = useRouter();
    const [name, setName] = useState("");

    useEffect(()=>{
        const token = localStorage.getItem('coachCalcUserToken')?.toString();
        if(token){
            const userObj = parseJWT(token);
            setName(userObj.name)
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("coachCalcUserToken");
        props.handleShowUser(false);
        router.push("/")
    }

    return(
        <>
            <Modal/>
            <div className={styles.container}>
                <div className={styles.backbutton} onClick={()=>props.handleShowUser(false)}>&lt;</div>
                <span><span>User: </span>{name}</span>
                <div className={styles.logoutcontainer} onClick={logoutHandler}>
                    <Logout className={styles.logout} fill="#121212"/>
                    <div>Logout</div>
                </div>  
            </div>
        </>
    )

}
export default User;