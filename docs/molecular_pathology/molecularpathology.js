// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    });

    // Sticky Header
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-list a').forEach(link => {
                    link.classList.remove('active');
                });
                
                document.querySelector(`.nav-list a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    });

    // Form Submission Handler
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Display form submission confirmation
            // In a real implementation, you would send this data to a server
            alert('Thank you for your inquiry! We will contact you shortly.');
            
            // Reset the form
            consultationForm.reset();
        });
    }

    // Animation on scroll
    // Simple animation for elements as they come into view
    const animateElements = document.querySelectorAll('.service-card, .client-card, .why-us-card, .feature');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    checkIfInView();
    
    // Check again on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Add animations class to CSS elements
    document.querySelectorAll('.service-card, .client-card, .why-us-card').forEach((element, index) => {
        element.style.transitionDelay = (index * 0.1) + 's';
    });
});