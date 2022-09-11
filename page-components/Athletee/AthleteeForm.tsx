import { useState } from "react";
import styles from "../../styles/page-components/Athletee/AthleteeForm.module.css"
import axios from "axios"

interface AthleteeProps {

  showForm: (show: boolean) => void

}

interface AthleteePost {
  FirstName: string,
  LastName: string,
  BirthDate: string
}

const AthleteeForm: React.FC<AthleteeProps> = (props) => {

    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [birthDate, SetBirthDate] = useState("");
    const [posts, setPosts] = useState({});
 
    const client = axios.create({
      baseURL: "https://localhost:7104/api/Athletee" 
    });

    const CancelButtonHandler = () => {

      props.showForm(false)
      
    }

    const addPosts = (firstName: string, lastName: string, birthDate: string) => {
      client
         .post('', {
            FirstName: firstName,
            LastName: lastName,
            BirthDate: birthDate
         })
         .then((response) => {
            setPosts(response.data);
         }).catch((error) => {
          console.log(error);
       });

   };

    const FormHandler = (event: any) =>{
        
      event.preventDefault();
      
      addPosts(firstName, lastName, birthDate);

      SetFirstName("");
      SetLastName("");
      SetBirthDate("");

      props.showForm(false)

    }

    return (
      <>
        <div className={styles.container}>
          <form onSubmit={FormHandler}>
            <label>First Name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => SetFirstName(event.target.value)}
              required
            ></input>
            <label>Last Name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => SetLastName(event.target.value)}
              required
            ></input>
            <label>Birth Date*</label>
            <input
              type="Date"
              value={birthDate}
              onChange={(event) => SetBirthDate(event.target.value)}
              required
            ></input>
            <div>
              <button className={styles.button} type="button" onClick={CancelButtonHandler}> Cancel</button>
              <button className={styles.button} type="submit">OK</button>
            </div>
          </form>
        </div>
      </>
    );
}
export default AthleteeForm;