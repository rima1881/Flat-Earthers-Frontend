import * as turf from "@turf/turf";
import { useState , useEffect } from "react";


const useWRS2 = () => {

    const [ data , setData ] = useState([]);

    useEffect( () => {

        fetch("/WRS2.json")
            .then( response => response.json() )
            .then( db => setData(db) )
            .catch( err => console.log(err) )

    }, [])

    return data

}


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

const useSquare = (lat , lng) => {

    const data = useWRS2()

    return extractSquares( data , lat , lng )

}


export {useSquare};