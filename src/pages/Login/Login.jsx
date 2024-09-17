import { useRef } from "react";
import styles from "./Login.module.css";


export default function Login(props) {

  console.log(props);

  const setUserEmail = props.setUserEmail;

  const submitHandler = (e) => {
    e.preventDefault();
    
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => {
        setUserEmail(data.fact);
      })
      .catch((err) => console.log(err));


  };


  return <div className={styles.container}>

    <div className={styles.loginForm}>
        <div className={styles.logo}></div>
        <input type="text" placeholder="Notification Email" className={styles.inputEmail} />
        <button className={styles.button} onClick={submitHandler}>Login</button>
    </div>


  </div>;
}
