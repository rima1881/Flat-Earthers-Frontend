import * as turf from "@turf/turf";
import { useState , useEffect , createContext, useContext, useCallback } from "react";

//  I divided the functionalities into three hooks
//  Because I was noticing unwanted reloads which 
//  was caused due to the fact that all states where
//  stored in one function and exporting the function
//  was duplicating the states which made the huge mess


//  I might merge useTargets and useTargetsAPI toghater later


const useAvailableTargets = () => {

    const [ wrs2 , setWRS2 ] = useState([]);

    useEffect( () => {

        fetch("/WRS2.json")
            .then( response => response.json() )
            .then( db => setWRS2(db.features) )
            .catch( err => console.log(err) )

    }, [])

    const extractSquares = useCallback(( lat , lng) => {
        const point = turf.point([lng, lat]);
    
        return wrs2.filter( feature => turf.booleanPointInPolygon(point,feature) )
            .map( feature => (
                {
                    path : feature.properties.PATH ,
                    row : feature.properties.ROW , 
                    coordinates : feature.geometry.coordinates[0].map(e => (
                        { lat : e[1] , lng : e[0] }
                    ))
                }
            ))
        }, [wrs2])
    
    //  Data is not loaded syncronessly so extract squares
    //  needed an extra function. Might be able to be fixed
    //  with useCallback
    return extractSquares

}

//  The targets are shared Between Google Map API and our 
//  SelectTarget Componet. In order to share this state
//  Between To Components useContext was used. IDK easier
//  way in react :(

const targetsContext = createContext()

const useTarget = () => {

    const TargetsProvider = ({ children }) => {

        const [ targets , setTargets ] = useState("mammad")
        const addTarget = ( target ) => {
            setTargets ( prev => [...prev , target])
        }

        return (
            <targetsContext.Provider value={[ targets , addTarget ]}>
                {children}
            </targetsContext.Provider>
        )

    }

    const targets = () => useContext(targetsContext)


    return { TargetsProvider , targets }

}

const useTargetsAPI = () => {

    //API Calling the sync the data
    const pushTargets = (targets) => {
        console.log("pushing targets to server...")
        console.log(targets)
    }

    const pullTargets = () => {
        console.log("pulling targets from server...")
        return ["Stored Targets !!!"]
    }

    return { pushTargets , pullTargets }
}


export { useTarget , useAvailableTargets , useTargetsAPI };