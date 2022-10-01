
import axios from "axios";
import {useFormik} from "formik"
import { useState } from "react";
import styles from "../../styles/page-components/Exercise/ExerciseForm.module.css"

interface IExercise {
    name: string
}
interface IFormProps{
    showFormHandler: (show: boolean) => void;
    getPost: (obj: {id: number, name: string}) => void
}

const ExerciseForm = (props: IFormProps) => {

    const [success, setSuccess] = useState("");
   
    const client = axios.create({
        baseURL: "https://localhost:7104/api/Exercise" 
      });
  
      const AddPost = (objExercise: IExercise) => {
        client
           .post('', objExercise)
           .then((response) => {
              console.log(response.data.result)
              props.getPost(response.data.result)
           }).catch((error) => {
            console.log(error);
         });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = (values : IExercise) => {

        return sleep(500).then(() => {

          const errors = {} as IExercise;

          if (values.name == ""){
              errors.name = "Required"
          }
  
          return errors;
        });
      };
  
    const formik = useFormik({
        initialValues: {
            name: ""

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            AddPost(values);
            setSuccess("Success");
            setTimeout(() => {
                setSuccess("");
                props.showFormHandler(false);
            }, 2000);
            formik.resetForm();
        },
    });
    return (
        <div className={styles.container}>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>

                <label className={styles.label} htmlFor="name">Exercise</label>
                <input
                    className={styles.input}
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : <div className={styles.error}></div>}

                <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>props.showFormHandler(false)}>Cancel</button></span>
                <div className={styles.success}>{success}</div>
            </form>
        </div>
    );
}
export default ExerciseForm;