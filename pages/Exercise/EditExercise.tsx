import axios from "axios";
import {useFormik} from "formik"
import router, { Router } from "next/router";
import { useState } from "react";
import Modal from "../../components/Modal";
import styles from "../../styles/page-components/Exercise/ExerciseForm.module.css"
import {useRouter} from "next/router"

interface IExercise {
    id: number,
    name?: string
}
interface IFormProps{
    showFormHandler: (show: boolean) => void;
    getPost: (obj: {id: number, name: string}) => void
}


const EditExercise = (props: IFormProps) => {

    const [success, setSuccess] = useState("");

    const {query: {id, name}} = router;
    const objIncoming = {
        id: parseInt(id as string),
        name: name?.toString()
    }

    console.log(objIncoming)
    
    
    const addPut = (obj: IExercise) => {
        axios.put(`https://localhost:7104/api/Exercise/${obj.id}`, obj)
        .then(response => {
            console.log(response.data)
                        setSuccess("Success");
            setTimeout(() => {
                setSuccess("");
                router.push("/Exercise")
            }, 500);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

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
            id: parseInt(id as string),
            name: name?.toString()

        },
        validate,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            addPut(values)
        },
    });
    return (
        <>  <Modal/>
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

                    <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>router.push("/Exercise")}>Cancel</button></span>
                    <div className={styles.success}>{success}</div>
                </form>
                
            </div>
        </>
    );
}
export default EditExercise;