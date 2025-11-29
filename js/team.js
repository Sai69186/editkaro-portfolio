document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    const dots = document.querySelectorAll('.team-dot');
    const prevBtn = document.getElementById('prevTeam');
    const nextBtn = document.getElementById('nextTeam');
    let currentIndex = 0;
    let autoRotate = true;
    let rotateInterval;
    const ROTATE_INTERVAL = 3000; // 3 seconds

    // Function to show a specific team member
    function showTeamMember(index) {
        // Hide all team members
        teamMembers.forEach(member => {
            member.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected team member and update dot
        teamMembers[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Function to show next team member
    function showNext() {
        const nextIndex = (currentIndex + 1) % teamMembers.length;
        showTeamMember(nextIndex);
    }
    
    // Function to show previous team member
    function showPrev() {
        const prevIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length;
        showTeamMember(prevIndex);
    }
    
    // Auto-rotate team members
    function startAutoRotate() {
        rotateInterval = setInterval(showNext, ROTATE_INTERVAL);
    }
    
    // Pause auto-rotation when user interacts with controls
    function pauseAutoRotate() {
        autoRotate = false;
        clearInterval(rotateInterval);
        
        // Resume auto-rotation after 10 seconds of inactivity
        setTimeout(() => {
            autoRotate = true;
            startAutoRotate();
        }, 10000);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        showNext();
        pauseAutoRotate();
    });
    
    prevBtn.addEventListener('click', () => {
        showPrev();
        pauseAutoRotate();
    });
    
    // Event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTeamMember(index);
            pauseAutoRotate();
        });
    });
    
    // Pause auto-rotation when hovering over team member
    const teamContainer = document.querySelector('.team-container');
    if (teamContainer) {
        teamContainer.addEventListener('mouseenter', () => {
            if (autoRotate) {
                clearInterval(rotateInterval);
            }
        });
        
        teamContainer.addEventListener('mouseleave', () => {
            if (autoRotate) {
                startAutoRotate();
            }
        });
    }
    
    // Initialize the first team member and start auto-rotation
    if (teamMembers.length > 0) {
        showTeamMember(0);
        startAutoRotate();
    }
});
