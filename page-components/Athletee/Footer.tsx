import styles from "../../styles/page-components/Athletee/Footer.module.css"
import IHome from "../../icons/IHome.svg"
import ISwiming from "../../icons/ISwiming.svg"
import IRuning from "../../icons/IRuning.svg"
import IDumbell from "../../icons/IDumbell.svg"
import IPulse from "../../icons/IPulse.svg"
import Link from "next/link"


const Footer = () => {
    return(
        <div className={styles.container}>
            <Link href="/Athletee">
                <div className={styles.iexercises}>
                    <div className={styles.ihome}>
                        <IHome fill={'#000000'}/>
                    </div>
                    <div>Home</div>
                </div>
            </Link>
            
            <Link href="/Exercise">
                <div className={styles.iexercises}>
                    <div className={styles.icoinline}>
                        <ISwiming fill={'#000000'}/>
                        <IRuning fill={'#65655E'}/>
                    </div>
                    <div className={styles.icoinline}>
                        <IDumbell fill={'#65655E'}/>
                        <IPulse fill={'#000000'}/>
                    </div>
                    <div>Exercises</div>
                </div>
            </Link>
        </div>
    )
}
export default Footer;