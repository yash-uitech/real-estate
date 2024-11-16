document.addEventListener('DOMContentLoaded', function () {
    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    });

    // Visit counter functionality
    function updateVisitCounts() {
        let overallVisits = localStorage.getItem('overallVisitCount');
        let repeatVisits = localStorage.getItem('repeatVisitCount');
        let lastVisit = localStorage.getItem('lastVisit');
        let now = new Date().getTime();

        // Initialize or update overall visits
        if (!overallVisits) {
            overallVisits = 10000; // Start with a base number to make it look established
        } else {
            overallVisits = parseInt(overallVisits);
        }

        // Initialize or update repeat visits
        if (!repeatVisits) {
            repeatVisits = 1;
        } else {
            repeatVisits = parseInt(repeatVisits) + 1;
        }

        // Increment overall visits (simulating other users)
        if (!lastVisit || now - parseInt(lastVisit) > 3600000) { // 1 hour in milliseconds
            overallVisits += Math.floor(Math.random() * 5) + 1; // Increment by 1-5 randomly
            localStorage.setItem('lastVisit', now);
        }

        // Update localStorage and display
        localStorage.setItem('overallVisitCount', overallVisits);
        localStorage.setItem('repeatVisitCount', repeatVisits);
        document.getElementById('overall-visit-count').textContent = overallVisits.toLocaleString();
        document.getElementById('repeat-visit-count').textContent = repeatVisits.toLocaleString();
    }

    updateVisitCounts();

    // Animate visit counter
    const visitCounter = document.getElementById('visit-counter');
    visitCounter.style.opacity = '0';
    visitCounter.style.transform = 'translateY(20px)';

    setTimeout(() => {
        visitCounter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        visitCounter.style.opacity = '1';
        visitCounter.style.transform = 'translateY(0)';
    }, 1000);


    // Pop-up contact form functionality
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupBtn = document.getElementById('close-popup');
    const popupContactForm = document.getElementById('popup-contact-form');
    const formStatus = document.getElementById('form-status');

    // Show pop-up after 5 seconds
    setTimeout(() => {
        popupOverlay.classList.add('show');
    }, 5000);

    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('show');
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('show');
        }
    });

    popupContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading indicator
        formStatus.innerHTML = '<span class="loading"></span>Sending...';
        formStatus.className = 'form-status';

        const formData = new FormData(popupContactForm);

        try {
            const response = await fetch(popupContactForm.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.status === 200) {
                formStatus.textContent = 'Thank you for your message. We will get back to you soon!';
                formStatus.className = 'form-status success';
                popupContactForm.reset();

                // Close the popup after 3 seconds
                setTimeout(() => {
                    popupOverlay.classList.remove('show');
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 3000);
            } else {
                throw new Error(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            formStatus.textContent = error.message;
            formStatus.className = 'form-status error';
        }
    });




    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });


    // Particle.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const title = document.querySelector('.parallax-title');
    const text = document.querySelector('.parallax-text');
    const btn = document.querySelector('.parallax-btn');

    hero.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        title.style.transform = `translateZ(50px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        text.style.transform = `translateZ(30px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        btn.style.transform = `translateZ(20px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        title.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        text.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        btn.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
    });

    // Typing animation for hero title
    const typingText = document.querySelector('.typing-text');
    const textToType = "Find your dream home";
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typingText.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Lightbox gallery for property images
    // lightGallery(document.getElementById('properties'), {
    //     selector: '.view-gallery',
    //     plugins: [lgZoom, lgThumbnail],
    //     speed: 500,
    // });

    // // GSAP animations
    // gsap.registerPlugin(ScrollTrigger);

    // gsap.from('.about-content', {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     scrollTrigger: {
    //         trigger: '.about-content',
    //         start: 'top 80%',
    //     }
    // });

    // gsap.from('.property-card', {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //         trigger: '.property-grid',
    //         start: 'top 80%',
    //     }
    // });

    // gsap.from('.amenity-item', {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //         trigger: '.amenities-grid',
    //         start: 'top 80%',
    //     }
    // });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // View Info button functionality
    const viewInfoButtons = document.querySelectorAll('.view-info-btn');
    viewInfoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const propertyCard = this.closest('.property-card');
            const title = propertyCard.querySelector('.property-title').textContent;
            const price = propertyCard.querySelector('.property-price').textContent;
            const features = propertyCard.querySelector('.property-features').textContent;

            const infoMessage = `
                Property: ${title}
                Price: ${price}
                Features: ${features}
                
                For more information or to schedule a viewing, please contact our sales team.
            `;

            alert(infoMessage);
        });
    });


    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = +stat.innerText;
            const speed = 200; // Lower is faster
            const inc = target / speed;

            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }

            // Animate progress bar
            const progressBar = stat.nextElementSibling.nextElementSibling.querySelector('.progress');
            progressBar.style.width = `${(count / target) * 100}%`;
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);


    // 3D tilt effect for property cards
    VanillaTilt.init(document.querySelectorAll(".property-card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Floating animation for amenity icons
    const amenityIcons = document.querySelectorAll('.amenity-item i');
    amenityIcons.forEach(icon => {
        gsap.to(icon, {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });


});


document.addEventListener('DOMContentLoaded', function () {
    // ... (previous code remains unchanged) ...

    // About image animation
    const aboutImage = document.querySelector('.about-image');
    const aboutImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutImage.classList.add('animate');
                aboutImageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutImageObserver.observe(aboutImage);

    // ... (rest of the code remains unchanged) ...

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.about-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        }
    });


    // ... (rest of the GSAP animations remain unchanged) ...

    // ... (rest of the code remains unchanged) ...
});
// dark and loght

document.addEventListener('DOMContentLoaded', function () {
    // Theme switcher
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
            document.body.classList.add('light-mode');
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    });

    // Particle.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // ... (rest of the existing JavaScript code) ...
});

//animation for number
function animateNumber(element, target, duration) {
    const start = parseInt(element.textContent, 10);
    const startTime = performance.now();

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentNumber = Math.floor(easedProgress * (target - start) + start);

        element.textContent = currentNumber;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target, 10);
            animateNumber(entry.target, target, 1000);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat-number').forEach(numberElement => {
    observer.observe(numberElement);
});

document.addEventListener('DOMContentLoaded', function () {
    // Existing code remains unchanged



    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address');
        } else {
            removeError(email);
        }

        if (subject.value === '') {
            isValid = false;
            showError(subject, 'Please select a subject');
        } else {
            removeError(subject);
        }

        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});


