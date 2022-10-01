import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import ExerciseForm from "../../page-components/Exercise/ExerciseForm";
import styles from "../../styles/pages/Exercise/Exercise.module.css"

interface IExercise {
    id: number,
    name: string
}
const Exercise = () => {

    const [data, setData] = useState<IExercise[]>([]);
    const [dataToShow, setDataToShow] = useState<IExercise[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Exercise"
            );
            setDataToShow(response.data.result);
            setData(response.data.result);
            console.log(response.data);
            return
          } catch (err: any) {
            console.log(err.message)
            alert(err.message)
            setData([]);
          } finally {
            //setLoading(false);
          }
        };
        getData();

      }, []);


    const showFormHandler = (show: boolean) => {
      setShowForm(show)
    }

    const searchHandler = (event: any) => {      
        setDataToShow(data.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const getPost = (obj: IExercise) => {
      dataToShow.push(obj);
      setDataToShow(dataToShow)
    }

    const objFormProps = {showFormHandler: showFormHandler, getPost: getPost}

    const addfirstExercise = (<div style={{marginTop: "4rem"}}>Create first Exercise ...</div>)
    const athletees = dataToShow.map((item: IExercise) => 
    <div className={styles.exercise} key={item.id}>
      <div className={styles["container-items"]}>
        <div><span> {item.name}</span></div>   
      </div>
    </div>)

    return (
      <>
        
        <div className={styles.container}>
            
            <div className={styles.wrapper}>
                <Header/>
                <div className={styles.exercises}>Exercises</div>
                <div className={styles["btn-search-container"]}>
                    <button className={styles.button} onClick={()=>setShowForm(true)}>+ Create</button>
                    <div className={styles.search} > <input type="text" onChange={searchHandler} placeholder="Search..."/></div>
                </div>
                <div className={styles.count}> Total (xx)</div>
            </div>
            <div className={styles.render}>
            {data.length == 0 && addfirstExercise}
            <Link  href="/Athletee/Details">
              <div >
                {athletees}
              </div>
            </Link>
          </div>
            <Footer/>
        </div>
        {showForm && <Modal/>}
        {showForm && <ExerciseForm {...objFormProps}/>}
      </>
    )
}

export default Exercise;