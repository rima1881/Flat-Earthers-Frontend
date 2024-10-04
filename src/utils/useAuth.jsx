import { useState , createContext , useContext, useCallback } from "react"
import Cookies from "js-cookie";


const AuthContext = createContext()

const useAuth = () => {

    const AuthProvider = useCallback( ({ children }) => {

        const [ user , setUser ] = useState( () => {
            const savedAuth = Cookies.get('auth')
            return savedAuth ? JSON.parse(savedAuth) : { email : '' , token : '' }
        })

        const saveUser = ( user ) => {
            Cookies.set('auth', JSON.stringify(token), { expires: 1 / 24 })
            setToken( token )
        }

        const forgetUser = () => {
            alert("Your token has expired")
            Cookies.remove('auth')
            setUser( { email : '' , token : ''} )
        }
        
        return (
            <AuthContext.Provider value={{user , saveUser , forgetUser }}>
                {children}
            </AuthContext.Provider>
        )        

    }, [AuthContext])

    const userState = useCallback( () => useContext(AuthContext) , [AuthContext])


    return { AuthProvider , userState }

}



export default useAuth