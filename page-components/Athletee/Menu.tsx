import Modal from "../../components/Modal";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/Menu.module.css"

interface IMenuProps{
    menuHandler: (show:boolean, actuin: string) => void
}

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}

const Menu =(props:IMenuProps) =>{

    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);
    return(
        <>
            <Modal/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "back")}>&lt;</div>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "edit")}>Edit</div>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "results")}>Results</div>
                    <div className={styles.menuitem} onClick={()=>props.menuHandler(false, "delete")}>Delete</div>
                </div>
                <div className={styles.detailscontainer}>

                    <div className={styles.item}>
                        <div className={styles.image}
                                style={ athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                        </div>
                        <div>({ConvertBirthDateToAge(athleteeObj.birthDate)})</div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>First Name</b></label>
                            <div>{athleteeObj.firstName}</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>Last Name</b></label>
                            <div>{athleteeObj.lastName}</div>
                        </div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>Birth Date</b></label>
                            <div>{athleteeObj.birthDate}</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>Weight</b></label>
                            <div>70kg</div>
                        </div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>Height</b></label>
                            <div>1.7m</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>Phone Nr.</b></label>
                            <div>625421562</div>
                        </div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>Email</b></label>
                            <div>email@email</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>address</b></label>
                            <div>tokyao</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Menu;