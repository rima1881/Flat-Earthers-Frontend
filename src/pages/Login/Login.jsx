import { useState } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";


export default function Login() {

  const { userState } = useAuth()
  const { logIn , signUp } = userState()

  const [ isLoggingIn , setIsLogginIn ] = useState(true)
  const [ formData , setFormData] = useState( { "email" : ""  , "password" : "" } )

  const inputHandle = (event) => {
    const { name , value} = event.target
      setFormData(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

  }

  const submitHandler = (e) => {
    e.preventDefault()

    if(isLoggingIn)
      logIn()
    else
      signUp()

  };

  const LoginTemplate = <div className={styles.loginForm}>
    <div className={styles.logo}></div>
    <input name="email" type="text" placeholder="Notification Email" className={styles.inputEmail} value={formData.email} onChange={inputHandle} />
    <input name="password" type="password" placeholder="password" className={styles.innputPass} value={formData.password} onChange={inputHandle} />
    <button className={styles.button} onClick={submitHandler}>Login</button>
  </div>

  const SignUpTemplate = <div>
    <p>Fuck umar from sign up</p>
    <button className={styles.button} onClick={submitHandler}>Login</button>
  </div>

  const swithHandle = () => {
    setIsLogginIn(prev => !prev)
  }

  return <div className={styles.container}>

    <button onClick={swithHandle}> Login | SignUp </button>
    {isLoggingIn ? LoginTemplate : SignUpTemplate}

  </div>;
}
