import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";
import Modal from "../../components/Modal"


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



      }, [loadCount]);




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

    const athletees = data.map((item: any) =>
    <li key={item.id}>{item.lastName} {item.firstName} {item.birthDate}</li>)



    return(
       <>
        <button onClick={CreateClickHandler}>Create Athletee</button>
        <div>
            {modal}
            { showForm && athleteeForm}
        </div>
            
        {athletees}
     
       </> 
    )
}


export default Athletee;