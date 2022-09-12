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
                        <IHome fill={'#121212'}/>
                    </div>
                    <div>Home</div>
                </div>
            </Link>
            
            <Link href="/Exercises">
                <div className={styles.iexercises}>
                    <div className={styles.icoinline}>
                        <ISwiming fill={'#121212'}/>
                        <IRuning fill={'#909090'}/>
                    </div>
                    <div className={styles.icoinline}>
                        <IDumbell fill={'#909090'}/>
                        <IPulse fill={'#121212'}/>
                    </div>
                    <div>Exercises</div>
                </div>
            </Link>
        </div>
    )
}
export default Footer;