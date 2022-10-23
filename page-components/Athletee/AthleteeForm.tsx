import { useState } from "react";
import styles from "../../styles/page-components/Athletee/AthleteeForm.module.css"
import axios from "axios"
import ConvertToBase64 from "../../Helpers/ConvertAndResizeToBase64"
import Modal from "../../components/Modal";
import DateStrToDate from "../../Helpers/DateStrToDate"
import FormatDateTOYYYYMMDD from "../../Helpers/FormatDateToYYYYMMDD";

interface AthleteeProps {

  ShowForm: (show: boolean) => void
  GetPost: (post: AthleteePost) => void

}

interface AthleteePost {
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

const AthleteeForm: React.FC<AthleteeProps> = (props) => {

    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [birthDate, SetBirthDate] = useState("");
    const [imageString, SetImage] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState("");
     
    const client = axios.create({
      baseURL: `${process.env.API_URL}/api/Athletee`
    });

    const AddPost = (
      firstName: string,
      lastName: string,
      birthDate: string,
      height: number,
      weight: number,
      phone: string,
      email: string,
      address: string,
      image: string) => {

      client
         .post('', {
            FirstName: firstName,
            LastName: lastName,
            BirthDate: birthDate,
            height: height,
            weight: weight,
            phone: phone,
            email: email,
            address: address,
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
          //error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
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
      console.log(firstName + lastName + DateStrToDate(birthDate) + height + weight + phone + email + address + imageString)
      AddPost(firstName, lastName, birthDate, height, weight, phone, email, address, imageString);

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
           
            <label className={styles.label}>First Name*</label>
            <input
              className={styles.input}
              type="text"
              value={firstName}
              onChange={(event) => SetFirstName(event.target.value)}
              required
            ></input>

            <label className={styles.label}>Last Name*</label>
            <input
              className={styles.input}
              type="text"
              value={lastName}
              onChange={(event) => SetLastName(event.target.value)}
              required
            ></input>

            <label className={styles.label}>Birth Date*</label>
            <input
              className={styles.input}
              type="Date"
              value={birthDate}
              onChange={(event) => SetBirthDate(event.target.value)}
              min="1900-01-01"
              max={FormatDateTOYYYYMMDD(new Date())}
              required
            ></input>

            <label className={styles.label}>Height</label>
            <input
              className={styles.input}
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.valueAsNumber)}
            ></input>

            <label className={styles.label}>Weight</label>
            <input
              className={styles.input}
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.valueAsNumber)}
            ></input>

            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            ></input>

            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>

            <label className={styles.label}>Address</label>
            <input
              className={styles.input}
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            ></input>
            
            <div className={styles.buttonscontainer}>
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