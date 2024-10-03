import { useState , createContext , useContext, useCallback } from "react"

const AuthContext = createContext()

const useAuth = () => {

    const AuthProvider = useCallback( () => {

        const [ user , setUser ] = useState( () => {
            const savedAuth = Cookies.get('auth')
            return savedAuth ? JSON.parse(savedAuth) : { email : '' , token : '' }
        })

        const saveUser = ( user ) => {
            Cookies.set('auth', JSON.stringify(token), { expires: 1 / 24 })
            setToken( token )
        }

        const forgetUser = () => {
            Cookies.remove('auth')
            setToken( null )
        }
        
        return (
            <AuthContext.Provider value={{user , saveUser , forgetUser }}>
                {children}
            </AuthContext.Provider>
        )        

    } , [AuthContext] )

    const targetsState = useCallback( () => useContext(targetsContext) , [targetsContext])


    return { AuthProvider , targetsState }

}



export default useAuth