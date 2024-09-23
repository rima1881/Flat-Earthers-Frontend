import * as turf from "@turf/turf";
import { useState , useEffect } from "react";


const extractSquares = (data , lat , lng) => {

    const point = turf.point([lng, lat]);
    
    return data.filter( feature => turf.booleanPointInPolygon(point,feature) )
        .map( feature => (
            {
                path : feature.properties.PATH ,
                row : feature.properties.ROW , 
                coordinates : feature.geometry.coordinates[0].map(e => (
                    { lat : e[1] , lng : e[0] }
                ))
            }
        ))

}

const useSquare = () => {

    const [ wrs2 , setWRS2 ] = useState([]);


    useEffect( () => {

        fetch("/WRS2.json")
            .then( response => response.json() )
            .then( db => setWRS2(db.features) )
            .catch( err => console.log(err) )

    }, [])

    const addTarget = (lat , lng) => {

        // Immediately calculate and set the new targets based on the current coordinates
        const newTargets = extractSquares(wrs2, lat, lng);

        return newTargets
    }

    return addTarget

}


export {useSquare};