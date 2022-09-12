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
    const [dataLoadCount, setDataLoadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Athletee"
            );
            setData(response.data);
            console.log(response.data);
          } catch (err: any) {
            console.log(err.message)
            alert(err.message)
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

    const LoadCount = (count: number) => {
      console.log(count)
      let temp = dataLoadCount + count;
      console.log(temp)
      setDataLoadCount(temp);
      console.log(dataLoadCount)
      window.location.reload();
    }

    const ConvertBirthDateToAge = (date: string) : number => {

      const tmpDate = new Date(date)

      const deltaDate = Date.now() - tmpDate.getTime();
      
      const age = new Date(deltaDate).getFullYear() - 1970;

      return age;
    }

    const objForm = {showForm: GetCancelForm, counter: LoadCount};

    const objModal = {showForm: showForm}

    const athleteeForm = <div><AthleteeForm {...objForm}/></div>

    const modal = <div onClick={ModalHandler}><Modal {...objModal}/></div>

    const athletees = data.map((item: any, index: number) =>
    <div className={styles.athletee} key={item.id}>
      <div>{index+1}.</div>
      <div className={styles.image}></div>
      <div className={styles.containerItems}>
        <span>Name: {item.firstName} {item.lastName}</span>
        <div>Age: {ConvertBirthDateToAge(item.birthDate)} (years)</div>
      </div>
    </div>)

    return(
      <div className={styles.container}>
        <Header/>
        <h1 className={styles.home}> Home </h1>
        <button className={styles.button} onClick={CreateClickHandler}>Create Athletee</button>
        <div className={styles.search} > <input type="text" placeholder="Search athletees ..."/></div>
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