import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";
import Header from "../../page-components/Athletee/Header";
import Footer from "../../page-components/Athletee/Footer"
import styles from "../../styles/pages/Athletee/Athletee.module.css"
import Menu from "../../page-components/Athletee/Menu";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import AthleteeEditForm from "../../page-components/Athletee/AthleteeEditForm";
import AddResults from "../../page-components/Athletee/AddResults";
import Results from "../../page-components/Athletee/Results";
import { useLoginContext } from "../../store/useLogincontext";
import  Router  from "next/router";
import parseJWT from "../../Helpers/parseJWT";
import userAuth from "../../Helpers/userAuth";
import AddResultss from "../../page-components/Athletee/AddResultss";

interface IAthletee {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: string,
  height: number,
  weight: number,
  phone: string,
  email: string,
  address: string,
  image: string,
}

const Athletee: NextPage = () => {
    
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddResults, setShowAddResults] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [data, setData] = useState<IAthletee[]>([]);
    const [dataToShow, setDataToShow] = useState<IAthletee[]>([]);
    const [athleteeObj, setAthleteeObj] = useState({} as IAthletee)
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);

    const{isLoggedIn} = useLoginContext()


    useEffect(() => {

      if (!userAuth()) {
        Router.push("/")
      }

      const getData = async () => {
        try {
          const response = await axios.get(
            `${process.env.API_URL}/api/Athletee`
          );
          setDataToShow(response.data.result);
          setData(response.data.result);
          setEmptyData(response.data.result.length == 0)
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

    }, [showEditForm]);
 

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
      setEmptyData(false)
    }

    const searchHandler = (event: any) => {      
      setDataToShow(data.filter(item => item.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      || item.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      ));
    }

    const onAthleteeClick = (item: IAthletee) => {
      setShowMenu(true)
      setAthleteeObj(item)
      localStorage.setItem('athleteeObj', JSON.stringify(item));
    }

    const onResultsClick = (item: IAthletee) =>{
      setShowResults(true)
      setAthleteeObj(item)
      localStorage.setItem('athleteeObj', JSON.stringify(item));
    }

    const menuHandler = (show: boolean, action: string) =>{
      setShowMenu(show)
      if(action == "delete"){
        if(confirm("Delete Athletee and all data?")){
          axios.delete(`${process.env.API_URL}/api/Athletee/${athleteeObj.id}`)  
          .then(res => {  
            console.log(res.data); 
            const posts = dataToShow.filter(item => item.id !== athleteeObj.id);  
            setDataToShow(posts);  
            setEmptyData(posts.length == 0)
          }).catch( error =>
            console.log(error)
          )
        }
      }
      if(action=="edit"){
        setShowEditForm(true)
      }
      if(action=="results"){
        setShowResults(true);
      }
    }

    const editFormHandler = (show: boolean) =>{
      setShowEditForm(show);
      setShowMenu(true);
    }
    const addResultsHandler = (show: boolean) =>{
      setShowAddResults(show)
    }

    const resultsHandler = (show: boolean) => {
      setShowResults(show)
    }

    const objFormProps = {ShowForm: GetCancelForm, GetPost: GetPost};
    const objMenuProps = {menuHandler: menuHandler};
    const objEditMenuPrps = {editFormHandler: editFormHandler}
    const objAddResultsProps = {addResultsHandler: addResultsHandler}
    const objResultsProps = {resultsHandler: resultsHandler}

    const addfirstAthletee = <div style={{marginTop: "4rem"}}>Create first Athletee ...</div>
    const loadingAthletees = <div style={{marginTop: "4rem"}}>Loading ...</div>
 
    const athleteeForm = <div><AthleteeForm {...objFormProps}/></div>

    const athletees = dataToShow.map((item: any, index: number) =>
      <div className={styles.athleteecontainer} key={item.id}>
        <div className={styles.athletee}>
          <div className={styles.image} onClick={()=>{onAthleteeClick(item)}} style={item.image.length > 0 ? {backgroundImage: `url(${item.image})`} : {backgroundImage: `url(./Avatar.png)`}}></div>
          <div className={styles["container-items"]} onClick={()=>{onAthleteeClick(item)}}>
            <div>{item.firstName} {item.lastName}</div>  
          </div>
          <button className={styles.tapforresults} onClick={()=>{onResultsClick(item)}}>Results</button>
        </div>
        <button className={styles.addresults} onClick={()=>{setShowAddResults(true); localStorage.setItem('athleteeObj', JSON.stringify(item))}}>Add Results</button>
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
            {emptyData && addfirstAthletee}
            {loading && loadingAthletees}
              <div >
                {athletees}
              </div>
          </div>
          <Footer/>
        </div>        
      </>)

    return(
      <>
        {athletee}
        {showForm && athleteeForm}
        {showMenu && <Menu {...objMenuProps}/>}
        {showEditForm && <AthleteeEditForm {... objEditMenuPrps}/>}
        {/* {showAddResults && <AddResults {...objAddResultsProps}/>} */}
        {showResults && <Results {...objResultsProps }/>}
        {showAddResults && <AddResultss {...objAddResultsProps}/>}
      </>
    )
}

export default Athletee;