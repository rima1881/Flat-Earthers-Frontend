import useAuth from "./useAuth"
import { useCallback } from "react"
import { useTarget } from "./useTarget"


const useAPI = () => {

    const { userState } = useAuth()
    const { user , logout } = userState()
    const { targetsState } = useTarget()
    const { targets , updateTargets , deleteAll } = targetsState()

    const addTargetAPI = useCallback( async (target) => {

        const token = user.token

        try{
            const response = await fetch("http://localhost:5029/addtargets", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token
                },
                body: JSON.stringify( {
                    email : user.email,
                    targets : [{
                        path : target.path,
                        row : target.row,
                        latitude: target.lat,
                        longitude: target.lng,
                        minCloudCover: target.minCC,
                        maxCloudCover: target.maxCC,
                        notificationOffset: "01:00:00"
                    }]
                })
            })

            if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText)

            const guid = await response.json()
            console.log(guid)
            return guid[0]

        }catch (error) {
            console.log(error);
            return -1
        }
    } , [])

    const deleteTargetServer = useCallback( guid => {

        const token = user.token

        const params = new URLSearchParams({
            email: user.email,
            guid: guid
        })

        const requestUrl = `http://localhost:5029/deleteTarget?${params.toString()}`

        fetch(requestUrl , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            }
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Network response was not ok ' + response.statusText);

            console.log("Data was deleted")
        })


        return false

    } , [user])

    const getTargetDetails = useCallback( async guid => {

        const token = user.token

        try{
            
            const st = targets.find( t => st.guid == guid )

            const params = new URLSearchParams({
                path : st.path,
                row : st.row,
                numResults : 5
            })

            const requestURL = `http://localhost:5029/Images?${params.toString()}`

            const response = await fetch( "requestURL" )

            if (!response.ok)
                throw new Error('Network response was not ok');
            
            const data = await response.json();

        }
        catch(error){
            return null
        }

        return { row : 0 , path : 0 , Path : 0 , Row : 0 , count : 0 , offset : 0 }

    } , [user])

    const syncUserTarget = useCallback( async () => {

        const token = user.token

        const param =  new URLSearchParams({
            email: user.email
        })

        try{

            const localTarget = targets.filter(t => t.guid == -1).map( t => ({ 
                path : t.path,
                row : t.row,
                latitude: t.lat,
                longitude: t.lng,
                minCloudCover: t.minCC,
                maxCloudCover: t.maxCC,
                notificationOffset: "01:00:00"
            }))
            let addedTargets
            if ( localTarget.length != 0 ){
                
                const response1 = await fetch("http://localhost:5029/addtargets", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': token
                    },
                    body: JSON.stringify( {
                        email : user.email,
                        targets : localTarget
                    })
                })
    
                if (!response1.ok)
                    throw new Error('Network response was not ok ' + response1.statusText)
    
                const ids = await response1.json()
    
                addedTargets = localTarget.map( (t, index) => ({
                    guid : ids[index],
                    path : t.path,
                    row : t.row,
                    lat: t.latitude,
                    lng: t.longitude,
                    minCloudCover: t.minCC,
                    maxCloudCover: t.maxCC,
                    notificationOffset: "01:00:00"
                }))
    
                deleteAll()
            }
            const requestURL = `http://localhost:5029/gettargets?${param.toString()}`

            const response2 = await fetch(requestURL , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token
                }
            })
    
            if (!response2.ok)
                throw new Error('Network response was not ok ' + response2.statusText);
                  
            const DBtargets = await response2.json()

            const parsedData = DBtargets.map( t => ({ 
                guid : t.guid,
                lat : t.latitude,
                lng : t.longitude,
                row : t.row,
                path : t.path,
                ccmax : t.maxCloudCover,
                ccmin : t.minCloudCover 
            }))

            let newTargets;

            if(addedTargets){
                newTargets = [...addedTargets, ...parsedData]
            }
            else{
                newTargets = [...parsedData]
            }

            updateTargets(newTargets)
        }
        catch(error){
            console.log(error)
        }

    }, [user])


    return { deleteTargetServer , getTargetDetails , addTargetAPI , syncUserTarget}
}

export default useAPI