// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab functionality
    initTabs();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize blog slider for mobile
    initResponsiveSliders();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Remove preloader when page is loaded
    setTimeout(function() {
      document.querySelector('.preloader').style.opacity = '0';
      setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
      }, 500);
    }, 800);
  });
  
  // Window load event to ensure all assets are loaded
  window.addEventListener('load', function() {
    // Refresh any layout issues
    updateLayoutOnResize();
  });
  
  // Window resize event handler
  window.addEventListener('resize', function() {
    updateLayoutOnResize();
  });
  
  // Function to handle tab functionality
  function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Get the corresponding tab pane
        const tabId = this.getAttribute('data-tab');
        const tabPane = document.getElementById(tabId);
        
        // Add active class to the corresponding pane
        tabPane.classList.add('active');
      });
    });
  }
  
  // Function to handle testimonial slider
  function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Create dots based on number of slides
    testimonialSlides.forEach((slide, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('data-index', index);
      dotsContainer.appendChild(dot);
      
      // Add click event to dots
      dot.addEventListener('click', function() {
        const slideIndex = this.getAttribute('data-index');
        showSlide(slideIndex);
      });
    });
    
  
    function showSlide(index) {
   
      testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
      
      document.querySelectorAll('.dot').forEach((dot, i) => {
        if (i == index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    let currentSlide = 0;
    const maxSlides = testimonialSlides.length;
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % maxSlides;
      showSlide(currentSlide);
    }
  
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
  }
  
  // Function to handle mobile sliders
  function initResponsiveSliders() {
    // For mobile devices, make blog cards scrollable
    if (window.innerWidth < 768) {
      const blogSlider = document.querySelector('.blog-slider');
      if (blogSlider) {
        blogSlider.style.display = 'flex';
        blogSlider.style.overflowX = 'auto';
        
        // Make each blog card a fixed width
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
          card.style.flex = '0 0 280px';
          card.style.marginRight = '20px';
        });
      }
    }
  }
  
  // Function to handle contact form submission
  function initContactForm() {
    const contactForm = document.getElementById('chemtoxContactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
          alert('Please fill in all required fields.');
          return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerText = 'Sending...';
        
        // Simulate API call
        setTimeout(function() {
          // Reset form
          contactForm.reset();
          
          // Show success message
          alert('Thank you for your message! We will contact you shortly.');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.innerText = 'Schedule a Consultation';
        }, 1500);
      });
    }
  }
  
  // Function to initialize animations on scroll
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .intro-content, .service-tabs, .about-content, .client-grid, .why-us-grid, .blog-slider, .webinar-section, .testimonial-slider, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    animatedElements.forEach(element => {
      // Add initial style
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      // Observe element
      observer.observe(element);
    });
    
    // When element becomes visible
    document.addEventListener('scroll', function() {
      document.querySelectorAll('.animated').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }, { passive: true });
  }
  
  // Function to update layout on window resize
  function updateLayoutOnResize() {
    // Reset blog slider on window resize
    if (window.innerWidth >= 768) {
      const blogSlider = document.querySelector('.blog-slider');
      if (blogSlider) {
        blogSlider.style.display = 'grid';
        blogSlider.style.overflowX = 'visible';
        
        // Reset blog card styles
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
          card.style.flex = 'unset';
          card.style.marginRight = '0';
        });
      }
    } else {
      initResponsiveSliders();
    }
  }
  
  // Function to smoothly scroll to sections when navigation links are clicked
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.querySelector('.main-nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.querySelector('.menu-toggle').classList.remove('active');
        }
      }
    });
  });
  
  // Handle mobile menu toggle
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.main-nav').classList.toggle('active');
  });
  
  // Add floating effect to buttons and cards
  function addFloatingEffect() {
    const elements = document.querySelectorAll('.btn, .client-card, .blog-card, .why-us-card');
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }

  
  
  // Call floating effect
  addFloatingEffect();
  
  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.chem-hero');
    if (heroSection) {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
  });
  
  // Counter animation for Why Choose Us section numbers
  function animateCounters() {
    const counterCards = document.querySelectorAll('.why-us-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const number = card.getAttribute('data-count');
          
          // Add pulsating effect to the number
          card.style.setProperty('--number-pulse', 'pulse 2s infinite');
          
          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.5
    });
    
    counterCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Call counter animation
  animateCounters();
  
  // Handle service category selection in contact form
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
      // Could add custom behavior based on service selection
      // For example, show different form fields based on selection
      const selectedService = this.value;
      console.log('Selected service:', selectedService);
    });
  }

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