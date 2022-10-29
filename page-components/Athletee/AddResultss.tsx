
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
    metricType: string,
    resultId: number
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
    const [updateDate, setUpdateDate] = useState({resultId: 0, date: ""})
    const [updateExercise, setUpdateExercise] = useState({} as IExercise)
    const [updateValue, setUpdateValue] = useState({resultId: 0, value: ""})
    const [updateExerciseId, setUpdateExerciseId] = useState(0)
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const[reloadTrigger, setReloadTrigger] = useState(0)

 

    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);
    console.log(exercises)
    console.log("metrictype: " +  metricTypeInsert)

    console.log("Update date: ")
    console.log(updateDate)

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get(
                `${process.env.API_URL}/api/Result`
                );
                
                const responseResult = response.data.result as IResult[]
                const responseResultByAthletee = responseResult.filter((item : IResult) => item.athleteeId == athleteeObj.id);
                setMainData(JSON.parse(JSON.stringify(responseResultByAthletee)))
                setDataToShow(JSON.parse(JSON.stringify(responseResultByAthletee)));
                
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

    const addPut = (obj: IResult) => {
        axios.put(`${process.env.API_URL}/api/Result/${obj.id}`, obj)
        .then(response => {


        })
        .catch(error => {
            console.error('There was an error!', error);
            error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
        });
    }

    const timeInputHandler = (timeMil: number) => {

        setUpdateValue({resultId: activeResultId, value: timeMil.toString()})
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        //setShowDelete(false)
        console.log("hd")
        console.log(timeMil)

    }

    const numberInputHandler = (event:any, result: IResult) =>{

        setUpdateValue({resultId: result.id, value: event.target.value})
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
    }

    const handleMetricTypeOnInsert = (event: any) => {
        console.log(exercises)
        const mtype = exercises.filter(x => x.id == event.target.value)[0].metricType
        setMetricTypeInsert(mtype)
    }

    const updateHandlerExercise = (event: any, result: IResult) => {

        //Recalculate value type input depending on 
        const tempData: IResult[] = JSON.parse(JSON.stringify(dataToShow));
        var foundResultIndex = tempData.findIndex(x => x.id == result.id);
        tempData[foundResultIndex].exerciseId = parseInt(event.target.value);
        var foundExerciseIndex = exercises.findIndex(x => x.id == event.target.value)
        tempData[foundResultIndex].name = exercises[foundExerciseIndex].name
        tempData[foundResultIndex].metricType = exercises[foundExerciseIndex].metricType
        console.log(tempData)
        setDataToShow(tempData);
        
        //setting up update exercise object
        updateExercise.resultId=result.id;
        updateExercise.id = parseInt(event.target.value);
        var foundExerciseIndex = exercises.findIndex(x => x.id == event.target.value)
        updateExercise.name = exercises[foundExerciseIndex].name
        updateExercise.metricType = exercises[foundExerciseIndex].metricType
        console.log("bybis")
        console.log(updateExercise)
        setUpdateExercise(updateExercise)

        setUpdateExerciseId(event.target.value)
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
        console.log("update data: " + result.date)
        console.log("update exercise Id: " + result.exerciseId)
        console.log("value: " + result.value)
    }

    
    const updateHandlerDate = (event: any, result: IResult) => {
        event.preventDefault();
        setUpdateDate({resultId: result.id, date: event.target.value})
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
        console.log("update data: " + result.date)
        console.log("update exercise Id: " + result.exerciseId)
        console.log("value: " + result.value)
        console.log("result id: " + result.id)
        console.log(event.target.value)

    }

    const onClickOkUpdate = () =>{
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        setUpdateDate({resultId: 0, date: ""})
    }

    const onClickBanUpdate = () => {

        setActiveResultId(0)
         
        console.log(mainData)
        setUpdateDate({resultId: 0, date: ""})
        setUpdateExercise({} as IExercise)
        setUpdateValue({resultId: 0, value: ""})
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        setDataToShow(mainData);
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
                                <select value={insertExerciseId}
                                        onChange={(event) => {setInsertExerciseId(parseInt(event.target.value)); handleMetricTypeOnInsert(event)}}
                                        >
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
                            
                            <td onClick={()=>setActiveResultId(itemR.id)}>
                                <select value={itemR.id == updateExercise.resultId ? updateExercise.id : itemR.exerciseId}
                                        onChange={(event)=>updateHandlerExercise(event, itemR)}
                                        >
                                    {exercises.map((itemE) =>{
                                        return (
                                            <option value={itemE.id} key={itemE.id}>{itemE.name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td onClick={()=>{setActiveResultId(itemR.id); onClickBanUpdate}}>
                               {itemR.metricType == "Number" ? <input onChange={(event)=>numberInputHandler(event, itemR)}
                                                                    value={itemR.id == updateValue.resultId ? updateValue.value : itemR.value}
                                                                    className={styles.inputnumber}
                                                                    type="number"
                                                                />
                                                            :   <div>
                                                                    <TimeInput { ...{timeInputHandler: timeInputHandler, itemTimeValue: parseInt(itemR.id == updateValue.resultId ? updateValue.value : itemR.value)}}/>
                                                                </div>}

                            </td>
                            <td onClick={()=>setActiveResultId(itemR.id)}>
                                <input  placeholder={itemR.date}
                                        value={itemR.id == updateDate.resultId ? updateDate.date : ""}
                                        type="text"
                                        onFocus={(e) => (e.target.type = "date", e.target.defaultValue=itemR.date)}
                                        onBlur={(e) => (e.target.type = "text")}
                                        onChange={(event)=>{/*itemR.date=event.target.value;*/ updateHandlerDate(event, itemR)}}
                                        />       
                            </td>
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
