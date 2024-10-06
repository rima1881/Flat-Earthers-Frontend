import * as turf from "@turf/turf";
import { useState , useEffect , createContext, useContext, useCallback } from "react";
import Cookies from "js-cookie";
//import Papa from "papaparse"

const useWRS2 = () => {

    const [ wrs2 , setWRS2 ] = useState([])

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
    
    return extractSquares

}

const targetsContext = createContext()


const useTarget = () => {

    const TargetsProvider = useCallback( ({ children }) => {

        //  Initial Load for targets after refresh
        const [ targets , setTargets ] = useState(() => {
            const savedTargets = Cookies.get('targets')
            return savedTargets ? JSON.parse(savedTargets) : []
        })

        //  Instead of passing setTargets for changing targets we only
        //  pass addTarget to insure nothing is removed accidentally and
        //  the target cooky has the same data as our state
        const addTarget = ( target ) => {

            // Get Prediction
            const params = new URLSearchParams({
                path: target.path,
                row: target.row
            })

            const requestURL = `http://localhost:5029/Prediction?${params.toString()}`
            fetch(requestURL)
            .then( response => {
                
                if (!response.ok)
                    throw new Error('Network response was not ok');
                
                return response.json();
            })
            .then( data => {

                target.prediction = data.prediction
                
                //Store Target
                setTargets((prev) => {
                    const newTargets = [...prev, target];
                    Cookies.set('targets', JSON.stringify(newTargets), { expires: 7 }); // Store in cookies with 7-day expiration
                    return newTargets;
                })

            })
            .catch( error => {
                //  Error Fetching Path & Row
                //  Top tier Error Management
                console.log(error)
            })
        }
        
        const updateTargets = ( ts ) => {

            Cookies.set('targets', JSON.stringify(ts), { expires: 7 }) // Store in cookies with 7-day expiration
            setTargets(ts)

        }

        const deleteTarget = (index) => {
            
            const updatedTargets = [...targets]
            updatedTargets.splice(index, 1)
            Cookies.set('targets', JSON.stringify(updatedTargets), { expires: 7 }) // Store in cookies with 7-day expiration
            setTargets(updatedTargets)

        }

        const deleteAll = () => {

            Cookies.remove('targets')
            setTargets( [] )

        }

        const getTargetImage = ( path , row , num ) => {

            const params = new URLSearchParams({
                path: path,
                row: row,
                numResults : num
            })

            const requestUrl = `http://localhost:5029/Images?${params.toString()}`
            fetch(requestUrl)
            .then( response => {
                
                if (!response.ok)
                    throw new Error('Network response was not ok');
                
                return response.json()
            })
        }

        const downloadTarget = () => {

            //Download performs the downloading of the csv
            if(targets.length === 0){
                alert('Add Target points to Download data')
                return;
            }

            //setting up the data for headers and row data
            const header = ['Latitude', 'Longitude','Path', 'Row', 'Prediction']
            const rows = targets.map(entry =>[
                entry.lat,
                entry.lng,
                entry.path,
                entry.row,
                entry.prediction
            ])

            //mapping the rows to the headers
            const csv= [
                header.join(','),
                ...rows.map(e => e.join(','))
            ].join('\n')

            //create a binary large object? with the data and type(csv)
            const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;' })
            //creating link and url for the blob and download
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            //link setup for download
            link.setAttribute('href', url)
            link.setAttribute('download', 'data.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        }
        /*const uploadTarget = (file) => {
            if (!file) {
                alert('No file selected.');
                return;
            }
            console.log(Papa)
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const newTargets = results.data.map(row => ({
                        lat: parseFloat(row.Latitude),
                        lng: parseFloat(row.Longitude),
                        path: row.Path,
                        row: row.Row,
                        prediction: row.Prediction
                    }));
                    console.log(newTargets)
                    newTargets.forEach(newtarget => {
                        addTarget(newtarget)
                    });
                },
                error: (error) => {
                    console.error('Error parsing the file:', error);
                }
            });
        };*/

        return (
            <targetsContext.Provider value={{ targets , addTarget, deleteTarget , downloadTarget , getTargetImage , updateTargets , deleteAll }}>
                {children}
            </targetsContext.Provider>
        )

    }, [targetsContext] )

    const targetsState = useCallback( () => useContext(targetsContext) , [targetsContext])
    

    return {  TargetsProvider , targetsState }

}

export { useTarget , useWRS2 }