document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  
    // Hide intro section after animation
    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    }, 3000);
  
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Initialize Typed.js
    if (document.querySelector(".typing-effect")) {
      const typedElement = document.querySelector(".typing-effect");
  
      if (!typedElement.hasAttribute("data-typed-init")) {
        typedElement.setAttribute("data-typed-init", "true");
  
        try {
          new Typed('.typing-effect', {
            strings: [
              "Engineering Student",
              "cybersecurity expert",
              "Network Expert",
              "Web Developer"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: false,
          });
        } catch (error) {
          console.error("Typed.js failed to initialize:", error);
        }
      }
    }
  
    // Three.js Background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background'), alpha: true });
  
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Reduced for performance
    const posArray = new Float32Array(particlesCount * 3);
  
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
  
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#05F2F2', // Light Cyan Particles
    });
  
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
  
    camera.position.z = 1;
  
    function animate() {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
  
    animate();
  
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  
    // Back-to-Top Button
    const backToTopButton = document.getElementById('back-to-top');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
  
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Dynamic Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();
  });
