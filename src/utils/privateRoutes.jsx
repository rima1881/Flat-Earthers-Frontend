import { Outlet, Navigate } from "react-router-dom"
import useAuth from "./useAuth"

const PrivateRoutes = () => {

    const { userState } = useAuth()
    const { user } = userState()
    const isAuthenticated = user.token != ''
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
  
  
export default PrivateRoutes