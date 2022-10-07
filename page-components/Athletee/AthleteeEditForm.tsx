import styles from "../../styles/page-components/Athletee/AthleteeEditForm.module.css"
import {useFormik} from "formik";
import { useEffect, useState } from "react";
import ConvertToBase64 from "../../Helpers/ConvertAndResizeToBase64"
import FormatDate from "../../Helpers/FormatDate"
import axios from "axios";
import DateStrToDate from "../../Helpers/DateStrToDate"

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}

interface IErrors{
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}

interface IEditProps{
    editFormHandler: (show:boolean)=>void
}

const AthleteeEditForm = (props: IEditProps) => {
    
    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);

    const [image, setImage] = useState(athleteeObj.image)
    const [success, setSuccess] = useState("");



    const addPut = (obj: IAthletee) => {
        axios.put(`https://localhost:7104/api/Athletee/${athleteeObj.id}`, obj)
        .then(response => {
            console.log(response.data)
            localStorage.setItem('athleteeObj', JSON.stringify(formik.values))
            setSuccess("Success");
            setTimeout(() => {
            setSuccess("");
            props.editFormHandler(false)
            }, 600);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const imageHandler = async (event: any) => {
        try {
        const files = event.target.files;
        const file = files[0];
        formik.values.image = await ConvertToBase64(file);
        setImage(await ConvertToBase64(file));
        //console.log(await ConvertToBase64(file))
        }
        catch(err)  {
          alert(err);
        }
    }

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = async (values :  IAthletee) => {

        await sleep(500);
        const errors = {} as IErrors;
        if (values.firstName == "") {
            errors.firstName = "Required";
        }
        if (!values.lastName) {
            errors.lastName = "Required";
        }
        return errors; 
    };
    console.log(athleteeObj.birthDate)
    const formik = useFormik({
        initialValues: {
            id: athleteeObj.id,
            firstName: athleteeObj.firstName,
            lastName: athleteeObj.lastName,
            birthDate: athleteeObj.birthDate,
            image: athleteeObj.image
        },
        validate,
        onSubmit: (values) => {
            addPut(values)
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
        },
    });

    return (
        <div className={styles.container}>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>
            <div className={styles["upload-container"]} style={image.length !== 0 ? {backgroundImage: `url(${image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
              <label className={styles["upload-label"]}>
                <input type="file" onChange={imageHandler} accept="image/png, image/jpeg" style={{display:"none"}}></input>
                Upload
              </label>
            </div>

            <label className={styles.label} htmlFor="firstName">First Name</label>
                <input
                    className={styles.input}
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
            {formik.errors.firstName ? <div className={styles.error}>{formik.errors.firstName}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="lastName">Last Name</label>
                <input
                    className={styles.input}
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
            {formik.errors.lastName ? <div className={styles.error}>{formik.errors.lastName}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="birthDate">Birth Date</label>
            <input
                    className={styles.input}
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                />

            <div>
              <button className={styles.button} type="button" onClick={()=>props.editFormHandler(false)}> Cancel</button>
              <button className={styles.button} type="submit">Save</button>
            </div>
            <div className={styles.success}>{success}</div>
          </form>
        </div>
    )

}
export default AthleteeEditForm;

