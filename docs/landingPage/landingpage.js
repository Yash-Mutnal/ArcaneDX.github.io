// DOM elements
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const preloader = document.querySelector('.preloader');
const navLinks = document.querySelectorAll('.nav-list a');
const contactForm = document.getElementById('contactForm');
const serviceCards = document.querySelectorAll('.service-card');
const animatedSections = document.querySelectorAll('section');

// When page is fully loaded
window.addEventListener('load', () => {
    // Hide preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
    
    // Initialize sections as hidden
    animatedSections.forEach(section => {
        if (section.id !== 'home') { // Don't hide the hero section
            section.classList.add('fade-section');
        }
    });
    
    // Check which sections are visible on page load
    checkSections();
});

// Sticky header on scroll and check for visible sections
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    // Check for sections to animate
    checkSections();
});

// Function to check if sections are visible and trigger fade-in
function checkSections() {
    animatedSections.forEach(section => {
        if (section.id !== 'home') { // Skip the hero section
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8; // Trigger when 80% of the section is visible
            
            if (sectionTop < triggerPoint) {
                section.classList.add('fade-in');
            }
        }
    });
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Transform the hamburger into X
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (navList.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        
        // Reset hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Form submission (prevent default for demo)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the form data to your server
        // For demo purposes, just log it
        console.log('Form submitted:', { name, email, service, message });
        
        // Show success message (for demo)
        alert('Thank you for your message. We will get back to you soon!');
        
        // Reset form
        contactForm.reset();
    });
}

// Service card hover effects
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon i');
        icon.style.transform = 'scale(1.2)';
    });
});