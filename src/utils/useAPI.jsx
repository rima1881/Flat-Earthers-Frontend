import useAuth from "./useAuth"
import { useCallback } from "react"
import { useTarget } from "./useTarget"


const useAPI = () => {

    const { userState } = useAuth()
    const { user , logout } = userState()
    const { targetsState } = useTarget()
    const { targets , updateTargets , deleteLocal } = targetsState()

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
    //API Calling the sync the data
    const pushTargets = useCallback( async () => {

        const token = user.token

        console.log(targets)

        const localTarget = targets.filter( t => t.guid == -1 ).map( t => ({ 
            path : t.path,
            row : t.row,
            latitude: t.lat,
            longitude: t.lng,
            minCloudCover: t.minCC,
            maxCloudCover: t.maxCC,
            notificationOffset: "01:00:00"
        }))
        
        const response = await fetch("http://localhost:5029/addtargets", {
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

        if (!response.ok)
            throw new Error('Network response was not ok ' + response.statusText)

        
        const pars = await response.json()

        deleteLocal()

        const updatedT = localTarget.map( (t,index) => ({
            guid : pars[index],
            lat : t.latitude,
            lng : t.longitude,
            row : t.row,
            path : t.path,
            ccmax : t.maxCloudCover,
            ccmin : t.minCloudCover 
            
        }))

        console.log(updatedT)

        updateTargets(updatedT)


    }, [user])

    const pullTargets = useCallback((  ) => {

        const token = user.token

        const param =  new URLSearchParams({
            email: user.email
        })

        const requestURL = `http://localhost:5029/gettargets?${param.toString()}`

        fetch(requestURL , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            }
        })
        .then( response => {
            if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText);
                  
            return response.json()
        })
        .then(data => {

            const parsedData = data.map( t => ({ 
                guid : t.guid,
                lat : t.latitude,
                lng : t.longitude,
                row : t.row,
                path : t.path,
                ccmax : t.maxCloudCover,
                ccmin : t.minCloudCover 
            }))

            const newTargets = [...targets]


            parsedData.forEach( t2 => {
                if (!targets.some( t1 => t1.guid == t2.guid ))
                    newTargets.push(t2)
            })

            updateTargets(newTargets)


        })

    }, [user])

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

    const getTargetDetails = useCallback( targetId => {

        const token = user.token

        console.log("fetching details from server")

        return { row : 0 , path : 0 , Path : 0 , Row : 0 , count : 0 , offset : 0 }

    } , [user])

    return { pushTargets , pullTargets , deleteTargetServer , getTargetDetails , addTargetAPI}
}

export default useAPI