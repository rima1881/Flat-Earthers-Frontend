import styles from "./ExamineTarget.module.css"
import { useParams } from "react-router-dom"
import useTargetDetails from "../../utils/useTargetDetails"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import usePixels from "../../utils/usePixel"
import Targets from "../Targets/Targets"


export default function ExamineTarget(){

    const { targetId } = useParams()
    const { targetData , images , formData , setFormData } = useTargetDetails(targetId )
    const { error , setError } = useState()
    const [ isLoading , setIsLoading ] = useState(false)

    const [ disableBack , setDisableBack ] = useState(false)
    const [ disableForward , setDisableForward ] = useState(false)
    const [ activeImage , setImage ] = useState(0)

    const [ rangeData , setRangeData ] = useState(10)

    const { grid , updateGrid } = usePixels()


    const handleRange = (event) => {
        setRangeData(event.target.value); // Update value on change
    }

    const handleBack = () => {
        if(activeImage > 0)
            setImage( prev => prev - 1 )
        
    }

    const handleForward = () => {

        if(activeImage < 4)
            setImage( prev => prev + 1 )

    }

    const handleSubmit = () => {
        setIsLoading(true)
        updateGrid( targetData , images[activeImage].entityId , rangeData ).then(
            setIsLoading(false)
        )
    }

    let gridTemplate = <>
    </>

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

    const LoadingTemplate = <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
    </div>

    if(images) {

    return (
        <div className={styles.container}>
            { isLoading && LoadingTemplate}
            <div className={styles.topSec}>
                <div className={styles.image}>
                    <img src={images[activeImage].browse} />
                </div>
                
                {gridTemplate}

            </div>
            <div className={styles.btmSec}>
                <span><button onClick={handleBack} disabled={activeImage == 0} >Previous</button></span>
                <span>{activeImage + 1} / 5</span>
                <span><button onClick={handleForward} disabled={activeImage == 4}>Next</button></span>
                <span> 
                    Zoom Level: {rangeData}
                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={rangeData}
                        onChange={handleRange}
                    />
                </span>
                <span>Lat : {targetData.lat} </span>
                <span>Lng : {targetData.lng} </span>
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