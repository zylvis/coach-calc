import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import styles from "../../styles/pages/Athletee/Details.module.css"

const Details = () => {
    return(
        <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Header/>
                    <div className={styles.details}> Exercise Details</div>
                </div>
            <Footer/>
        </div>
    )
}
export default Details;