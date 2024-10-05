import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import { useEffect , useState } from "react"
import useAPI from "../../utils/useAPI"

export default function ExamineTarget(){

    const { targetId } = useParams()
    const { getTargetDetails } = useAPI()

    const [ target , setTarget] = useState()

    setTarget( getTargetDetails(targetId) )

    return (
        <div className={styles.container}>
            <div className={styles.topSec}>
                <div className={styles.image}>
                    <img src="/sample-target.webp" />
                </div>
                <div className={styles.grid}>
                    <img src="/sample-target.webp" />
                </div>

            </div>
            <div className={styles.btmSec}>
                <span>Lat : {target.lat} </span>
                <span>Lng : {target.lng} </span>
                <span>Path : {target.path} </span>
                <span>Row : {target.row} </span>
                <span>Image Count : <input type="number" value={target.count} /></span>
                <span>Notification offset : <input type="date" value={target.offset} /></span>
                <button>Submit</button>
            </div>
        </div>
    )
}