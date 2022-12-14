import axios from "axios";
import {useFormik} from "formik"
import {useRouter} from "next/router";
import { useState } from "react";
import Modal from "../../components/Modal";
import styles from "../../styles/page-components/Exercise/ExerciseForm.module.css"

interface IExercise {
    id: number,
    name?: string
}

const EditExercise = () => {

    const [success, setSuccess] = useState("");

    const Router = useRouter();

    const {query: {id, name, metricType}} = Router;
    const objIncoming = {
        id: parseInt(id as string),
        name: name?.toString(),
        metricType: metricType
    }

    console.log(objIncoming)
    
    
    const addPut = (obj: IExercise) => {
        axios.put(`${process.env.API_URL}/api/Exercise/${obj.id}`, obj)
        .then(response => {
            console.log(response.data)
            setSuccess("Success");
            setTimeout(() => {
                setSuccess("");
                Router.push("/Exercise")
            }, 500);
        })
        .catch(error => {
            console.error('There was an error!', error);
            error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
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
            name: name?.toString(),
            metricType: metricType?.toString()

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

                    <div className={styles.radiocontainer}>
                        <div className={styles.choose} hidden>Choose metric type</div>
                        <span className={styles.radioinputcontainer}>
                            <input className={styles.inputradio} type="radio" name="metricType" value="Number" onChange={formik.handleChange} checked={formik.values.metricType == "Number"} disabled/>
                            <label className={styles.radiolabel}>Number</label>
                            <input className={styles.inputradio} type="radio" name="metricType" value="Time" onChange={formik.handleChange} checked={formik.values.metricType == "Time"} disabled/>
                            <label className={styles.radiolabel}>Time</label> 
                        </span>
                        <div className={styles.picked}>{formik.values.metricType}</div>
                    </div> 
                    {formik.errors.metricType ? <div className={styles.error}>{formik.errors.metricType}</div> : <div className={styles.error}></div>}

                    <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>Router.push("/Exercise")}>Cancel</button></span>
                    <div className={styles.success}>{success}</div>
                </form>
                
            </div>
        </>
    );
}
export default EditExercise;