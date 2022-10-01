
import { useState } from "react";
import styles from "../styles/components/Modal.module.css"

const Modal = () =>{

    const modal =  <div className={styles.container}></div>
    
    return (
        <>
            {modal}
        </>
    )
}

export default Modal;