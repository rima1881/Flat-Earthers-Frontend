import useAuth from "./useAuth"
import { useCallback , useState , useEffect } from "react"
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

    const syncUserTarget = useCallback( async () => {

        const token = user.token

        const param =  new URLSearchParams({
            email: user.email
        })

        try{

            console.log(targets)

            const localTarget = targets.filter(t => t.guid == -1).map( t => ({ 
                path : t.path,
                row : t.row,
                latitude: t.lat,
                longitude: t.lng,
                minCloudCover: t.minCC,
                maxCloudCover: t.maxCC,
                prediction : t.prediction,
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
    
                console.log(requestURL)

                addedTargets = localTarget.map( (t, index) => ({
                    guid : ids[index],
                    path : t.path,
                    row : t.row,
                    lat: t.latitude,
                    lng: t.longitude,
                    minCloudCover: t.minCC,
                    maxCloudCover: t.maxCC,
                    prediction : t.prediction,
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

            console.log("kir")
            console.log(DBtargets)

            console.log("mammad")
            console.log(DBtargets)

            const parsedData = DBtargets.map( t => ({ 
                guid : t.guid,
                lat : t.latitude,
                lng : t.longitude,
                row : t.row,
                path : t.path,
                ccmax : t.maxCloudCover,
                ccmin : t.minCloudCover ,
                prediction : t.prediction,
                notificationOffset : t.notificationOffset
            }))

            let newTargets

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

    const editTarget = useCallback ( async ( ccmin , ccmax , notificationOffset ) => {

        const token = user.token

        const response = await fetch("http://localhost:5029/EditTarget" , {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            body: JSON.stringify( {
                targetGuid : user.email,
                newMinCloudCover : ccmin,
                newMaxCloudCover : ccmax,
                newNotificationOffset : "01:00:00"
            })
        })

        if (!response.ok)
            throw new Error('Network response was not ok ' + response.statusText)

        const data = await response.json()

        console.log(data)

    }, [ user ])

    return { deleteTargetServer , addTargetAPI , syncUserTarget , editTarget}
}

export default useAPI