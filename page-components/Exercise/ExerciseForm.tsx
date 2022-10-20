
import axios from "axios";
import {useFormik} from "formik";
import { useState } from "react";
import Modal from "../../components/Modal";
import styles from "../../styles/page-components/Exercise/ExerciseForm.module.css"

interface IExercise {
    name: string,
    metricType: string
}
interface IFormProps{
    showFormHandler: (show: boolean) => void,
    getPost: (obj: {id: number, name: string, metricType: string}) => void
}

const ExerciseForm = (props: IFormProps) => {

    const [success, setSuccess] = useState("");
   
    const client = axios.create({
        baseURL: `${process.env.API_URL}/api/Exercise`
      });
  
      const AddPost = (objExercise: IExercise) => {
        client
           .post('', objExercise)
           .then((response) => {
                console.log("dffff")
                console.log(response.data.result)
                props.getPost(response.data.result)
                setSuccess("Success");
                setTimeout(() => {
                setSuccess("");
                props.showFormHandler(false);
                }, 2000);
            }).catch((error) => {
                console.log(error);
                error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
            });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = (values : IExercise) => {

        return sleep(500).then(() => {

          const errors = {} as IExercise;

          if (values.name == ""){
              errors.name = "Required"
          }
          if (!values.metricType){
            errors.metricType = "Choose Number or Time"
        }
  
          return errors;
        });
      };
  
    const formik = useFormik({
        initialValues: {
            name: "",
            metricType: ""

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            AddPost(values);
            formik.resetForm();
        },
    });
    return (
        <>  
            <Modal/>
            <div className={styles.container}>
                <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>

                    <label className={styles.label} htmlFor="name">Exercise Name</label>
                    <input
                        className={styles.input}
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : <div className={styles.error}></div>}

                   
                    <div className={styles.radiocontainer}>
                        <div className={styles.choose}>Choose metric type</div>
                        <span className={styles.radioinputcontainer}>
                            <input className={styles.inputradio} type="radio" name="metricType" value="Number" onChange={formik.handleChange} />
                            <label className={styles.radiolabel}>Number</label>
                            <input className={styles.inputradio} type="radio" name="metricType" value="Time" onChange={formik.handleChange}/>
                            <label className={styles.radiolabel}>Time</label> 
                        </span>
                        <div className={styles.picked}>"{formik.values.metricType}"</div>
                    </div> 
                    {formik.errors.metricType ? <div className={styles.error}>{formik.errors.metricType}</div> : <div className={styles.error}></div>}

                    <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>props.showFormHandler(false)}>Cancel</button></span>
                    <div className={styles.success}>{success}</div>
                </form>
            </div>
        </>
    );
}
export default ExerciseForm;