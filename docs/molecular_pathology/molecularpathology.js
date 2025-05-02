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

    // Services Tab Functionality

});

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.services-tabs .tab');
    const panels = document.querySelectorAll('.service-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the service type from data attribute
            const serviceType = this.getAttribute('data-service');
            
            // Hide all panels
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Show the corresponding panel
            document.getElementById(`${serviceType}-panel`).classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Services Tab Functionality - Fixed version
    const tabs = document.querySelectorAll('.services-tabs .tab');
    const panels = document.querySelectorAll('.service-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the service type from data attribute
            const serviceType = this.getAttribute('data-service');
            
            // Hide all panels
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Show the corresponding panel
            document.getElementById(`${serviceType}-panel`).classList.add('active');
            
            // Remove the scrolling behavior that was causing the issue
            // No need to scroll back to the top of the panel section
        });
    });
});
// Handle dropdown on mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    });
});

// Enhanced Section Fade-In Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create and append CSS for fade-in animations
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s ease, transform 1s ease;
            will-change: opacity, transform;
        }
        
        .fade-in-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations for items within sections */
        .stagger-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: var(--stagger-delay, 0ms);
            will-change: opacity, transform;
        }
        
        .is-visible .stagger-item {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleEl);
    
    // Select all major sections to animate - include all sections on the page
    const sections = document.querySelectorAll('section');
    
    // Add fade-in-section class to all sections
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // Add stagger classes to items within sections
    const staggerElements = {
        // Hero section elements
        '.hero-content > *': document.querySelectorAll('.hero-content > *'),
        // About section
        '.about-content > *': document.querySelectorAll('.about-content > *'),
        // Core values section
        '.value-item': document.querySelectorAll('.value-item'),
        // Services tabs
        '.tab-btn': document.querySelectorAll('.tab-btn'),
        // Clients section
        '.client-card': document.querySelectorAll('.client-card'),
        // Why us section
        '.reason-card': document.querySelectorAll('.reason-card')
    };
    
    // Apply stagger classes and set delay variables
    Object.entries(staggerElements).forEach(([selector, elements]) => {
        elements.forEach((el, index) => {
            el.classList.add('stagger-item');
            el.style.setProperty('--stagger-delay', `${index * 150}ms`);
        });
    });
    
    // Check if elements are in viewport and add visible class
    function checkFadeInElements() {
        // Set this to control when the animation triggers (0.85 means 85% of viewport height)
        const triggerBottom = window.innerHeight * 0.85;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('is-visible');
            }
        });
    }
    
    // Run check immediately for elements already in view
    checkFadeInElements();
    
    // Listen for scroll events with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                checkFadeInElements();
                scrollTimeout = null;
            }, 20); // 20ms throttle
        }
    });
    
    // Also recheck on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                checkFadeInElements();
                resizeTimeout = null;
            }, 100); // 100ms throttle for resize
        }
    });
});