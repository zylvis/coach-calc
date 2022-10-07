import styles from "../../styles/page-components/Athletee/AddResults.module.css"
import {useFormik} from "formik"
import { useEffect, useState } from "react"
import axios from "axios"
import Exercise from "../../pages/Exercise"

interface IAddResultsProps{
    addResultsHandler: (show:boolean) => void
}
interface IErrors{
    exerciseId: string,
    value: string,
    date: string
}
interface IExercise{
    id?: number,
    name?: string,
    metricType?: string
}

interface IResult{
    athleteeId: number,
    exerciseId: number,
    value: string,
    date: string

}

const AddResults =(props: IAddResultsProps) => {

    const [exercises, setExercises] = useState<IExercise[]>([])
    const [metricType, setMetricType] = useState("")

    const athleteeObj = JSON.parse(localStorage.getItem('athleteeObj') as string);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Exercise"
            );
            setExercises(response.data.result);

            console.log(response.data);
          } catch (err: any) {
            console.log(err)
            alert(err.message)

          } finally {

          }
        };
        getData();

    }, []);

    const handleMetricType = (id: string) => {

        const type: any = exercises.find(item => item.id === parseInt(id))
        setMetricType(type.metricType)
        formik.values.value =  type.metricType=="Time"? "00:00:00" : "0"
    }

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = async (values: IResult) => {

        await sleep(500);
        const errors = {} as IErrors;
        if (values.exerciseId == 0) {
            errors.exerciseId = "Please choose exercise";
        }
        if (values.value == "00:00:00" || values.value == "0"){
            errors.value = "Please enter value"
        }
        if (values.date == "")
        { errors.date = "Please select date"}

        return errors; 
    };

    const formik = useFormik({
        initialValues: {
            exerciseId: 0,
            athleteeId: athleteeObj.id,
            value: "00:00:00",
            date: ""

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            setMetricType("")
            formik.resetForm();
        },
    });

    const inputTime = <>
                        <label className={styles.label} htmlFor="value">Time(hh:mm:ss)</label>
                        <input
                            className={styles.input}
                            id="value"
                            name="value"
                            type="time"
                            step="1"
                            onChange={formik.handleChange}
                            value={formik.values.value}
                        />
                        {formik.errors.value ? <div className={styles.error}>{formik.errors.value}</div> : <div className={styles.error}></div>}  
    </>
    const inputNumber = <>
                        <label className={styles.label} htmlFor="value">Number</label>
                        <input
                            className={styles.input}
                            id="value"
                            name="value"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.value}
                        />
                        {formik.errors.value ? <div className={styles.error}>{formik.errors.value}</div> : <div className={styles.error}></div>}  
    </>

    
    console.log(metricType + "  " + athleteeObj.id) 
    return(
        <div className={styles.container}>
            {athleteeObj.id}
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>
                <div className={styles.image} style={athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                </div>

                <select className={styles.select}
                        name="exerciseId"
                        id="exerciseId"
                        onChange={(event)=>{formik.handleChange(event);handleMetricType(event.target.value)}}
                        value={formik.values.exerciseId}
                        >
                    <option value="0" disabled>Choose exercise</option>
                    {exercises.map((item) =>{
                        return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        )
                    })}
                </select>
                <div className={styles.metricinput}>
                    {metricType=="Time" && inputTime}
                    {metricType=="Number" && inputNumber}
                </div>

                <label className={styles.label} htmlFor="date">Date</label>
                <input
                    className={styles.input}
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                />
                {formik.errors.date ? <div className={styles.error}>{formik.errors.date}</div> : <div className={styles.error}></div>}  


                <div>
                    <button className={styles.button} type="button" onClick={()=>props.addResultsHandler(false)}> Cancel</button>
                    <button className={styles.button} type="submit">Save</button>
                </div>
                <div className={styles.success}>Success</div>

            </form>
        </div>
    )
}
export default AddResults;