import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";
import Modal from "../../components/Modal"
import Header from "../../page-components/Athletee/Header";
import Footer from "../../page-components/Athletee/Footer"
import styles from "../../styles/pages/Athletee/Athletee.module.css"
import Search from "../../components/Search"
import Link from "next/link";

interface IAthleteePost {
  id: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  image: string,
  searchColumn: string,
}

const Athletee: NextPage = () => {
    
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState<IAthleteePost[]>([]);
    const [dataToShow, setDataToShow] = useState<IAthleteePost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Athletee"
            );
            setDataToShow(response.data);
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

      }, []);
 

    const CreateClickHandler = () =>{
        setShowForm(true)
    }

    const ModalHandler = () => {
        setShowForm(false)
    }

    const GetCancelForm = (show: boolean) => {
        setShowForm(show);
    }

    const GetPost = (post: IAthleteePost) => {
      setData([post, ...data])
      setDataToShow([post, ...dataToShow])
    }

    const GetSearchText = (text: string) => {
      
      setDataToShow(data.filter(item => item.searchColumn.toLowerCase().includes(text.toLowerCase())));
    }

    const ConvertBirthDateToAge = (date: string) : number => {
      const tmpDate: Date = new Date(date)
      const deltaDate: number = Date.now() - tmpDate.getTime();
      const age: number = new Date(deltaDate).getFullYear() - 1970;
      return age;
    }

    const objForm = {ShowForm: GetCancelForm, GetPost: GetPost};
    const objModal = {showForm: showForm}
    const searchObj = {getText: GetSearchText}

    const athleteeForm = <div><AthleteeForm {...objForm}/></div>

    const modal = <div onClick={ModalHandler}><Modal {...objModal}/></div>

    const athletees = dataToShow.map((item: any, index: number) =>
    <div className={styles.athletee} key={item.id}>
      <div>{index+1}.</div>
      {/* <div className={styles.image}><img className={styles.image} src={`${item.image}`} height="50"></img></div> */}
      <div className={styles.image} style={item.image.length > 0 ? {backgroundImage: `url(${item.image})`} : {backgroundImage: `url(./Avatar.png)`}}></div>
      <div className={styles["container-items"]}>
        <div><span><b>Name:</b> {item.firstName} {item.lastName}</span></div>
        <div><b>Age:</b> {ConvertBirthDateToAge(item.birthDate)} (years)</div>
        {item.searchColumn}
       
      </div>
    </div>)

    return(
      <div className={styles.container}>
        <Header/>
        <h1 className={styles.home}> Home </h1>
        <button className={styles.button} onClick={CreateClickHandler}>Create Athletee</button>
        <div className={styles.search} > <Search {...searchObj}/></div>
        <div>
            {modal}
            { showForm && athleteeForm}
        </div>
        <Link href="/Athletee/Details">
          <div className={styles.render}>
            {athletees}
          </div>
        </Link>
        <Footer/>
      </div> 
    )
}

export default Athletee;