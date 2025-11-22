document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Add active class to current section in navigation
    function setActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Sticky header on scroll with debounce
    let isScrolling;
    window.addEventListener('scroll', function() {
        // Clear the timeout if it's already set
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            // Add/remove scrolled class based on scroll position
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active navigation
            setActiveNav();
        }, 50);
    }, false);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Initialize active nav on page load
    setActiveNav();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Sample portfolio data with online image URLs and video embeds
    const portfolioData = [
        {
            id: 1,
            title: 'Short Form Video',
            category: 'short',
            image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Engaging short-form content for social media.',
            videos: [
                { 
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg'
                },
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg'
                },
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg'
                }
            ]
        },
        {
            id: 2,
            title: 'Documentary',
            category: 'long',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            description: 'In-depth documentary storytelling that captivates and educates.',
            videos: [
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg'
                },
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg'
                }
            ]
        },
        {
            id: 3,
            title: 'Gaming Content',
            category: 'gaming',
            image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
            description: 'Exciting gaming content and walkthroughs.',
            videos: [
                {
                    title: 'Epic Gameplay',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
                    duration: '0:20'
                },
                {
                    title: 'Speed Run',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
                    duration: '0:18'
                },
                {
                    title: 'Fun Moments',
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
                    duration: '0:25'
                }
            ]
        },
        {
            id: 6,
            title: 'Gameplay',
            category: 'gaming',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Immersive gameplay footage.',
            videos: [
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg'
                },
                {
                    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                    type: 'video/mp4',
                    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg'
                }
            ]
        }
    ];

   // Function to create video modal
function createVideoModal(videos, title) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    
    // Create loading element
    const loadingElement = document.createElement('div');
    loadingElement.className = 'video-loading';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close video');
    closeBtn.setAttribute('title', 'Close (Esc)');
    
    // Create title
    const titleElement = document.createElement('h2');
    titleElement.className = 'video-title';
    titleElement.textContent = title;
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    
    // Add video element
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.preload = 'metadata';
    videoElement.className = 'portfolio-video';
    videoElement.setAttribute('playsinline', '');
    
    // Add source element
    const sourceElement = document.createElement('source');
    sourceElement.src = videos[0].url;
    sourceElement.type = videos[0].type || 'video/mp4';
    
    // Add loading state
    const showLoading = () => {
        loadingElement.style.display = 'flex';
    };
    
    const hideLoading = () => {
        loadingElement.style.display = 'none';
    };
    
    // Video loading events
    videoElement.addEventListener('waiting', showLoading);
    videoElement.addEventListener('playing', hideLoading);
    videoElement.addEventListener('canplay', hideLoading);
    videoElement.addEventListener('error', () => {
        hideLoading();
        console.error('Error loading video');
    });
    
    videoElement.appendChild(sourceElement);
    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(loadingElement);
    
    // Create video thumbnails
    const thumbnails = document.createElement('div');
    thumbnails.className = 'video-thumbnails';
    
    // Function to switch video
    const switchVideo = (video, index) => {
        // Update active thumbnail
        document.querySelectorAll('.video-thumb').forEach(t => t.classList.remove('active'));
        
        // Show loading state
        showLoading();
        
        // Update video source
        const currentTime = videoElement.currentTime;
        const wasPaused = videoElement.paused;
        
        sourceElement.src = video.url;
        sourceElement.type = video.type || 'video/mp4';
        videoElement.load();
        
        videoElement.oncanplay = () => {
            videoElement.currentTime = 0;
            if (!wasPaused) videoElement.play();
            videoElement.oncanplay = null;
        };
        
        // Update active state after a small delay to ensure smooth transition
        setTimeout(() => {
            const thumbs = document.querySelectorAll('.video-thumb');
            if (thumbs[index]) {
                thumbs[index].classList.add('active');
            }
        }, 50);
    };
    
    // Create thumbnails
    videos.forEach((video, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'video-thumb' + (index === 0 ? ' active' : '');
        thumb.style.backgroundImage = `url('${video.thumbnail || 'https://via.placeholder.com/300x169?text=Video+Thumbnail'}')`;
        thumb.innerHTML = `<span>${video.title || `Video ${index + 1}`}</span>`;
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('aria-label', `Play video ${index + 1}`);
        thumb.setAttribute('tabindex', '0');
        
        // Click handler
        const clickHandler = () => switchVideo(video, index);
        
        // Add click and keyboard events
        thumb.addEventListener('click', clickHandler);
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clickHandler();
            }
        });
        
        thumbnails.appendChild(thumb);
    });
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(titleElement);
    modalContent.appendChild(videoContainer);
    modalContent.appendChild(thumbnails);
    modal.appendChild(modalContent);
    
    // Close modal function
    const closeModal = () => {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
    };
    
    // Close button handler
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    
    // Add to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Auto-play the first video
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Auto-play prevented:', error);
            // Show play button overlay if autoplay is prevented
            const playOverlay = document.createElement('div');
            playOverlay.className = 'play-overlay';
            playOverlay.innerHTML = '<i class="fas fa-play"></i>';
            playOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 2;
            `;
            playOverlay.querySelector('i').style.cssText = `
                font-size: 60px;
                color: white;
                opacity: 0.8;
                transition: all 0.3s ease;
            `;
            playOverlay.addEventListener('click', () => {
                videoElement.play();
                playOverlay.remove();
            });
            videoContainer.appendChild(playOverlay);
        });
    }
    
    // Handle video end to auto-play next video if available
    videoElement.addEventListener('ended', () => {
        const currentIndex = Array.from(thumbnails.children).findIndex(thumb => 
            thumb.classList.contains('active')
        );
        const nextIndex = (currentIndex + 1) % thumbnails.children.length;
        if (nextIndex !== currentIndex) {
            thumbnails.children[nextIndex].click();
        }
    });
    
    return modal;
}

// Function to create portfolio items
function createPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Clear existing items
    portfolioGrid.innerHTML = '';
    
    portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.category = item.category;
        
        portfolioItem.innerHTML = `
            <div class="portfolio-img">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="#" class="portfolio-link" data-videos='${JSON.stringify(item.videos)}' data-title="${item.title}">View Project</a>
                    </div>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Add click event to portfolio links
    document.querySelectorAll('.portfolio-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();z
            const videos = JSON.parse(link.dataset.videos);
            const title = link.dataset.title;
            createVideoModal(videos, title);
        });
    });
}

    // Function to create portfolio items
    function createPortfolioItems() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        portfolioGrid.innerHTML = ''; // Clear existing items

        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
            
            // Add click event to show videos
            portfolioItem.addEventListener('click', () => {
                const modal = createVideoModal(item.videos, item.title);
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Initialize portfolio items
    createPortfolioItems();

    // Filter portfolio items
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .info-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.service-card, .portfolio-item, .info-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
