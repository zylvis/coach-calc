import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import styles from "../../styles/pages/Exercises/Exercises.module.css"

const Exercises = () => {
    return (
        <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Header/>
                    <h1 className={styles.exercises}>Exercises</h1>
                </div>
            <Footer/>
        </div>
    )
}

export default Exercises;