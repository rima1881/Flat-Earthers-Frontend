import { useState } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";


export default function Login() {

  const { userState } = useAuth()
  const { logIn , signUp } = userState()

  const [ isLoggingIn , setIsLogginIn ] = useState(true)
  const [ formData , setFormData] = useState( { email : ""  , password : "" , confPwd : "" } )

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
      logIn(formData)
    else
      signUp(formData)

  };

  const LoginTemplate = <>
    <input name="email" type="text" placeholder="Notification Email" className={styles.inputEmail} value={formData.email} onChange={inputHandle} />
    <input name="password" type="password" placeholder="password" className={styles.innputPass} value={formData.password} onChange={inputHandle} />
  </>

  const SignUpTemplate = <>
    <input name="email" type="text" placeholder="Notification Email" className={styles.inputEmail} value={formData.email} onChange={inputHandle} />
    <input name="password" type="password" placeholder="password" className={styles.innputPass} value={formData.password} onChange={inputHandle} />
    <input name="confPwd" type="password" placeholder="password" className={styles.innputPass} value={formData.confPwd} onChange={inputHandle} />
  </>

  const swithHandle = () => {
    setIsLogginIn(prev => !prev)
  }

  return <div className={styles.container}>


    <div className={styles.loginForm}>
      <button onClick={swithHandle}> Login | SignUp </button>
      <div className={styles.logo}></div>
      {isLoggingIn ? LoginTemplate : SignUpTemplate}
      <button className={styles.button} onClick={submitHandler}>{isLoggingIn ? "Login" : "SignUp"}</button>
    </div>

  </div>;
}
