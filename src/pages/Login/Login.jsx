import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';  // Import Three.js

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

  // Add Three.js Earth background using useEffect
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('earth-background').appendChild(renderer.domElement);
  
    // Load the Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/public/earth_space_view.jpg');
    const geometry = new THREE.SphereGeometry(12, 64, 64);  // Increased size
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
  
    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  
    // Create a satellite orbiting the Earth
    const satelliteGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    scene.add(satellite);
  
    let satelliteAngle = 0;
  
    const updateSatellitePosition = () => {
      const satelliteDistance = 13;
      satelliteAngle += 0.01;
      satellite.position.x = Math.cos(satelliteAngle) * satelliteDistance;
      satellite.position.z = Math.sin(satelliteAngle) * satelliteDistance;
      satellite.position.y = 3;
    };
  
    // Optional: Add nebula/galaxy background
    const spaceTexture = textureLoader.load('/assets/space-nebula.jpg');
    const spaceGeometry = new THREE.SphereGeometry(500, 64, 64);
    const spaceMaterial = new THREE.MeshBasicMaterial({ map: spaceTexture, side: THREE.BackSide });
    const space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(space);
  
    camera.position.z = 25;
  
    const animate = function () {
      requestAnimationFrame(animate);
  
      // Rotate Earth and move the satellite
      earth.rotation.y += 0.005;
      updateSatellitePosition();
  
      renderer.render(scene, camera);
    };
  
    animate();
  
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div className={styles.container}>
      {/* Div for Earth background */}
      <div id="earth-background" className={styles.earthBackground}></div> 

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
