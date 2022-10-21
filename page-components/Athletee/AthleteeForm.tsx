import { useState } from "react";
import styles from "../../styles/page-components/Athletee/AthleteeForm.module.css"
import axios from "axios"
import ConvertToBase64 from "../../Helpers/ConvertAndResizeToBase64"
import Modal from "../../components/Modal";
import DateStrToDate from "../../Helpers/DateStrToDate"

interface AthleteeProps {

  ShowForm: (show: boolean) => void
  GetPost: (post: AthleteePost) => void

}

interface AthleteePost {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  height: number,
  weight: number,
  phone: string,
  email: string,
  address: string,
  image: string,
}

const AthleteeForm: React.FC<AthleteeProps> = (props) => {

    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [birthDate, SetBirthDate] = useState("");
    const [imageString, SetImage] = useState("");
    const [success, setSuccess] = useState("");
     
    const client = axios.create({
      baseURL: `${process.env.API_URL}/api/Athletee`
    });

    const AddPost = (firstName: string, lastName: string, birthDate: Date, image: string) => {
      client
         .post('', {
            FirstName: firstName,
            LastName: lastName,
            BirthDate: birthDate,
            Image: image
         })
         .then((response) => {
            console.log(response.data)
            props.GetPost(response.data.result)
            setSuccess("Success");
            setTimeout(() => {
            setSuccess("");
            props.ShowForm(false)
            }, 2000);
         }).catch((error) => {
          console.log(error);
          error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
       });
    };

    const CancelButtonHandler = () => {
      props.ShowForm(false)
    }

    const ImageHandler = async (event: any) => {
      try {
      const files = event.target.files;
      const file = files[0];
      SetImage(await ConvertToBase64(file));
      //console.log(await ConvertToBase64(file))
      }
      catch(err)  {
        alert(err);
      }
    }

    const FormHandler = (event: any) =>{
      
      event.preventDefault();
      
      AddPost(firstName, lastName, DateStrToDate(birthDate), imageString);

      SetFirstName("");
      SetLastName("");
      SetBirthDate("");
      SetImage("");
    }

    return (
      <>
        <Modal/>
        <div className={styles.container}>

          <form onSubmit={FormHandler}>
            <div className={styles["upload-container"]} style={ imageString.length !== 0 ? {backgroundImage: `url(${imageString})`} : {backgroundImage: `url(./Avatar.png)`}}>  
              <label className={styles["upload-label"]}>
                <input type="file" onChange={ImageHandler} accept="image/png, image/jpeg" style={{display:"none"}}></input>
                Upload
              </label>
            </div>
           
            <label>First Name*</label>
            <input
              className={styles.input}
              type="text"
              value={firstName}
              onChange={(event) => SetFirstName(event.target.value)}
              required
            ></input>
            <label>Last Name*</label>
            <input
              className={styles.input}
              type="text"
              value={lastName}
              onChange={(event) => SetLastName(event.target.value)}
              required
            ></input>
            <label>Birth Date*</label>
            <input
              className={styles.input}
              type="Date"
              value={birthDate}
              onChange={(event) => SetBirthDate(event.target.value)}
              required
            ></input>
            
            <div>
              <button className={styles.button} type="button" onClick={CancelButtonHandler}> Cancel</button>
              <button className={styles.button} type="submit">Save</button>
            </div>
            <div className={styles.success}>{success}</div>
          </form>

        </div>
      </>
    );
}
export default AthleteeForm;