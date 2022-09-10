import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Modal.module.css"

const Modal: NextPage = () =>{

    const [showModal, SetShowModal] = useState(false);
    const modal =  <div className={styles.container}></div>

    return (
        <div>
            {showModal && modal}
        </div>
    )
}

export default Modal;