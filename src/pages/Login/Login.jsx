import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import useAuth from "../../utils/useAuth";
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';  // Import Three.js
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';  // Import the STLLoader

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
    const geometry = new THREE.SphereGeometry(11, 64, 64);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add Directional Light for Day/Night Cycle
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(30, 30, 30); // Initial position for the light
    scene.add(sunLight);

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

    // Load the satellite model using STLLoader
    const loader = new STLLoader();
    let satellite = null;  // To store the loaded satellite

    loader.load('/public/3LandSat9Parts.stl', (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
      satellite = new THREE.Mesh(geometry, material);
      satellite.scale.set(0.02, 0.02, 0.02);  // Adjust the scale as needed
      satellite.position.set(0, 3, 0);  // Initial position above the Earth
      scene.add(satellite);
    }, undefined, (error) => {
      console.error('An error happened while loading the satellite model', error);
    });

    let satelliteAngle = 0;

    const updateSatellitePosition = () => {
      const satelliteDistance = 13;  // Distance of the satellite from the Earth
      satelliteAngle += 0.01;  // Speed of the satellite
      if (satellite) {
        satellite.position.x = Math.cos(satelliteAngle) * satelliteDistance;
        satellite.position.z = Math.sin(satelliteAngle) * satelliteDistance;
        satellite.rotation.x = Math.PI / 4; // Tilt the satellite orbit
      }
    };

    // Set the camera distance from the scene
    camera.position.z = 25;

    // Add directional light to highlight the satellite
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);  // Position the light
    scene.add(directionalLight);

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the Earth
      earth.rotation.y += 0.005;

      // Update satellite position
      updateSatellitePosition();

      // Simulate Day/Night Cycle by rotating the sun around the Earth
      sunLight.position.x = Math.cos(earth.rotation.y) * 50;
      sunLight.position.z = Math.sin(earth.rotation.y) * 50;

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
