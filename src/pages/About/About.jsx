import { useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com'; 
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    // THREE.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-js-background').appendChild(renderer.domElement);

    // Add ambient light for soft overall lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    // Add directional light for strong sunlight-like effect
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50); // Position the light to shine on the Earth
    scene.add(directionalLight);

    // Create rotating Earth with enhanced material (MeshStandardMaterial)
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/public/earth_space_view.jpg'); // Ensure the texture path is correct
    const earthGeometry = new THREE.SphereGeometry(10, 32, 32);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.5, // Increase realism by adjusting material properties
      metalness: 0.1
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create star field
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 }); // Brighter stars
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.005; // Earth rotation speed
      stars.rotation.y += 0.001; // Star rotation speed
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Parallax effect for Earth and Stars
    ScrollTrigger.create({
      trigger: '.heroSection',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const scrollProgress = self.progress * 2 - 1;
        camera.position.y = scrollProgress * 5; // Move the camera up and down for the parallax effect
        camera.position.x = scrollProgress * 2; // Slight horizontal movement for the stars
        stars.rotation.y += 0.001; // Slow rotation of stars for a scrolling effect
      }
    });
  }, []);

    // EmailJS form submission handler
    const handleFormSubmit = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_tfjsok4', 'template_gcxdamq', e.target, 'suv-WSaV8cATttLjs')
        .then((result) => {
          alert('Message Sent Successfully!');
          e.target.reset(); // Reset the form after successful submission
        }, (error) => {
          alert('An error occurred. Please try again.');
        });
    };

  return (
    <div className={styles.aboutPage}>
      {/* Three.js Background */}
      <div id="three-js-background" className={styles.threeJsBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>About Us</h1>
          <p>We are a group of passionate computer engineering and computer science students from Concordia University, Montreal, Canada.</p>
          <p>We developed the Flat Earthers App to participate in NASA's 2024 International Space Apps Landsat Challenge.</p>
          <p>Our goal is to contribute our skills and knowledge while inspiring others' passion for satellite exploration.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2>Meet the Team</h2>
        <div className={styles.teamContainer}>
          <div className={styles.teamMember}>
            <h3>Amir Gharibipour</h3>
            <p>Project Manager + Frontend Developer</p>
            <p>Amir coordinated our team's timeline and also worked highly on frontend development of the project.</p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/rima1881" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/amirgharibipour/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div className={styles.teamMember}>
            <h3>Bryan Carlo Miguel</h3>
            <p>Backend Developer</p>
            <p>Bryan specialized in server-side programming and database management along with backend development.</p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/bryjen" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/bryancarlomiguel/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div className={styles.teamMember}>
            <h3>Mohammed Umaruddin</h3>
            <p>Frontend Developer</p>
            <p>Umar specializes in working on frontend development and also user interfaces and functionalities.</p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/genericlearner" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/mohammedumaruddin/" target="_blank" rel="noopener noreferrer">
                <img src="/public/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
          {/* Second row of team members */}
          <div className={styles.teamMember}>
            <h3>Joyal Biju Kulangara</h3>
            <p>UI/UX Designer</p>
            <p>Joyal ensured a smooth and dynamic user interface for our project along with brining a keen eye for design and user experiences.</p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/Joyal99" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/jbk79/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div className={styles.teamMember}>
            <h3>Elaheh Zehtab</h3>
            <p>DevOps</p>
            <p>Elaheh coordinated the deployment of our project.</p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/ELLIE-ZHB" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/elahehzehtab/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </section>

    {/* Contact Section */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

          {/* Footer Section */}
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href="https://github.com/Flat-Earthers-App" target="_blank" rel="noopener noreferrer">
          View our GitHub Repository
        </a>
        <div className={styles.copyright}>
          <img src="/logo.webp" alt="Flat Earthers Logo" className={styles.footerLogo} />
          <span>© 2024 Flat Earthers</span>
        </div>
      </div>
    </footer>
    </div>

  );
}