import useAuth from "./useAuth"
import { useCallback } from "react"


const useAPI = () => {

    const { userState } = useAuth()
    const { user , logout } = userState()

    const addTargetAPI = useCallback( target => {

        const token = user.token
        console.log(token)

        fetch("http://localhost:5029/addtargets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            body: JSON.stringify( {
                email : user.email,
                targets : [{
                    guid : "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    path : target.path,
                    row : target.row,
                    latitude: target.lat,
                    longitude: target.lng,
                    minCloudCover: target.minCC,
                    maxCloudCover: target.maxCC,
                    notificationOffset: "02:00:00"
                }]
            })
        })
        .then( response => {
            if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText)   
            
            return response.json()
        })
        .then( data => 
            console.log(data)
        )
        .catch( error => 
            console.log(error)
        )

    } , [])
    //API Calling the sync the data
    const pushTargets = useCallback( targets => {

        const token = user.token
        return false

        


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
        .then(data => console.log(data))

        return false

    }, [user])

    const deleteTargetServer = useCallback( target => {

        const token = user.token
        const email = "amir@gmail.com"

        const params = new URLSearchParams({
            email: user.email,
            guid: target.guid
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