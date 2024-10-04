import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import { useEffect , useState } from "react"

export default function ExamineTarget(){

    const { targetId } = useParams()

    const [ target , setTarget] = useState( { 
        lat: 0,
        lng: 0,
        count: 0,
        path: 0,
        row: 0,
        imgUrl : "/sample-target.webp",
        gridUrl : "/sample-target.webp",
        Notification : 0 
    })

    //
    useEffect(() => {
        //  Have to fetch the target from the API
        console.log("fuck umar from console")
    } , [])

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
                <span>Notification offset : <input type="date" value={target.count} /></span>
                <button>Submit</button>
            </div>
        </div>
    )
}