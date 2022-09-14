import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import styles from "../../styles/pages/Exercises/Details.module.css"

const Details = () => {
    return(
        <div className={styles.container}>
            <Header/>
            <h1 className={styles.details}>Details</h1>
            <Footer/>
        </div>
    )
}
export default Details;