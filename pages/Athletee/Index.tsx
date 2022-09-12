import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";
import Modal from "../../components/Modal"
import Header from "../../page-components/Athletee/Header";
import Footer from "../../page-components/Athletee/Footer"
import styles from "../../styles/pages/Athletee/Athletee.module.css"


const Athletee: NextPage = () => {
    
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Athletee"
            );
            setData(response.data);
            console.log(response.data);
            setError(null);
          } catch (err: any) {
            setError(err.message);
            console.log(error)
            setData([]);
          } finally {
            setLoading(false);
          }
        };
        getData();

      }, [showForm]);


    const CreateClickHandler = () =>{
        setShowForm(true)
    }

    const ModalHandler = () => {
        setShowForm(false)
    }

    const GetCancelForm = (show: boolean) => {
        setShowForm(show);
    }

    const objForm = {showForm: GetCancelForm};
    const objModal = {showForm: showForm}


    const athleteeForm = <div><AthleteeForm {...objForm}/></div>

    const modal = <div onClick={ModalHandler}><Modal {...objModal}/></div>

    const athletees = data.map((item: any, index: number) =>
    <div className={styles.athletee} key={item.id}>
      <div>{index+1}.</div>
      <div>{item.firstName}</div>
      <div>{item.lastName}</div>
      <div>{item.birthDate}</div>
     
    </div>)


    return(
      <div className={styles.container}>
        <Header/>
        <h1 className={styles.home}> Home </h1>
        <button className={styles.button} onClick={CreateClickHandler}>Create Athletee</button>
        <div>
            {modal}
            { showForm && athleteeForm}
        </div>
        <div className={styles.render}>
          {athletees}
        </div>
        <Footer/>
      
      </div> 
    )
}


export default Athletee;