import Search from "../../components/Search"
import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import styles from "../../styles/pages/Exercises/Exercises.module.css"

const Exercises = () => {
    const createClickHandler = () => {
        
    }

    const getText = (show: string) => {

    }

    const searchObj = {getText: getText}
    return (
        <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Header/>
                    <div className={styles.exercises}>Exercises</div>
                    <div className={styles["btn-search-container"]}>
                        <button className={styles.button} onClick={createClickHandler}>+ Create</button>
                        <div className={styles.search} > <Search {...searchObj}/></div>
                    </div>
                    <div className={styles.count}> Total (xx)</div>
                </div>
            <Footer/>
        </div>
    )
}

export default Exercises;