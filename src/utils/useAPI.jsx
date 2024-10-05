import useAuth from "./useAuth"
import { useCallback } from "react"


const useAPI = () => {

    const { userState } = useAuth()
    const { user , logout } = userState()

    //API Calling the sync the data
    const pushTargets = useCallback( targets => {

        const token = user.token
        return false

    }, [user])

    const pullTargets = useCallback((  ) => {

        const token = user.token

        const param =  new URLSearchParams({
            email: "amir@gmail.com"
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
            email: email,
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

    return { pushTargets , pullTargets , deleteTargetServer , getTargetDetails }
}

export default useAPI