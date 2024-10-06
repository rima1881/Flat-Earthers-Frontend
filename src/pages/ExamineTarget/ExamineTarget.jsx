import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import { useEffect , useState } from "react"
import useAPI from "../../utils/useAPI"

export default function ExamineTarget(){

    const { targetId } = useParams()
    const { getTargetDetails } = useAPI()

    const [ target , setTarget] = useState()

    console.log( getTargetDetails() )

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
                <span>Lat : 0 </span>
                <span>Lng : 0 </span>
                <span>Path : 0 </span>
                <span>Row : 0 </span>
                <span>Image Count : <input type="number" value="0" /></span>
                <span>Notification offset : <input type="date" value="0" /></span>
                <button>Submit</button>
            </div>
        </div>
    )
}