
import { useState } from "react"
import { json } from "react-router-dom"


const usePixel = () => {


    const [ grid , setGrid ] = useState([])

    const updateGrid = async (target , imageId, zoomLevel) => {

        const params = new URLSearchParams({
            entityId : imageId,
            latitude : target.lat,
            longitude : target.lng,
            zoomLevel : zoomLevel
        })

        try{
            const RequestURL = `http://localhost:5029/Pixels?${params.toString()}`
            const response =  await fetch(RequestURL)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json()
            setGrid(data)
        }
        catch(error) {
            console.log(error)
        }

    }


    return { grid , updateGrid }

}

export default usePixel