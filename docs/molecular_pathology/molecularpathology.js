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

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Change hamburger to X when active
        if (this.classList.contains('active')) {
            this.innerHTML = '<span></span><span></span><span></span>';
            this.classList.add('is-active');
        } else {
            this.innerHTML = '<span></span><span></span><span></span>';
            this.classList.remove('is-active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active', 'is-active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Mobile Dropdown Handling
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function(e) {
            // Only handle click on mobile devices
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown && d.classList.contains('active')) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking on a nav link (except dropdown toggles)
    const navLinks = document.querySelectorAll('.nav-list a:not(.dropdown-toggle)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active', 'is-active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - (headerHeight + 20);
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-list a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Services Tab Functionality
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

    // Window resize handler - reset mobile menu when resizing
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active', 'is-active');
            document.body.classList.remove('no-scroll');
            
            // Reset all dropdowns when resizing
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});