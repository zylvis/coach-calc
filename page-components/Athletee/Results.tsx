import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/Results.module.css"
import ITrash from "../../icons/ITrash.svg"
import MilSecStringToTimeString from "../../Helpers/MilSecStringToTmeString";
import ChartLine from "../../components/ChartLine";
import DateRangePicker from "../../components/DateRangePicker";

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}
interface IResults {
    id: number,
    athleteeId?: number,
    exerciseId?: number,
    date: string,
    name?: string,
    value: string,
    metricType?: string
}
interface IResultsProps{
    resultsHandler: (show: boolean) => void
}
interface IDictinctExercise{
    exerciseId?: number,
    name?: string,
    metricType?: string
}

const Results = (props: IResultsProps) => {

    const [dataToShow, setDataToShow] = useState<IResults[]>([])
    const [data, setData] = useState<IResults[]>([])
    const [distinctExercises, setDistinctExercises] = useState<IDictinctExercise[]>([]);
    const [exerciseId, setExerciseId] = useState(0);
    const [averageValue, setAverageValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("")
    const [metricType, setMetricType] = useState("")
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);

    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `${process.env.API_URL}/api/Result`
            );
            
            const responseResult = response.data.result as IResults[]
            const responseResultByAthletee = responseResult.filter((item : IResults) => item.athleteeId == athleteeObj.id);
            setDataToShow(responseResultByAthletee);
            setData(responseResultByAthletee)

            const distinct: IDictinctExercise[] = Array.from(new Set(responseResultByAthletee.map((s:IResults) => s.exerciseId))).map(exerciseId =>{
                return{
                    exerciseId: exerciseId,
                    name: responseResultByAthletee.find(s => s.exerciseId == exerciseId)?.name,
                    metricType: responseResultByAthletee.find(s => s.exerciseId == exerciseId)?.metricType
                }
            });
            setDistinctExercises(distinct);
            setEmptyData(responseResultByAthletee.length == 0)
            console.log(responseResultByAthletee);

          } catch (err: any) {
            console.log(err)
            alert(err.message)
          } finally {
            setLoading(false)
          }
        };
        getData();

    }, []);

    const handleDelete =(id:number) => {
        if(confirm("Delete Result?")){
            axios.delete(`${process.env.API_URL}/api/Result/${id}`)  
            .then(res => {  
                console.log(res.data); 
                const posts = dataToShow.filter(item => item.id !== id);  
                setDataToShow(posts);
                setData(data.filter(item => item.id !== id))
                const tmpDta = data.filter(item => item.id !== id)
                const distinct: IDictinctExercise[] = Array.from(new Set(tmpDta.map((s:IResults) => s.exerciseId))).map(exerciseId =>{
                    return{
                        exerciseId: exerciseId,
                        name: tmpDta.find(s => s.exerciseId == exerciseId)?.name,
                        metricType: tmpDta.find(s => s.exerciseId == exerciseId)?.metricType
                    }
                });
                setDistinctExercises(distinct || []);

            }).catch( error =>
                console.log(error)
            )
        }
        
    }

    const handleSelectExercise = (event: any) => {

        let metricType = distinctExercises.find(x => x.exerciseId == event.target.value)?.metricType
        setMetricType(metricType as string)
        setExerciseId(event.target.value);
        setDataToShow(data?.filter(x => x.exerciseId == event.target.value));
        const tempData = data?.filter(x => x.exerciseId == event.target.value);
        if (event.target.value == "all"){
            setDataToShow(data)
            metricType = "";
            setMetricType(metricType)
        }
        //Average value
        let temp = 0
        tempData.forEach(
            x => temp += parseInt(x.value) 
        )
        metricType == "Time" ? setAverageValue(MilSecStringToTimeString(Math.round(temp / tempData.length).toString())) :
                                setAverageValue(Math.round(temp / tempData.length).toString())
        
        //Max value
        let max = 0;
        tempData.forEach(
            x => {
                if (parseInt(x.value) > max){
                    max = parseInt(x.value)
                }
            }
        )
        metricType == "Time" ? setMaxValue(MilSecStringToTimeString(max.toString())) : setMaxValue(max.toString())
        
        //Min value
        let min = Number.MAX_VALUE;
        tempData.forEach(
            x => {
                if (parseInt(x.value) < min){
                    min = parseInt(x.value)
                }
            }
        )
        metricType == "Time" ? setMinValue(MilSecStringToTimeString(min.toString())) : setMinValue(min.toString())

        if(metricType == ""){
            setAverageValue("")
            setMinValue("")
            setMaxValue("")
        }
    }

    const handleSelectRange = (startDate: string, endDate: string) => {

        let temp: IResults[] = []

        if (exerciseId == 0) {
            temp = data;
        } else {
            temp = data?.filter(x => x.exerciseId == exerciseId)
        }

        temp = temp.filter((item: IResults) => {
             return new Date(item.date).getTime() >= new Date(startDate).getTime() &&
                    new Date(item.date).getTime() <= new Date(endDate).getTime();
        });

        setDataToShow(temp.sort((a, b) => +new Date(b.date) - +new Date(a.date)))
    }

    const handleResetRange = () =>{
        if(exerciseId == 0) {
            setDataToShow(data)
            return
        }
        setDataToShow(data?.filter(x => x.exerciseId == exerciseId));
    }

    console.log(dataToShow)
    console.log(distinctExercises)

    const objChartProps = {dataToShow: dataToShow, metricType: metricType}
    const objDateRangePickerProps = {data: data, dataToShow: dataToShow, handleSelectRange: handleSelectRange, handleResetRange: handleResetRange}

    const addfirstAthletee = <div className={styles.loading}>Add Results ...</div>
    const loadingAthletees = <div className={styles.loading}>Loading ...</div>

    return (
        <div>
            <Modal/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menuitem} onClick={()=>props.resultsHandler(false)}>&lt;</div>
                </div>
                <div className={styles.detailscontainer}>
                    <div className={styles.item}>
                        <div className={styles.image}
                            style={athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                        </div>
                    </div>
                </div>
                <div className={styles.selectstatscontainer}>
                    <div className={styles.selectcontainer}>
                        <div><b>Select Exercise:</b></div>
                        <select  className={styles.select} value={exerciseId} onChange={handleSelectExercise}>
                            <option className={styles.option} value="all">All Exercises</option>
                                    {distinctExercises?.map((item: IDictinctExercise) =>{
                                        return (                                
                                            <option value={item.exerciseId} key={item.exerciseId}>{item.name}</option>
                                        )
                                    })}
                        </select>
                    </div>
                    <div className={styles.statscontainer}>
                        <div className={styles.statsitemscontainer}>
                            <div className={styles.statsitem}><b>Average:</b></div> 
                            <div className={styles.statsitem}>{averageValue}</div>
                        </div>
                        <div className={styles.statsitemscontainer}>
                            <div className={styles.statsitem}><b>Max:</b></div> 
                            <div className={styles.statsitem}>{maxValue}</div>
                        </div>
                        <div className={styles.statsitemscontainer}>
                            <div className={styles.statsitem}><b>Min:</b></div> 
                            <div className={styles.statsitem}>{minValue}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.chart}>
                     <ChartLine {...objChartProps}/>
                </div>
                <div className={styles.filterby}>Filter by date range: </div>
                <div className={styles.daterangepicker}>
                    <DateRangePicker {... objDateRangePickerProps}/>
                </div>
                <div className={styles.itemslabelcontainer}>
                    <div className={styles.items}><b>Exercise</b></div>
                    <div className={styles.items}><b>Value</b></div>
                    <div className={styles.items}><b>Date</b></div>
                    <div></div>
                </div>
                <div className={styles.rendercontainer}>
                    {emptyData && addfirstAthletee}
                    {loading && loadingAthletees}
                    {dataToShow?.map((item) => {return (                    
                            <div className={styles.itemscontainer} key={item.id}>
                                <div className={styles.items}>{item.name}</div>
                                <div className={styles.items}>{item.metricType == "Number" ? item.value : MilSecStringToTimeString(item.value)}</div> 
                                <div className={styles.items}>{item.date}</div>
                                <div className={styles.trash} onClick={()=>handleDelete(item.id)}><ITrash fill={'rgb(219, 98, 98)'}/></div>
                            </div>
                        )                      
                    })}
                </div>
            </div>
        </div>
    )
}
export default Results;