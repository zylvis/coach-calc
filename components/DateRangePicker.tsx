import { isValidElement, useEffect, useState } from "react";
import moment from 'moment';
import styles from "../styles/components/DateRangePicker.module.css"
import { start } from "repl";


interface IResults {
    id: number,
    athleteeId?: number,
    exerciseId?: number,
    date: string,
    name?: string,
    value: string,
    metricType?: string
}

interface IPickerProps{
    dataToShow: IResults[];
    handleSelectRange: (startDate: string, endDate: string) => void;
}

const DateRangePicker = (props: IPickerProps) => {

      

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [minDate, setMinDate] = useState("")
    const [maxDate, setMaxDate] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{

        const arrDates = props.dataToShow.map(x => moment(x.date));
        setStartDate(moment.min(arrDates).format('YYYY-MM-DD'))
        setEndDate(moment.max(arrDates).format('YYYY-MM-DD'))
        setMinDate(moment.min(arrDates).format('YYYY-MM-DD'))
        setMaxDate(moment.max(arrDates).format('YYYY-MM-DD'))
        

    },[props.dataToShow])

    const changeStartHandler = (event: any) => {
        console.log(event.target.value)
        const start = event.target.value;
        if (moment(start) > moment(endDate)) {
            console.log("bybis")
            setError('"Start" date cannot be more than "End" date')
            setIsValid(false)
            setTimeout(()=>{
                setIsValid(true)
                setError('')
                return
            }, 5000)
        } else if ((moment(start) <= moment(endDate))) {
            setStartDate(start)  
        }
    }

    const changeEndHandler = (event: any) => {
        console.log(event.target.value)
        const end = event.target.value;
        if(moment(end) < moment(startDate)){
            console.log("bybis")
            setIsValid(false)
            setError('"End" date cannot be less than "Start" date')
            setTimeout(()=>{
                setIsValid(true)
                setError('')
                console.log("bybis22")
                return
            }, 5000)        
        } else if (moment(end) >= moment(startDate)) {
            setEndDate(end) 
        }
    }

    const onClickFilter = () => {
        props.handleSelectRange(startDate, endDate)
    }
    const resetHandler = () => {

    }

    return (
        <>     
            <div className={styles.container}>
                {!isValid && <div className={styles.error}>{error}</div>}
                <div className={styles.reset} onClick={onClickFilter}>Filter</div>
                <input type="date" min={minDate} max={maxDate} value={startDate} onChange={(event)=>changeStartHandler(event)}/> -
                <input type="date" min={minDate} max={maxDate} value={endDate} onChange={(event)=>changeEndHandler(event)}/>
                <div className={styles.reset} onClick={resetHandler}>Reset</div>
            </div>
        </>
    )
}
export default DateRangePicker;