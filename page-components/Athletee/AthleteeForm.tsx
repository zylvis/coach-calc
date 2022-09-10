import { NextPage } from "next/types";
import { useState } from "react";
import styles from "../../styles/Athletee/AthleteeForm.module.css"
import Modal from "../../components/Modal"
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

interface AthleteeProps {

  showForm: (show: boolean) => void
  
}

const AthleteeForm: React.FC<AthleteeProps> = (props) => {

    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [birthDate, SetBirthDate] = useState("");
 

    const CancelButtonHandler = () => {

      props.showForm(false)
      
    }

    const FormHandler = (event: { preventDefault: () => void; }) =>{

        event.preventDefault();
        
        SetFirstName("");
        SetLastName("");
        SetBirthDate("");

    }

    return (
      <div>
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
      </div>
    );
}
export default AthleteeForm;