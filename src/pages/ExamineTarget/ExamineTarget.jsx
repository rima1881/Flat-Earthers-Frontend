import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import useTargetDetails from "../../utils/useTargetDetails"

export default function ExamineTarget(){

    const { targetId } = useParams()
    const { targetData , images , imageNum } = useTargetDetails(targetId )

    console.log(images)

    if(images) {

    return (
        <div className={styles.container}>
            <div className={styles.topSec}>
                <div className={styles.image}>
                    <img src={images[0].browse} />
                </div>
                <div className={styles.grid}>
                    <img src={images[1].browse} />
                </div>

            </div>
            <div className={styles.btmSec}>
                <span>Lat : {targetData.lat} </span>
                <span>Lng : {targetData.lng} </span>
                <span>Path : {targetData.path} </span>
                <span>Row : {targetData.row} </span>
                <span>Image Count : <input type="number" value={imageNum} /></span>
                <span>Notification offset : <input type="date" value="0" /></span>
                <button>Submit</button>
            </div>
        </div>
    )
    }
    else{
        return(
            <div>
                Loading
            </div>
        )
    }
}