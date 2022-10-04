import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";
import Modal from "../../components/Modal"
import Header from "../../page-components/Athletee/Header";
import Footer from "../../page-components/Athletee/Footer"
import styles from "../../styles/pages/Athletee/Athletee.module.css"
import Link from "next/link";

interface IAthletee {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  image: string,
}

const Athletee: NextPage = () => {
    
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState<IAthletee[]>([]);
    const [dataToShow, setDataToShow] = useState<IAthletee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Athletee"
            );
            setDataToShow(response.data.result);
            setData(response.data.result);
            console.log(response.data);
          } catch (err: any) {
            console.log(err)
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

    const GetCancelForm = (show: boolean) => {
        setShowForm(show);
    }

    const GetPost = (post: IAthletee) => {
      console.log(post)
      setData([post, ...data])
      setDataToShow([post, ...dataToShow])

    }

    const searchHandler = (event: any) => {      
      setDataToShow(data.filter(item => item.firstName.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const ConvertBirthDateToAge = (date: string) : number => {
      const tmpDate: Date = new Date(date)
      const deltaDate: number = Date.now() - tmpDate.getTime();
      const age: number = new Date(deltaDate).getFullYear() - 1970;
      return age;
    }

    const objForm = {ShowForm: GetCancelForm, GetPost: GetPost};

    const addfirstAthletee = <div style={{marginTop: "4rem"}}>Create first Athletee ...</div>
 
    const athleteeForm = <div><AthleteeForm {...objForm}/></div>

    const athletees = dataToShow.map((item: any, index: number) =>
      <div className={styles.athleteecontainer} key={item.id}>
        <Link href="/Athletee/Details">
        <div className={styles.athletee}>
          <div className={styles.image} style={item.image.length > 0 ? {backgroundImage: `url(${item.image})`} : {backgroundImage: `url(./Avatar.png)`}}></div>
          <div className={styles["container-items"]}>
            <div><span><b>Name:</b> {item.firstName} {item.lastName}</span></div>
            <div><b>Age:</b> {ConvertBirthDateToAge(item.birthDate)}</div>     
          </div>
        </div>
        </Link>
        <button className={styles.addresults}>Add Results</button>
      </div>)


    const athletee = 
      (<>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Header/>
            <div className={styles.home}> Home </div>
            <div className={styles["btn-search-container"]}>
              <button className={styles.button} onClick={CreateClickHandler}>+ Create</button>
              <div className={styles.search} > <input type="text" onChange={searchHandler} placeholder="Search..."/></div>
            </div>
            <div className={styles.count}> Total ({dataToShow.length})</div>
          </div>
          
          <div className={styles.render}>
            {data.length == 0 && addfirstAthletee}
              <div >
                {athletees}
              </div>
          </div>
          <Footer/>
        </div>        
      </>)

    return(
      <>    
        {showForm && <Modal/>}
        {showForm && athleteeForm}
        {!showForm && athletee}
      </>
    )
}

export default Athletee;