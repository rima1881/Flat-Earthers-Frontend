import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { userState } = useAuth();
  const { user, logIn, signUp } = userState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token !== '') {
      navigate('/');
    }
  }, [user, navigate]);

  const [isLoggingIn, setIsLoggingIn] = useState(true); // Tracks login/signup state
  const [formData, setFormData] = useState({ email: "", password: "", confPwd: "" });

  // Handles input changes for email, password, and confirmation password
  const inputHandle = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles form submission
  const submitHandler = (e) => {
    e.preventDefault();

    if (isLoggingIn) {
      logIn(formData); // Log in
    } else {
      if (formData.password !== formData.confPwd) {
        alert("Passwords do not match!");
        return;
      }
      signUp(formData); // Sign up
    }
  };

  // Toggle between login and sign-up states
  const toggleSwitch = () => {
    setIsLoggingIn((prev) => !prev); // Switch between Login and Sign Up
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>

        {/* Toggle Switch */}
        <label className={styles.switch}>
  <input type="checkbox" checked={!isLoggingIn} onChange={toggleSwitch} />
  <span className={styles.slider}>
    {isLoggingIn ? <span>Login</span> : <span>Sign Up</span>}
  </span>
</label>




        {/* Conditionally render login or sign-up form */}
        <form onSubmit={submitHandler}>
          <input
            name="email"
            type="text"
            placeholder="Notification Email"
            className={styles.inputEmail}
            value={formData.email}
            onChange={inputHandle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.inputEmail}
            value={formData.password}
            onChange={inputHandle}
          />

          {/* Render confirm password field only if signing up */}
          {!isLoggingIn && (
            <input
              name="confPwd"
              type="password"
              placeholder="Confirm Password"
              className={styles.inputEmail}
              value={formData.confPwd}
              onChange={inputHandle}
            />
          )}

          <button className={styles.button} type="submit">
            {isLoggingIn ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
