import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/components/Modal.module.css"

interface ModalProps {

    showForm: boolean
  
  }

const Modal: React.FC<ModalProps> = (props) =>{

    const [showModal, setShowModal] = useState(false);
    
    

    const modal =  <div className={styles.container}></div>

    return (
        <>
            {props.showForm && modal}
        </>
    )
}

export default Modal;