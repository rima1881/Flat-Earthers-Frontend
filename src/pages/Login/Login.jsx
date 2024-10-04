import { useState } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";
import { dark } from "@mui/material/styles/createPalette";


export default function Login() {

  const { userState } = useAuth()
  const { saveUser } = userState()

  const [login , setLogin] = useState( { "email" : ""  , "password" : "" } )

  const inputHandle = (event) => {
    const { name , value} = event.target
        setLogin(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

  }

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("I was clicked")
    
    fetch("http://localhost:5029/Register", {
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

      })
      .catch((err) => console.log(err));


  };


  return <div className={styles.container}>

    <div className={styles.loginForm}>
        <div className={styles.logo}></div>
        <input name="email" type="text" placeholder="Notification Email" className={styles.inputEmail} value={login.email} onChange={inputHandle} />
        <input name="password" type="password" placeholder="password" className={styles.innputPass} value={login.password} onChange={inputHandle} />
        <button className={styles.button} onClick={submitHandler}>Login</button>
    </div>


  </div>;
}
