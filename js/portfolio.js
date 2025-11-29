document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Add animation class
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation on page load
    window.addEventListener('load', () => {
        animateOnScroll();
    });

    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add click event to portfolio items for modal (if needed)
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // You can add modal functionality here if needed
            // For example: openVideoModal(this);
        });
    });
});
