import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios"
import AthleteeForm from "../../page-components/Athletee/AthleteeForm";


const Athletee: NextPage = () => {

    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const CreateClickHandler = () =>{
        setShowForm(true)
    }

    const GetCancelForm = (show: boolean) => {
        setShowForm(show)
    }

    const obj = {showForm: GetCancelForm};

    const athleteeForm = <div><AthleteeForm {...obj}/></div>

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
            setData(null);
          } finally {
            setLoading(false);
          }
        };
        getData();
      }, []);

    const athletees = data.map((item: any) =>
    <li>{item.FirstName}</li>)

    return(
       <div>
        <button onClick={CreateClickHandler}>Create Athletee</button>
        { showForm && athleteeForm}
        
     
       </div> 
    )
}


export default Athletee;