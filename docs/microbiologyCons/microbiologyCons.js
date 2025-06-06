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
    const body = document.body;

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Create overlay for mobile menu
        if (navList.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-nav-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            overlay.style.zIndex = '99';
            body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                body.removeChild(overlay);
            });
        } else {
            const overlay = document.querySelector('.mobile-nav-overlay');
            if (overlay) {
                body.removeChild(overlay);
            }
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            const overlay = document.querySelector('.mobile-nav-overlay');
            if (overlay) {
                body.removeChild(overlay);
            }
        });
    });

    

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;
    let testimonialInterval;
    
    function showSlide(index) {
        testimonials.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + testimonials.length) % testimonials.length;
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Initialize slider
    showSlide(0);
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Function to reset the interval
    function resetInterval() {
        clearInterval(testimonialInterval);
        startInterval();
    }
    
    // Function to start the interval
    function startInterval() {
        testimonialInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Start the interval initially
    startInterval();

    // Counters Animation
    const counters = document.querySelectorAll('.counter');
    let counterObserver;
    
    // Check if Intersection Observer API is available
    if ('IntersectionObserver' in window) {
        counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // Animation duration in milliseconds
                    let start = 0;
                    const startTime = Date.now();
                    
                    const updateCounter = () => {
                        const currentTime = Date.now();
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Use easeOutQuad easing function for smoother animation
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const currentCount = Math.floor(easeProgress * target);
                        
                        counter.textContent = currentCount;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            counter.textContent = target;
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation and Submission
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = this.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    formElements[i].classList.add('error');
                    isValid = false;
                } else if (formElements[i].type === 'email' && formElements[i].value) {
                    // Basic email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formElements[i].value)) {
                        formElements[i].classList.add('error');
                        isValid = false;
                    } else {
                        formElements[i].classList.remove('error');
                    }
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Thank you for your interest! We will contact you shortly.';
                
                // Insert after the form
                consultationForm.parentNode.insertBefore(successMessage, consultationForm.nextSibling);
                
                // Reset the form
                consultationForm.reset();
                
                // Remove success message after some time
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 300);
                }, 3000);
            }
        });
        
        // Remove error class on input
        const formInputs = consultationForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                // Basic email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailPattern.test(emailInput.value)) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'newsletter-success';
                    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    
                    // Insert after the form
                    this.parentNode.insertBefore(successMessage, this.nextSibling);
                    
                    // Reset the form
                    this.reset();
                    
                    // Remove success message after some time
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            if (successMessage.parentNode) {
                                successMessage.parentNode.removeChild(successMessage);
                            }
                        }, 300);
                    }, 3000);
                } else {
                    emailInput.classList.add('error');
                }
            }
        });
    }

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.section-header, .intro-text, .about-text, .values-container, .client-grid, .article-card, .contact-form');
    
    // Check if Intersection Observer API is available
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(element => {
            // Add initial class for animation
            element.classList.add('fade-in');
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.tab-content-inner');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Back to top button
    /*
    const createBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();*/
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

document.addEventListener('DOMContentLoaded', function() {
    // Services Tabs with enhanced scrolling for all screen sizes
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabsNav = document.querySelector('.tabs-nav');

    if (tabButtons.length && tabPanes.length) {
        // Initialize tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button and corresponding pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                // Scroll the clicked tab into view - works on all screen sizes
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
        });
        
        // Add horizontal scroll with touch/mouse for all screen sizes
        if (tabsNav) {
            // Add visual indicator that tabs are scrollable
            tabsNav.style.cursor = 'grab';
            
            // Mouse wheel scrolling for tabs (horizontal scrolling with mouse wheel)
            tabsNav.addEventListener('wheel', (e) => {
                e.preventDefault();
                tabsNav.scrollLeft += (e.deltaY + e.deltaX) * 0.4; // Adjust scroll speed here
            }, { passive: false });
            
            // Mouse drag scrolling
            let isDown = false;
            let startX;
            let scrollLeft;
            
            tabsNav.addEventListener('mousedown', (e) => {
                isDown = true;
                tabsNav.style.cursor = 'grabbing';
                startX = e.pageX - tabsNav.offsetLeft;
                scrollLeft = tabsNav.scrollLeft;
                e.preventDefault(); // Prevent text selection during drag
            });
            
            tabsNav.addEventListener('mouseleave', () => {
                isDown = false;
                tabsNav.style.cursor = 'grab';
            });
            
            tabsNav.addEventListener('mouseup', () => {
                isDown = false;
                tabsNav.style.cursor = 'grab';
            });
            
            tabsNav.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - tabsNav.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                tabsNav.scrollLeft = scrollLeft - walk;
            });
            
            // Touch events for mobile devices
            tabsNav.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - tabsNav.offsetLeft;
                scrollLeft = tabsNav.scrollLeft;
            }, { passive: true });
            
            tabsNav.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].pageX - tabsNav.offsetLeft;
                const walk = (x - startX) * 2;
                tabsNav.scrollLeft = scrollLeft - walk;
                e.preventDefault();
            }, { passive: false });
            
            tabsNav.addEventListener('touchend', () => {
                startX = null;
            }, { passive: true });
            
            // Add visual indication of scrollability
            // First, check if tabs overflow and scrolling is needed
            function checkOverflow() {
                if (tabsNav.scrollWidth > tabsNav.clientWidth) {
                    // Show subtle animation to indicate scrollability
                    if (!tabsNav.classList.contains('scrolled-once')) {
                        setTimeout(() => {
                            const originalScroll = tabsNav.scrollLeft;
                            tabsNav.scrollLeft = 40;
                            setTimeout(() => {
                                tabsNav.scrollLeft = originalScroll;
                                tabsNav.classList.add('scrolled-once');
                            }, 800);
                        }, 1000);
                    }
                }
            }
            
            // Run on load and resize
            checkOverflow();
            window.addEventListener('resize', checkOverflow);
        }
    }
});