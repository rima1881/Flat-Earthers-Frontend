import * as turf from "@turf/turf";

let data;

const extractPathRows = (lat , lng) => {

    const point = turf.point([lng, lat]);
    
    console.log(data)

    const result = data.filter( feature => turf.booleanPointInPolygon(point,feature) )
        .map( feature => { 
            return {
                path : feature.properties.PATH ,
                row : feature.properties.ROW , 
                coordinates : feature.geometry.coordinates[0].map(e => { 
                    return { lat : e[1] , lng : e[0] }
                })
            }
        })

    return result

}

const  initData = () => (
    fetch("/WRS2.json")
      .then( response => response.json() )
      .then( db => data = db.features )
      .catch( err => console.log(err) )
)


export {extractPathRows , initData};