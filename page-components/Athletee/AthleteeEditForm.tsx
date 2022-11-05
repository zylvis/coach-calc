import styles from "../../styles/page-components/Athletee/AthleteeEditForm.module.css"
import {useFormik} from "formik";
import { useEffect, useState } from "react";
import ConvertToBase64 from "../../Helpers/ConvertAndResizeToBase64"
import FormatDate from "../../Helpers/FormatDate"
import axios from "axios";
import DateStrToDate from "../../Helpers/DateStrToDate"
import FormatDateTOYYYYMMDD from "../../Helpers/FormatDateToYYYYMMDD";

interface IAthletee{
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

    console.log(athleteeObj)

    const [image, setImage] = useState(athleteeObj.image)
    const [success, setSuccess] = useState("");



    const addPut = (obj: IAthletee) => {
        axios.put(`${process.env.API_URL}/api/Athletee/${athleteeObj.id}`, obj)
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
            error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
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
            image: athleteeObj.image,
            height: athleteeObj.height,
            weight: athleteeObj.weight,
            phone: athleteeObj.phone,
            email: athleteeObj.email,
            address: athleteeObj.address
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

            <label className={styles.label} htmlFor="firstName">
                <input
                    className={styles.input}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <span className={styles.span}>First Name*</span>
            </label>
            {formik.errors.firstName ? <div className={styles.error}>{formik.errors.firstName}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="lastName">
                <input
                    className={styles.input}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                <span className={styles.span}>Last Name*</span>
            </label>
            {formik.errors.lastName ? <div className={styles.error}>{formik.errors.lastName}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="birthDate">
            <input
                    className={styles.input}
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    placeholder="Birth Date"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    min="1900-01-01"
                    max={FormatDateTOYYYYMMDD(new Date())}
                />
                <span className={styles.span}>Birth Date*</span>
            </label>
            
            <label className={styles.label} htmlFor="height">
            <input
                    className={styles.input}
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Height"
                    step="0.001"
                    onChange={formik.handleChange}
                    value={formik.values.height}
                />
                <span className={styles.span}>Height*</span>
            </label>
            {formik.errors.height ? <div className={styles.error}>{formik.errors.height}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="weight">
            <input
                    className={styles.input}
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    step="0.001"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                />
                <span className={styles.span}>Weight*</span>
            </label>
            {formik.errors.weight ? <div className={styles.error}>{formik.errors.weight}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="phone">
            <input
                    className={styles.input}
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                <span className={styles.span}>Phone*</span>
            </label>
            {formik.errors.phone ? <div className={styles.error}>{formik.errors.phone}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="email">
            <input
                    className={styles.input}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <span className={styles.span}>Email*</span>
            </label>
            {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : <div className={styles.error}></div>}

            <label className={styles.label} htmlFor="address">
            <input
                    className={styles.input}
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                <span className={styles.span}>Address*</span>
            </label>
            {formik.errors.address ? <div className={styles.error}>{formik.errors.address}</div> : <div className={styles.error}></div>}

            <div className={styles.buttonscontainer}>
              <button className={styles.button} type="button" onClick={()=>props.editFormHandler(false)}> Cancel</button>
              <button className={styles.button} type="submit">Save</button>
            </div>
            <div className={styles.success}>{success}</div>
          </form>
        </div>
    )

}
export default AthleteeEditForm;

