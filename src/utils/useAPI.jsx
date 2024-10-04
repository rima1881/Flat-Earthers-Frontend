import useAuth from "./useAuth"
import { useCallback } from "react"


const useAPI = () => {

    const { userState } = useAuth()
    const { user , logout } = userState()


    //API Calling the sync the data
    const pushTargets = useCallback((targets ) => {

        const token = user.token


        console.log(targets)

        return false

    }, [user])

    const pullTargets = useCallback((  ) => {

        const token = user.token

        console.log("pulling targets from server...")

        return false

    }, [user])

    const deleteTargetServer = useCallback( (target) => {

        const token = user.token

        console.log("target is getting deleted from server")

        return false

    } , [user])

    const getTargetDetails = useCallback( (targetId) => {

        const token = user.token

        console.log("fetching details from server")

        return { row : 0 , path : 0 , Path : 0 , Row : 0 , count : 0 , offset : 0 }

    } , [user])

    return { pushTargets , pullTargets , deleteTargetServer , getTargetDetails }
}

export default useAPI