import Modal from "../../components/Modal";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/Menu.module.css"
import IChart from "../../icons/IChart.svg"

interface IMenuProps{
    menuHandler: (show:boolean, actuin: string) => void
}

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    height: number,
    weight: number,
    phone: string,
    email: string,
    address: string,
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
                    <div className={styles.menuitemresults} onClick={()=>props.menuHandler(false, "results")}><IChart fill="white"/></div>
                </div>
                <div className={styles.detailscontainer}>

                        <div className={styles.image}
                                style={ athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                        </div>
                        <div className={styles.age}>({ConvertBirthDateToAge(athleteeObj.birthDate)})</div>

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
                            <div>{athleteeObj.weight}</div>
                        </div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>Height</b></label>
                            <div>{athleteeObj.height}</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>Phone Nr.</b></label>
                            <div>{athleteeObj.phone}</div>
                        </div>
                    </div>
                    <div className={styles.detailsitemcontainer}>
                        <div className={styles.item}>
                            <label><b>Email</b></label>
                            <div>{athleteeObj.email}</div>
                        </div>
                        <div className={styles.item}>
                            <label><b>Address</b></label>
                            <div>{athleteeObj.address}</div>
                        </div>
                    </div>
                    <div className={styles.delete} onClick={()=>props.menuHandler(false, "delete")}>Delete</div>

                </div>
            </div>
        </>
    )
}
export default Menu;