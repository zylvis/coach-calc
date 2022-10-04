import Modal from "../../components/Modal";
import styles from "../../styles/page-components/Athletee/Menu.module.css"

interface IMenuProps{
    menuHandler: (show:boolean, actuin: string) => void
}

const Menu =(props:IMenuProps) =>{
    return(
        <>
            <Modal/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "back")}>&lt;</div>
                    <div className={styles.menuitem}>Edit</div>
                    <div className={styles.menuitem}>Results</div>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "delete")}>Delete</div>
                </div>
            </div>
        </>
    )
}
export default Menu;