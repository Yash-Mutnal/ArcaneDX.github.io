document.addEventListener('DOMContentLoaded', function() {
    // Set the launch date - change this to your actual launch date
    // Format: Year, Month (0-11), Day, Hour, Minute, Second
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // Example: 30 days from now
    
    // Update countdown every second
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the countdown
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
    
    // Format time to always show two digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Handle form submission
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Here you would typically send this to your backend
            // For demo, we'll just show a success message
            button.textContent = 'Subscribed!';
            button.style.background = 'var(--success-color)';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
            
            console.log('Email subscription:', email);
        });
    }
    
    // Add some animation on page load
    const content = document.querySelector('.content');
    if (content) {
        content.classList.add('animated');
    }
    
    // Initialize any interactive elements
    initializeTooltips();
});

function initializeTooltips() {
    // This is a placeholder for any additional interactive elements
    // You could add tooltips, modals, or other interactive features here
    
    // Example: Add hover effect to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}