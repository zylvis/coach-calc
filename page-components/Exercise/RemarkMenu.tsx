import Modal from "../../components/Modal";
import styles from "../../styles/page-components/Exercise/RemarkMenu.module.css"

interface IRemarkMenuProps{
    editHandler: (show: boolean, action: string) => void
}

const RemarkMenu = (props: IRemarkMenuProps) => {
    return (
        <>
            <Modal/>
            <div className={styles.container}>
                <div className={styles.item} onClick={()=>props.editHandler(false, "edit")}>Edit</div>
                <div className={styles.item} onClick={()=>props.editHandler(false, "delete")}>Delete</div>
                <div className={styles.item} onClick={()=>props.editHandler(false, "cancel")}>Cancel</div>
            </div>
        </>
    )
}

export default RemarkMenu;