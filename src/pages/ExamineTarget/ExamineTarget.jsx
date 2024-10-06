import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import useTargetDetails from "../../utils/useTargetDetails"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft , faCaretRight } from "@fortawesome/free-solid-svg-icons"
import usePixels from "../../utils/usePixel"


export default function ExamineTarget(){

    const { targetId } = useParams()
    const { targetData , images , formData , setFormData } = useTargetDetails(targetId )
    const { error , setError } = useState()

    const [ disableBack , setDisableBack ] = useState(false)
    const [ disableForward , setDisableForward ] = useState(false)
    const [ activeImage , setImage ] = useState(0)

    const { grid , updateGrid } = usePixels()
    
    
    console.log( images )

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }


    const handleBack = () => {
        
        if(activeImage == formData.numResults - 1)
        {

        }

    }

    const handleForward = () => {

    }

    const handleSubmit = () => {
        updateGrid( targetData , images[activeImage].entityId , 15 )
    }

    let gridTemplate = <>
    </>

    console.log("mammad")
    console.log(grid.length)

    if( grid.length != 0 ) {
        gridTemplate =  <div className={styles.grid}>
            <img src={grid[0]} />
            <img src={grid[3]} />
            <img src={grid[6]} />

            <img src={grid[1]} />
            <img src={grid[4]} />
            <img src={grid[7]} />

            <img src={grid[2]} />
            <img src={grid[5]} />
            <img src={grid[8]} />
        </div>
    }

    if(images) {

    return (
        <div className={styles.container}>
            <div className={styles.topSec}>
                <div className={styles.image}>
                    <img src={images[activeImage].browse} />
                    <div>
                        <FontAwesomeIcon icon={faCaretLeft} onClick={handleBack} className={disableBack ? styles.backDis : styles.backEN} />
                        <FontAwesomeIcon icon={faCaretRight} onClick={handleForward} className={disableForward ? styles.forwardDis : styles.forwardEN} />
                    </div>
                </div>
                
                {gridTemplate}

            </div>
            <div className={styles.btmSec}>
                <span>Lat : {targetData.lat} </span>
                <span>Lng : {targetData.lng} </span>
                <span>Path : {targetData.path} </span>
                <span>Row : {targetData.row} </span>
                <span>Image Count : <input type="number" name="numResults" value={formData.numResults} onChange={handleChange} /></span>
                <span>Notification offset : <input type="date" name="offSet"  value={formData.offSet} onChange={handleChange} /></span>
                <button onClick={handleSubmit}>Load Grid</button>
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