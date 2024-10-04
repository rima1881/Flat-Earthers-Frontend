import { useState , createContext , useContext, useCallback } from "react"
import Cookies from "js-cookie";


const AuthContext = createContext()

const useAuth = () => {

    const AuthProvider = useCallback( ({ children }) => {

        const [ user , setUser ] = useState( () => {
            const savedAuth = Cookies.get('auth')
            return savedAuth ? JSON.parse(savedAuth) : { email : '' , token : '' }
        })

        const logIn = ( user ) => {

            fetch("http://localhost:5029/login", {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify( { email : login.email , password : login.password } )
            })
            .then((response) => {
                  
              console.log(response)
          
              if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText);
                  
                return response.json()
            })
            .then((data) => {
          
                console.log(data)
          
                //  Fuck Umar
                saveUser({ email : "fuckUmar@fuckUmar.fuckUmar" , token : "fuckUmarfuckUmarfuckUmar" })
            })
            .catch((err) => console.log(err))

            Cookies.set('auth', JSON.stringify(user), { expires: 1 / 24 })
            setUser( user )
        }

        const signUp = ( user ) => {

            fetch("http://localhost:5029/login", {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify( { email : login.email , password : login.password } )
            })
            .then((response) => {
                  
              console.log(response)
          
              if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText);
                  
                return response.json()
            })
            .then((data) => {
          
                console.log(data)
          
                //  Fuck Umar
                saveUser({ email : "fuckUmar@fuckUmar.fuckUmar" , token : "fuckUmarfuckUmarfuckUmar" })
            })
            .catch((err) => console.log(err))

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

    }, [AuthContext])

    const userState = useCallback( () => useContext(AuthContext) , [AuthContext])

    return { AuthProvider , userState }

}



export default useAuth