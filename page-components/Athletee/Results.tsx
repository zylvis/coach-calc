import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { ConvertBirthDateToAge } from "../../Helpers/ConverBirthDateToAge";
import FormatDate from "../../Helpers/FormatDate";
import styles from "../../styles/page-components/Athletee/Results.module.css"

interface IAthletee{
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string
}
interface IResults {
    id: number,
    athleteeId: number,
    exerciseId: number,
    date: string,
    name: string
}
interface IResultsProps{
    resultsHandler: (show: boolean) => void
}
const Results = (props: IResultsProps) => {

    const[dataToShow, setDataToShow] = useState<IResults[]>()

    const athleteeObj : IAthletee = JSON.parse(localStorage.getItem('athleteeObj') as string);
    athleteeObj.birthDate = FormatDate(athleteeObj.birthDate);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://localhost:7104/api/Result"
            );
            setDataToShow(response.data.result.filter((item : IResults) => item.athleteeId == athleteeObj.id));
            console.log(response.data);
          } catch (err: any) {
            console.log(err)
            alert(err.message)
          } finally {

          }
        };
        getData();

      }, []);
 
    console.log(dataToShow)
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
                                style={ athleteeObj.image.length !== 0 ? {backgroundImage: `url(${athleteeObj.image})`} : {backgroundImage: `url(./Avatar.png)`}}>  
                        </div>
                        <div>({ConvertBirthDateToAge(athleteeObj.birthDate)})</div>
                        <div>{athleteeObj.firstName} {athleteeObj.lastName}</div>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}
export default Results;