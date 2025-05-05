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

    // Sticky Header - Ensure it starts transparent
    const header = document.querySelector('.header');
    
    // Force set initial state
    header.style.backgroundColor = 'transparent';
    
    // Force remove sticky class on page load
    header.classList.remove('sticky');
    
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // Call once on page load to set initial state
    handleScroll();
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
            header.style.backgroundColor = ''; // Let CSS handle it when sticky
        } else {
            header.classList.remove('sticky');
            header.style.backgroundColor = 'transparent'; // Ensure transparency when not sticky
        }
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            // Stop event from propagating
            e.stopPropagation();
            
            // Toggle classes
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-active');
            
            // Toggle visual state of menu icon
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-active');
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

    // Dropdown handling for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        // Add click event for mobile
        if (window.innerWidth <= 768) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent closing menu
                dropdown.classList.toggle('active');
                
                // Expand dropdown menu
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdown.classList.contains('active')) {
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                } else {
                    dropdownMenu.style.maxHeight = '0';
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                dropdownMenu.style.maxHeight = '0';
            }
        });
    });

    // Update dropdown behavior on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                // Remove active class for desktop view
                dropdown.classList.remove('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = '';
                    dropdownMenu.style.opacity = '';
                    dropdownMenu.style.visibility = '';
                }
            });
        }
    });

    // Enhanced Section Fade-In Animation
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
        
        /* Add mobile menu animation */
        .menu-toggle {
            position: relative;
            z-index: 1002;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-list.active {
            display: flex !important;
        }
    `;
    document.head.appendChild(styleEl);
    
    // Select all major sections to animate
    const sections = document.querySelectorAll('section');
    
    // Add fade-in-section class to all sections
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // Add stagger classes to items within sections
    const staggerElements = {
        '.hero-content > *': document.querySelectorAll('.hero-content > *'),
        '.about-content > *': document.querySelectorAll('.about-content > *'),
        '.value-item': document.querySelectorAll('.value-item'),
        '.tab-btn': document.querySelectorAll('.tab-btn'),
        '.client-card': document.querySelectorAll('.client-card'),
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