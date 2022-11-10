
import axios from "axios";
import { useEffect, useState } from "react";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/AddResultss.module.css"
import ITrash from "../../icons/ITrash.svg"
import IBan from "../../icons/IBan.svg"
import TimeInput from "../../components/TimeInput";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import UpDown from "../../icons/UpDown.svg"

interface IAddResultsProps{
    addResultsHandler: (show:boolean) => void
}

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

interface IResultPost {
    athleteeId: number,
    exerciseId: number,
    date: string,
    value: string,

}

interface IExercise{
    id: number,
    name: string,
    metricType: string,
    resultId: number
}


const AddResultss = (props: IAddResultsProps) =>{

    const [dataToShow, setDataToShow] = useState<IResult[]>([]);
    const [mainData, setMainData] = useState([] as IResult[]);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [metricTypeInsert, setMetricTypeInsert] = useState("");
    const [valueInsert, setValueInsert] = useState("")
    const [dateInsert, setDateInsert] = useState(FormatDate(new Date().toLocaleDateString()))
    const [showBanInsert, setShowBanInsert] = useState(false)
    const [showOkInsert, setShowOkInsert] = useState(false)
    const [insertExerciseId, setInsertExerciseId] = useState(0)
    const [showOkUpdate, setShowOkUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(true)
    const [showBanUpdate, setShowBanUpdate] = useState(false)
    const [activeResultId, setActiveResultId] = useState(0)
    const [resultUpdateObj, setResultUpdateObj] = useState<IResult>({}as IResult)
    const [success, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [reloadTrigger, setReloadTrigger] = useState(0)

    const [loading, setLoading] = useState(true);

    const [orderExercise, setOrderExercise] = useState(false)
    const [orderValue, setOrderValue] = useState(false)
    const [orderDate, setOrderDate] = useState(false)

 

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

    const client = axios.create({
        baseURL: `${process.env.API_URL}/api/Result`
      });

    const addPost = (obj: IResultPost) => {
        client
           .post('', obj)
           .then((response) => {
              console.log(response.data)
              setSuccess("Success");
              setShowSuccess(true)
              setTimeout(() => {
              setSuccess("");
              setShowSuccess(false)
              }, 2000);
              setReloadTrigger(reloadTrigger + 1)
           }).catch((error) => {
            console.log(error);
            alert(error.response.data.Message[0])
            
         });
      };

    const addPut = (obj: any) => {
        axios.put(`${process.env.API_URL}/api/Result/${obj.id}`, obj)
        .then(response => {
            setSuccess("Success")
            setShowSuccess(true)
            setTimeout(()=>{
                setSuccess("")
                setShowSuccess(false)
            },1000)
            
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
            error.response.data?.Message[0] ? alert(error.response.data.Message[0]) : alert(error.message)
        });
    }


    const timeInputHandler = (timeMil: number) => {
        
        let tempResult: IResult = JSON.parse(JSON.stringify(resultUpdateObj))
        tempResult.value = timeMil.toString()
        setResultUpdateObj(tempResult)

        if(resultUpdateObj == {} as IResult){
            setValueInsert(timeMil.toString())
        }

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
        result.metricType = exercises[foundExerciseIndex].metricType // change dataToShow Item property!
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

    const onClickOkInsert =() => {

        if (insertExerciseId == 0)
        {
            alert("Please select exercise")
            return
        }

        if (valueInsert == "" || parseInt(valueInsert) < 0)
        {
            alert("Enter correct value")
            return
        }


        const insertObj: IResultPost = {
            athleteeId: athleteeObj.id,
            exerciseId: insertExerciseId,
            value: valueInsert,
            date: dateInsert
        }
        addPost(insertObj)
        setShowOkInsert(false)
        setValueInsert("0")
        setDateInsert(FormatDate(new Date().toLocaleDateString()))
        setInsertExerciseId(0)
    }

    const onClickBanInsert = () => {
        setShowOkInsert(false)
        setValueInsert("")
        setDateInsert(FormatDate(new Date().toLocaleDateString()))
        setInsertExerciseId(0)
    }
    const onClickOkUpdate = () => {

        if (parseInt(resultUpdateObj.value) < 0){
            alert(`Wrong value format: ${resultUpdateObj.value}`)
        }

        const updateObj = {
            id: resultUpdateObj.id,
            athleteeId: resultUpdateObj.athleteeId,
            exerciseId: resultUpdateObj.exerciseId,
            value: resultUpdateObj.value,
            date: resultUpdateObj.date
        }
        addPut(updateObj)
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        //setResultUpdateObj({} as IResult)
        setActiveResultId(0)
    }

    const onInsertRowClick = (event: any) => {
        setShowOkInsert(true)
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        setResultUpdateObj({} as IResult)
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
            setShowOkInsert(false)            
        }
        
    }

    const onClickBanUpdate = (result:IResult) => {

        setActiveResultId(0)
        
        setResultUpdateObj(result)
        setShowOkUpdate(false)
        setShowBanUpdate(false)
        setShowDelete(true)
        result.metricType = mainData.find( x => x.id == result.id)?.metricType //change back dataToShow Item property to original! 
    }

    const handleDelete =(id:number) => {
        if(confirm("Delete Result?")){
            axios.delete(`${process.env.API_URL}/api/Result/${id}`)  
            .then(res => {  
                console.log(res.data); 
                const posts = dataToShow.filter(item => item.id !== id);  
                setDataToShow(posts);
                setMainData(mainData.filter(item => item.id !== id))

            }).catch( error =>
                console.log(error)
            )
        }
    }

    const searchHandler = (event: any) => {
        let searchText = event.target.value
        console.log(searchText)
        let tempObj = mainData.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()) ||
            x.value.toLowerCase().includes(searchText.toLowerCase()) ||
            x.date.toLowerCase().includes(searchText.toLowerCase()) 

        )
        setDataToShow(tempObj)
    }

    const onSortClick = (name: string) => {
        console.log(name)
        if (name == "Exercise"){
            setOrderExercise(!orderExercise)
            setDataToShow(dataToShow.sort((a, b) => {
                const nameA = a.name.toUpperCase(); 
                const nameB = b.name.toUpperCase(); 
                if ( orderExercise ? nameA < nameB : nameA > nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
            } ))
        }

        if (name == "Value") {
            setOrderValue(!orderValue)
            setDataToShow(dataToShow.sort((a, b) => {
                const nameA = a.value.toUpperCase(); 
                const nameB = b.value.toUpperCase(); 
                if ( orderValue ? nameA < nameB : nameA > nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
            } ))
        }

        if (name == "Date") {
            setOrderDate(!orderDate)
            setDataToShow(dataToShow.sort((a, b) => {
                const nameA = a.date.toUpperCase(); 
                const nameB = b.date.toUpperCase(); 
                if ( orderDate ? nameA < nameB : nameA > nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
            } ))
        }
    }

    const timeInputPropsObj = {timeInputHandler: timeInputHandler, itemTimeValue: 0}

    return(
        <> 
            <div className={styles.container}>
                
                <div className={styles.back} onClick={()=>props.addResultsHandler(false)}>&lt;</div>
                <div className={styles.image}
                    style={ athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>
                </div>
                <div className={styles.name}>{athleteeObj.firstName}</div>
                <div className={styles.age}>({ConvertBirthDateToAge(athleteeObj.birthDate)})</div>
                <div className={styles.search}><input type="text" placeholder="Search ..." onChange={(event) => searchHandler(event)}/></div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={(event) => onSortClick("Exercise")}>Exercise <UpDown className={styles.updown}/></th>
                            <th onClick={(event)=>onSortClick("Value")}>Value <UpDown className={styles.updown}/></th>
                            <th onClick={(event) => onSortClick("Date")}>Date <UpDown className={styles.updown}/></th>
                            <th></th>
                        </tr>
                        <tr className={styles.addresult}>
                            <th  colSpan={5}> Add Result:</th>
                        </tr>

                        <tr style={{border: "3px solid #909090", height: "8vh"}}>
                            <td  className={styles.tdok}>{showOkInsert && <div className={styles.ok} onClick={onClickOkInsert}>OK</div>}</td>
                            <td onClick={(event)=>onInsertRowClick(event)}>
                                <select value={insertExerciseId}
                                        onChange={(event) => {setInsertExerciseId(parseInt(event.target.value)); setValueInsert(""); handleMetricTypeOnInsert(event)}}
                                        >
                                        <option disabled value={0}>Select:</option>
                                        {exercises.map((itemE) =>{
                                            return (
                                                <option value={itemE.id} key={itemE.id}>{itemE.name}</option>
                                            )
                                        })}
                                </select>
                            </td>
                            <td onClick={(event)=>onInsertRowClick(event)}>
                                {metricTypeInsert == "Number" || metricTypeInsert == "" ?
                                    <input className={styles.inputnumber} type="number" value={valueInsert} onChange={(event)=>setValueInsert(event?.target.value)} placeholder="0"/> :
                                    <TimeInput { ...{timeInputHandler: timeInputHandler, itemTimeValue: !resultUpdateObj ? parseInt(valueInsert) : 0}}/>}

                            </td>
                            <td onClick={(event)=>onInsertRowClick(event)}><input type="date" value={dateInsert} onChange={(event)=>setDateInsert(event?.target.value)}/></td>
                            <td style={{width: "8vw"}}>{showOkInsert && <div onClick={onClickBanInsert}><IBan className={styles.ban} fill="#167dc2"/></div>}</td>
                        </tr>
                        <tr className={styles.addresult}>
                            <th colSpan={5}>Results list: </th>
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
                        {dataToShow.map(itemR => <tr key={itemR.id} style={activeResultId == itemR.id ? {height: "8vh", border: "2px solid #121212"}: {}}>
                            <td className={styles.tdok}>{showOkUpdate && itemR.id == activeResultId && <div className={styles.ok} onClick={onClickOkUpdate}>OK</div>}</td>
                            
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
                                <input  value={itemR.id == resultUpdateObj.id ? resultUpdateObj.date : itemR.date}
                                        type="date"
                                        onChange={(event)=>{updateHandlerDate(event, itemR)}}
                                        />       
                            </td>
                            <td style={{"width": "8vw"}}>
                                {showDelete && <div onClick={()=>handleDelete(itemR.id)}><ITrash className={styles.trash} fill="#c06363"/></div>}
                                {showBanUpdate && itemR.id == activeResultId && <div onClick={()=>onClickBanUpdate(itemR)}><IBan className={styles.ban}  fill="#167dc2" /></div>}
                            </td>
                        </tr>
                        )}
                        <tr>
                            {loading && <td colSpan={5}>Loading ... </td>}
                        </tr>
                    </tbody>
                    
                </table>
                <div className={styles.back} onClick={()=>props.addResultsHandler(false)}>&lt;</div>
            </div>
            {showSuccess && <div className={styles.success}>{success}</div>}
        </>
    )
}
export default AddResultss;
