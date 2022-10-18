import styles from "../../styles/page-components/Athletee/AddResults.module.css"
import {useFormik} from "formik"
import { useEffect, useState } from "react"
import axios from "axios"
import Exercise from "../../pages/Exercise"
import Modal from "../../components/Modal"

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
    const [success, setSuccess] = useState("")


    const athleteeObj = JSON.parse(localStorage.getItem('athleteeObj') as string);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `${process.env.API_URL}/api/Exercise`
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

    const client = axios.create({
        baseURL: `${process.env.API_URL}/api/Result`
      });

    const addPost = (obj: IResult) => {
        client
           .post('', obj)
           .then((response) => {
              console.log(response.data)
              setSuccess("Success");
              setTimeout(() => {
              setSuccess("");
              props.addResultsHandler(false)
              }, 2000);
           }).catch((error) => {
            console.log(error);
            alert(error.response.data.Message[0])
            
         });
      };

    const handleMetricType = (id: string) => {

        const type: any = exercises.find(item => item.id === parseInt(id))
        setMetricType(type.metricType)
        formik.values.value =  type.metricType=="Time"? "00:00:00" : "0"
    }
    const handleTimeInput = (time: string): string => {

        const parts = time.split(/:/);
        const timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                            (parseInt(parts[1], 10) * 60 * 1000) + 
                            Math.round(parseFloat(parts[2]) * 1000)                
                            console.log(timePeriodMillis.toString())
        return timePeriodMillis.toString()
    }

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = async (values: IResult) => {

        await sleep(500);
        const errors = {} as IErrors;
        if (values.exerciseId == 0) {
            errors.exerciseId = "Please choose exercise";
        }
        if (values.value == "00:00:00" || values.value == "0" ||  values.value == ""){
            errors.value = "Please enter value"
        }
        if (values.date == "")
        { errors.date = "Please select date"}

        return errors; 
    };

    const formik = useFormik({
        initialValues: {
            exerciseId: 0,
            athleteeId: athleteeObj.id as number,
            value: "00:00:00",
            date: ""

        },
        validate,
        onSubmit: (values) => {
            values.exerciseId = parseInt(values.exerciseId.toString());
            if(metricType == "Time"){
                values.value = handleTimeInput(values.value)
            }
            values.value = values.value.toString();
            alert(JSON.stringify(values));
            addPost(values);
            setMetricType("");
            formik.resetForm();
        },
    });

    const inputTime = <>
                        <label className={styles.label} htmlFor="value">Time(hh:mm:ss:ms)</label>
                        <input
                            className={styles.input}
                            id="value"
                            name="value"
                            type="time"
                            step="0.01"
                            onChange={formik.handleChange}
                            value={formik.values.value}
                        />
                        {formik.errors.value ? <div className={styles.error}>{formik.errors.value}</div> : <div className={styles.error}></div>}  
    </>
    const inputNumber = <>
                        <label className={styles.label} htmlFor="value">Number</label>
                        <input
                            className={styles.inputnumber}
                            id="value"
                            name="value"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.value}
                        />
                        {formik.errors.value ? <div className={styles.error}>{formik.errors.value}</div> : <div className={styles.error}></div>}  
    </>

    return (
        <>  
            <Modal/>
            <div className={styles.container}>
                <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>
                    <div className={styles.image} style={athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                    </div>

                    <select className={styles.select}
                            name="exerciseId"
                            id="exerciseId"
                            onChange={(event)=>{formik.handleChange(event); handleMetricType(event.target.value)}}
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
                    <div className={styles.success}>{success}</div>

                </form>
            </div>
        </>
    )
}
export default AddResults;