
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/AddResultss.module.css"
import ITrash from "../../icons/ITrash.svg"
import IBan from "../../icons/IBan.svg"
import TimeInput from "../../components/TimeInput";
import { NextPage } from "next";

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}

interface IResult {
    id: number,
    athleteeId?: number,
    exerciseId: number,
    date: string,
    name?: string,
    value: string,
    metricType?: string
}

interface IExercise{
    id: number,
    name: string,
    metricType: string
}


const AddResultss = () =>{

    const [dataToShow, setDataToShow] = useState<IResult[]>([]);
    const [mainData, setMainData] = useState([] as IResult[]);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [metricTypeInsert, setMetricTypeInsert] = useState("");
    const [showOkInsert, serShowOkInsert] = useState(false)
    const [insertExerciseId, setInsertExerciseId] = useState(0)
    const [metricTypeUpdate, setMetricTypeUpdate] = useState("")
    const [showOkUpdate, setShowOkUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(true)
    const [showBanUpdate, setShowBanUpdate] = useState(false)
    const [activeResultId, setActiveResultId] = useState(0)
    const [dateUpdate, setDateUpadate] = useState("")
    const [updateExerciseId, setUpdateExerciseId] = useState(0)
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const[reloadTrigger, setReloadTrigger] = useState(0)


    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);
    console.log(exercises)
    console.log("metrictype: " +  metricTypeInsert)

    console.log("bybis1")
    console.log(mainData)

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get(
                `${process.env.API_URL}/api/Result`
                );
                
                const responseResult = response.data.result as IResult[]
                const responseResultByAthletee = responseResult.filter((item : IResult) => item.athleteeId == athleteeObj.id);
                setMainData(responseResultByAthletee)
                setDataToShow(responseResultByAthletee);
                
                setEmptyData(responseResultByAthletee.length == 0)

                console.log("response: ")
                console.log(responseResultByAthletee);

            } catch (err: any) {
                console.log(err)
                alert(err.message)
            } finally {
                setLoading(false)
            }
        };
        getData();

      }, [reloadTrigger]);

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

    }, [reloadTrigger]);

    const timeInputHandler = (timeMil: number) =>{

    }
    const handleMetricTypeOnInsert = (event: any) => {
        console.log(exercises)
        const mtype = exercises.filter(x => x.id == event.target.value)[0].metricType
        setMetricTypeInsert(mtype)
    }

    const updateHandlerExercise = (result: IResult) => {

        var foundResultIndex = dataToShow.findIndex(x => x.id == result.id);
        dataToShow[foundResultIndex].exerciseId = result.exerciseId;
        var foundExerciseIndex = exercises.findIndex(x => x.id == result.exerciseId)
        dataToShow[foundResultIndex].name = exercises[foundExerciseIndex].name
        dataToShow[foundResultIndex].metricType = exercises[foundExerciseIndex].metricType
        console.log(dataToShow)
        setDataToShow(dataToShow);
      
        setUpdateExerciseId(result.exerciseId)
        setActiveResultId(result.id)
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
        console.log("update data: " + result.date)
        console.log("update exercise Id: " + result.exerciseId)
        console.log("value: " + result.value)
    }

    
    const updateHandlerDate = (event: any, result: IResult) => {
        event.preventDefault();

        setActiveResultId(result.id)
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
        console.log("update data: " + result.date)
        console.log("update exercise Id: " + result.exerciseId)
        console.log("value: " + result.value)
        console.log("result id: " + result.id)
    }





    const onClickOkUpdate = () =>{
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
    }

    const onClickBanUpdate = () => {
        console.log("bybis2")
        console.log(mainData)
        //setDataToShow(mainData)
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        setReloadTrigger(reloadTrigger + 1)

        
    }

    const timeInputPropsObj = {timeInputHandler: timeInputHandler, itemTimeValue: 0}

    return(
        <>
            
            <div className={styles.container}>
                <div className={styles.back}>&lt;</div>
                <table className={styles.table}>
                    <thead>
                        
                        <tr>
                            <th></th>
                            <th>Exercise</th>
                            <th >Value</th>
                            <th>Date</th>
                            <th></th>
                        </tr>

                        <tr>
                            <th colSpan={5}> Add Result</th>
                        </tr>

                        <tr>
                            <td><div className={styles.ok}>OK</div></td>
                            <td>
                                <select value={insertExerciseId} onChange={(event) => {setInsertExerciseId(parseInt(event.target.value)); handleMetricTypeOnInsert(event)}}>
                                        <option disabled value={0}>Select:</option>
                                        {exercises.map((itemE) =>{
                                            return (
                                                <option value={itemE.id} key={itemE.id}>{itemE.name}</option>
                                            )
                                        })}
                                </select>
                            </td>
                            <td>
                                {metricTypeInsert == "Number" || metricTypeInsert == "" ? <input className={styles.inputnumber} type="number" placeholder="0"/> : <TimeInput { ...{timeInputHandler: timeInputHandler, itemTimeValue: 0}}/>}

                            </td>
                            <td><input type="date"/></td>
                            <td><IBan className={styles.ban} fill="#167dc2"/></td>
                        </tr>
                        <tr>
                            <th colSpan={5}>Results list</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td></td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {dataToShow.map(itemR => <tr key={itemR.id}>
                            <td style={{"width": "8vw"}}>{showOkUpdate && itemR.id == activeResultId && <div className={styles.ok} onClick={onClickOkUpdate}>OK</div>}</td>
                            
                            <td>
                                <select value={itemR.exerciseId}
                                        onChange={(event)=>{
                                            itemR.exerciseId = parseInt(event.target.value);
                                            updateHandlerExercise(itemR);
                                    }}>
                                    {exercises.map((itemE) =>{
                                        return (
                                            <option value={itemE.id} key={itemE.id}>{itemE.name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td >
                               {itemR.metricType == "Number" ? <input defaultValue={itemR.value} className={styles.inputnumber} type="number"/> : <TimeInput { ...{timeInputHandler: timeInputHandler, itemTimeValue: parseInt(itemR.value)}}/>}

                            </td>
                            <td ><input value={itemR.date} type="date" onChange={(event)=>{/*itemR.date=event.target.value;*/ updateHandlerDate(event, itemR)}}/></td>
                            <td style={{"width": "8vw"}}>
                                {showDelete && <ITrash className={styles.trash} fill="#c06363"/>}
                                {showBanUpdate && itemR.id == activeResultId && <div className={styles.ban} onClick={onClickBanUpdate}><IBan  fill="#167dc2" /></div>}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    
                </table>
                <div className={styles.back}>&lt;</div>
            </div>
        </>
    )
}
export default AddResultss;