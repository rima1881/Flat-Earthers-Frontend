import { useState , createContext , useContext, useCallback } from "react"
import Cookies from "js-cookie";

const AuthContext = createContext()

const useAuth = () => {

    const AuthProvider = ({ children }) => {

        const [ user , setUser ] = useState( () => {
            const savedAuth = Cookies.get('auth')
            return savedAuth ? JSON.parse(savedAuth) : { email : '' , token : '' }
        })

        const saveUser = async (data) => {
            

            const parsedData = { email : data.email , token : data.token }
            Cookies.set('auth' , JSON.stringify(parsedData), {expires: 1/24} )
            setUser(parsedData)

        }

        const logIn = async ( user ) => {

            try{

                const response = await fetch("http://localhost:5029/login", {
                    method: 'POST', // Specify the method
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify( { email : user.email , password : user.password } )
                })
                            
                if (!response.ok)
                    throw new Error('Network response was not ok ' + response.statusText)
                  
                const data = await response.json()          
                const { token } = data
                const { email } = user

                saveUser({ email : email , token : token })
            }
            catch(err){
                console.log(err)
                return false
            }

            return true

        }

        const signUp = async ( user ) => {

            try{
                
                const response = await fetch("http://localhost:5029/Register", {
                    method: 'POST', // Specify the method
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify( { email : user.email , password : user.password } )
                })
                        
                if (!response.ok)
                    throw new Error('Network response was not ok ' + response.statusText);
                  
                const data = await response.json()
                
                const email = data.user.email
                const token = { data }

                saveUser({ email : email , token : token })
            }
            catch(err){
                console.log(err)
                return false
            }

            return true

        }

        const logout = () => {
            Cookies.remove('auth')
            setUser( { email : '' , token : ''} )
        }
        
        return (
            <AuthContext.Provider value={{user , logIn , signUp , logout }}>
                {children}
            </AuthContext.Provider>
        )        

    }

    const userState = useCallback( () => useContext(AuthContext) , [AuthContext])

    return { AuthProvider , userState }

}



export default useAuth