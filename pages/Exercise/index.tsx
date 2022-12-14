import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import RemarkMenu from "../../page-components/Exercise/RemarkMenu"
import Footer from "../../page-components/Athletee/Footer"
import Header from "../../page-components/Athletee/Header"
import ExerciseForm from "../../page-components/Exercise/ExerciseForm";
import styles from "../../styles/pages/Exercise/Exercise.module.css"
import userAuth from "../../Helpers/userAuth";

interface IExercise {
    id: number,
    name: string,
    metricType: string
}

const Exercise = () => {

    const [data, setData] = useState<IExercise[]>([]);
    const [dataToShow, setDataToShow] = useState<IExercise[]>([]);
    const [showRemarkMenu, setShowRemarkMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editObject, setEditObject] = useState<IExercise>({id: 0, name:"", metricType: ""})
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      if (!userAuth()) {
        Router.push("/")
      }

      const getData = async () => {
        try {
          const response = await axios.get(
            `${process.env.API_URL}/api/Exercise`
          );
          setDataToShow(response.data.result);
          setData(response.data.result);
          setEmptyData(response.data.result.length == 0)
          console.log(response.data.result);
          return
        } catch (err: any) {
          console.log(err.message)
          alert(err.message)
          setData([]);
        } finally {
          setLoading(false);
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
      setEmptyData(dataToShow.length == 0)
    }

    const editHandler = (show: boolean, action: string) => {

      setShowRemarkMenu(show);
      console.log(editObject)
      if(action == "edit"){
        Router.push(
          {
            pathname: "/Exercise/EditExercise",
            query: {
              id: editObject.id,
              name: editObject.name,
              metricType: editObject.metricType
            }
          }
        )
      }
      
      if (action=="delete") {
        if(confirm("Delete Exercsise?")){
          axios.delete(`${process.env.API_URL}/api/Exercise/${editObject.id}`)  
          .then(res => {  
            console.log(res.data); 
            const posts = dataToShow.filter(item => item.id !== editObject.id);  
            setDataToShow(posts);
            setEmptyData(posts.length == 0)
          }).catch( error =>
            console.log(error)
          )
        }
      }
    }

    const getEditObj = (id: number, name: string, metricType: string) => {
      setShowRemarkMenu(true)
      setEditObject({id: id, name: name, metricType: metricType})
      console.log(id)
    }

    const objFormProps = {showFormHandler: showFormHandler, getPost: getPost}
    const objRemarkMenuProps = {editHandler: editHandler}

    const addfirstExercise = (<div style={{marginTop: "4rem"}}>Create first Exercise ...</div>)
    const loadingAthletees = <div style={{marginTop: "4rem"}}>Loading ...</div>

    const exercises = dataToShow?.map((item: IExercise) => 
    <div className={styles.exercise} key={item.id} onClick={()=>{getEditObj(item.id, item.name, item.metricType)}}>
        <div className={styles["container-items"]}>
          <div className={styles.item}>
            <div>{item.name}</div>
            <div className={styles.metrictype}>type: {item.metricType}</div>
          </div>
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
              <div className={styles.count}> Total ({dataToShow?.length})</div>
            </div>
            <div className={styles.render}>
              {emptyData && addfirstExercise}
              {loading && loadingAthletees}
            
              <div >
                {exercises}
              </div>

          </div>
            <Footer/>
        </div>
        {showRemarkMenu && <RemarkMenu {...objRemarkMenuProps}/>}
        {showForm && <ExerciseForm {...objFormProps}/>}
      </>
    )
}

export default Exercise;