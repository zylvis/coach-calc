
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
    name: string,
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
    const [activeMetricType, setActiveMetricType] = useState("")
    const [showOkUpdate, setShowOkUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(true)
    const [showBanUpdate, setShowBanUpdate] = useState(false)
    const [activeResultId, setActiveResultId] = useState(0)
    const [resultUpdateObj, setResultUpdateObj] = useState<IResult>({}as IResult)
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const[reloadTrigger, setReloadTrigger] = useState(0)

 

    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);


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

    }, []);

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
        
        let tempResult: IResult = JSON.parse(JSON.stringify(resultUpdateObj))
        tempResult.value = timeMil.toString()
        setResultUpdateObj(tempResult)

    }
    

    const numberInputHandler = (event:any, result: IResult) =>{

        let tempResult: IResult = JSON.parse(JSON.stringify(resultUpdateObj))
        tempResult.value = event.target.value
        setResultUpdateObj(tempResult)

        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)
    }

    const handleMetricTypeOnInsert = (event: any) => {

        const mtype = exercises.filter(x => x.id == event.target.value)[0].metricType
        setMetricTypeInsert(mtype)
    }

    const updateHandlerExercise = (event: any, result: IResult) => {
        event.preventDefault();
        
        //setting up update result object
        let tempResult = JSON.parse(JSON.stringify(resultUpdateObj))
        var foundExerciseIndex = exercises.findIndex(x => x.id == event.target.value)
        tempResult.exerciseId = parseInt(event.target.value);
        tempResult.name = exercises[foundExerciseIndex].name
        tempResult.metricType = exercises[foundExerciseIndex].metricType
        result.metricType = exercises[foundExerciseIndex].metricType
        tempResult.value = "0"
        setResultUpdateObj(tempResult)

        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)

    }

    
    const updateHandlerDate = (event: any, result: IResult) => {
        event.preventDefault();
        let tempObj: IResult = JSON.parse(JSON.stringify(resultUpdateObj))
        tempObj.date = event.target.value
        setResultUpdateObj(tempObj)
        setShowOkUpdate(true)
        setShowBanUpdate(true)
        setShowDelete(false)

    }

    const onClickOkUpdate = () =>{
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        setResultUpdateObj({} as IResult)
        setActiveResultId(0)
    }

    const onNextRowClick = (lastId: number, itemR: IResult) =>{
        
        if (itemR.id != activeResultId){
           
            setActiveResultId(itemR.id);
            let tempResult: IResult = JSON.parse(JSON.stringify(itemR))
            setResultUpdateObj(tempResult)
            //setActiveResultId(0)
            setReloadTrigger(reloadTrigger + 1)
            setShowOkUpdate(true)
            setShowBanUpdate(true)
            setShowDelete(false)
            
        }
        
    }

    const onClickBanUpdate = (result:IResult) => {

        setActiveResultId(0)
        
        setResultUpdateObj(result)
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        result.metricType = mainData.find( x => x.id == result.id)?.metricType
        //setReloadTrigger(reloadTrigger + 1)

        
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
                            <th style={{"height": "5vh"}} colSpan={5}> Add Result</th>
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
                            <th style={{"height": "5vh"}} colSpan={5}>Results list </th>
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
                            
                            <td onClick={(event)=>onNextRowClick(activeResultId, itemR)}>
                                <select value={itemR.id == resultUpdateObj.id ? resultUpdateObj.exerciseId : itemR.exerciseId}
                                        onChange={(event)=>updateHandlerExercise(event, itemR)}
                                        >
                                    {exercises.map((itemE) =>{
                                        return (
                                            <option value={itemE.id} key={itemE.id}>{itemE.name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td onClick={(event)=>{onNextRowClick(activeResultId, itemR)}}>
                                {itemR.metricType == "Number" ? <input onChange={(event)=>numberInputHandler(event, itemR)}
                                                                        value={itemR.id == resultUpdateObj.id ? resultUpdateObj.value : itemR.value}
                                                                        className={styles.inputnumber}
                                                                        type="number"
                                                                     />
                                                                :   <div>
                                                                        <TimeInput { ...{timeInputHandler: timeInputHandler, itemTimeValue: parseInt(itemR.id == resultUpdateObj.id ? resultUpdateObj.value : itemR.value)}}/>
                                                                    </div>}
                            </td>
                            <td onClick={(event)=>onNextRowClick(activeResultId, itemR)}>
                                <input  placeholder={itemR.date}
                                        value={itemR.id == resultUpdateObj.id ? resultUpdateObj.date : ""}
                                        type="text"
                                        onFocus={(e) => (e.target.type = "date", itemR.id == resultUpdateObj.id ? e.target.value =resultUpdateObj.date : e.target.value = "")}
                                        onBlur={(e) => (e.target.type = "text")}
                                        onChange={(event)=>{updateHandlerDate(event, itemR)}}
                                        />       
                            </td>
                            <td style={{"width": "8vw"}}>
                                {showDelete && <ITrash className={styles.trash} fill="#c06363"/>}
                                {showBanUpdate && itemR.id == activeResultId && <div className={styles.ban} onClick={()=>onClickBanUpdate(itemR)}><IBan  fill="#167dc2" /></div>}
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
