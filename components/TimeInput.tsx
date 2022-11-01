import { useEffect, useState } from "react";
import styles from "../styles/components/TimeInput.module.css"

interface ITimeInputProps{
    timeInputHandler: (timeMil: number) => void,
    itemTimeValue: number
}

const TimeInput = (props: ITimeInputProps) => {

    

    const date = new Date(props.itemTimeValue)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    const milSeconds = date.getUTCMilliseconds() / 10
    

    const [hh, setHH] = useState<number>(hours);
    const [mm, setMM] = useState<number>(minutes);
    const [ss, setSS] = useState<number>(seconds);
    const [ms, setMS] = useState<number>(milSeconds);
    
    useEffect(()=>{
        setHH(hours)
        setMM(minutes)
        setSS(seconds)
        setMS(milSeconds)
    },[hours, minutes, seconds, milSeconds])

    
    useEffect(()=>{
        let hhMil = hh * 60 * 60 * 1000 | 0
        let mmMil = mm * 60 * 1000 | 0
        let ssMil = ss * 1000 | 0
        let Mil = ms < 10 ? ms * 10 : ms * 10 | 0
    
        let timeMil = hhMil + mmMil + ssMil + Mil
        
        if (props.itemTimeValue != timeMil) {
            props.timeInputHandler(timeMil)
        }

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
            <div  className={styles.timeinputcontainer}>
                <input className={styles.input} value={hh == 0 ? NaN.toString() : hh} min="0" max="59" type="number" onChange={(event)=>setHH(event?.target.valueAsNumber)} placeholder="0"/>:
                <input className={styles.input} value={mm == 0 ? NaN.toString() : mm} min="0" max="59" type="number" onChange={(event)=>setMM(event?.target.valueAsNumber)}  placeholder="0"/>:
                <input className={styles.input} value={ss == 0 ? NaN.toString() : ss} min="0" max="59" type="number" onChange={(event)=>setSS(event?.target.valueAsNumber)}  placeholder="0"/>.
                <input className={styles.input} value={ms == 0 ? NaN.toString() : ms} min="0" max="99" type="number" onChange={(event)=>setMS(event?.target.valueAsNumber)}  placeholder="0"/>
            </div>
        </>
    )
    
}
export default TimeInput;