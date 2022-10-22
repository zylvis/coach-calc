import { useEffect, useState } from "react";
import styles from "../styles/components/TimeInput.module.css"

interface ITimeInputProps{
    timeInputHandler: (timeMil: number) => void
}

const TimeInput = (props: ITimeInputProps) => {

    const [hh, setHH] = useState(NaN);
    const [mm, setMM] = useState<number>(NaN);
    const [ss, setSS] = useState<number>(NaN);
    const [ms, setMS] = useState<number>(NaN);
    const [result, setResult] = useState(NaN);
    const[errorMessage, setErrorMessage] = useState("")
    
    useEffect(()=>{

        let hhMil = hh * 60 * 60 * 1000 | 0
        let mmMil = mm * 60 * 1000 | 0
        let ssMil = ss * 1000 | 0
        let Mil = ms < 10 ? ms * 10 : ms * 10 | 0
    
        let timeMil = hhMil + mmMil + ssMil + Mil
         
        props.timeInputHandler(timeMil)
        console.log(timeMil)
        
        console.log(`Message: ${errorMessage}`)

    },[hh, mm, ss, ms])

    if (hh < 0 || hh > 23 || !Number.isInteger(hh)) {
        setHH(0)
    }
    if (mm < 0 || mm > 59 || !Number.isInteger(mm))  {
        setMM(0)
    }

    if (ss < 0 || ss > 59 || !Number.isInteger(ss)) {
        setSS(0)
    }

    if (ms < 0 || ms > 99 || !Number.isInteger(ms) || ms == NaN) {
        setMS(0)
    }

   
    return (
        <>  
            <label className={styles.label}>Time</label>
            <div  className={styles.container}>
                <input className={styles.input} value={hh == 0 ? NaN.toString() : hh} min="0" max="59" type="number" onChange={(event)=>setHH(event?.target.valueAsNumber)} placeholder="hh"/>:
                <input className={styles.input} value={mm == 0 ? NaN.toString() : mm} min="0" max="59" type="number" onChange={(event)=>setMM(event?.target.valueAsNumber)}  placeholder="mm"/>:
                <input className={styles.input} value={ss == 0 ? NaN.toString() : ss} min="0" max="59" type="number" onChange={(event)=>setSS(event?.target.valueAsNumber)}  placeholder="ss"/>.
                <input className={styles.input} value={ms == 0 ? NaN.toString() : ms} min="0" max="99" type="number" onChange={(event)=>setMS(event?.target.valueAsNumber)}  placeholder="ms"/>
            </div>
        </>
    )
}
export default TimeInput;