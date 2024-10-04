import useAuth from "./useAuth"
import { useCallback } from "react"


const useAPI = () => {

    const { userState } = useAuth()

    const { user , forgetUser } = userState()

    //API Calling the sync the data
    const pushTargets = useCallback((targets ) => {

        const token = user.token


        console.log(targets)

    }, [user])

    const pullTargets = useCallback((  ) => {

        const token = user.token


        console.log("pulling targets from server...")
    }, [user])

    const deleteTargetServer = useCallback( (target ) => {

        const token = user.token

        console.log("target is getting deleted from sercer")

    } , [user])

    const getTargetDetails = useCallback( (target ) => {

        const token = user.token

        console.log("fetching details from server")
    } , [user])

    return { pushTargets , pullTargets , deleteTargetServer , getTargetDetails }
}

export default useAPI