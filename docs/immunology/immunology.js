/*
 * Immunology Page JavaScript
 * This file contains all the interactive functionality for the immunology page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Services Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // Show the corresponding tab pane
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Resources Tabs
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourceContents = document.querySelectorAll('.resource-content');

    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            resourceTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all resource contents
            resourceContents.forEach(content => content.classList.remove('active'));
            // Show the corresponding resource content
            const resourceId = tab.getAttribute('data-resource');
            document.getElementById(resourceId).classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Contact Form Validation and Animation
    const contactForm = document.getElementById('immunologyContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add shake animation
                    field.classList.add('shake');
                    setTimeout(() => {
                        field.classList.remove('shake');
                    }, 500);
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in a real app, you'd submit the form)
                const formContainer = contactForm.parentElement;
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                `;
                
                // Add CSS for the success message
                const style = document.createElement('style');
                style.textContent = `
                    .success-message {
                        text-align: center;
                        padding: 40px 20px;
                        animation: fadeIn 0.5s ease forwards;
                    }
                    .success-icon {
                        width: 80px;
                        height: 80px;
                        background-color: rgba(6, 214, 160, 0.1);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                    }
                    .success-icon i {
                        font-size: 40px;
                        color: var(--success-color);
                    }
                    .success-message h3 {
                        font-size: 24px;
                        margin-bottom: 10px;
                        color: var(--success-color);
                    }
                    .shake {
                        animation: shake 0.5s ease-in-out;
                    }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                    .error {
                        border-color: #ff3860 !important;
                    }
                `;
                document.head.appendChild(style);
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                if (field.value.trim()) {
                    field.classList.remove('error');
                }
            });
        });
    }

    // Image hover effects
    const teamImage = document.getElementById('team-image');
    if (teamImage) {
        // Array of potential placeholder images for swapping
        const teamImages = [
        '2nd-pic.jpg',  // keep your original image as the first option
        ];
        
        let currentImageIndex = 0;
        
        // Change image on hover
        teamImage.addEventListener('mouseenter', function() {
            currentImageIndex = (currentImageIndex + 1) % teamImages.length;
            teamImage.src = teamImages[currentImageIndex];
        });
    }

    // Add animation when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .client-card, .reason-card, .article-card, .webinar-card, .material-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Add the animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card, .client-card, .reason-card, .article-card, .webinar-card, .material-card, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Run on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

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