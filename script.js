// Portfolio Data - Add your projects here
const portfolioData = [
    {
        id: 1,
        title: "Commercial Facility Renovation",
        description: "Multi-million dollar renovation project coordinating international design teams",
        category: "Commercial",
        image: "images/project1.jpg" // Replace with actual image path
    },
    {
        id: 2,
        title: "International Design Coordination",
        description: "Managed 20+ architects and engineers across Americas and Europe",
        category: "Management",
        image: "images/project2.jpg" // Replace with actual image path
    },
    {
        id: 3,
        title: "Building Systems Implementation",
        description: "Technical adoption and stakeholder training for new building systems",
        category: "Technical",
        image: "images/project3.jpg" // Replace with actual image path
    },
    {
        id: 4,
        title: "Stakeholder Presentation",
        description: "Board presentations and contractor collaboration for complex projects",
        category: "Communication",
        image: "images/project4.jpg" // Replace with actual image path
    },
    {
        id: 5,
        title: "Process Optimization",
        description: "Structured onboarding and scalable process implementation",
        category: "Operations",
        image: "images/project5.jpg" // Replace with actual image path
    },
    {
        id: 6,
        title: "Cross-Cultural Project Management",
        description: "Bilingual coordination between English and Spanish speaking teams",
        category: "International",
        image: "images/project6.jpg" // Replace with actual image path
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const portfolioGrid = document.querySelector('.portfolio-grid');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio Gallery Functions
function createPortfolioItem(project) {
    return `
        <div class="portfolio-item fade-in">
            <div class="portfolio-image">
                <span>${project.title} - Image Placeholder</span>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-category">${project.category}</div>
            </div>
        </div>
    `;
}

function loadPortfolio() {
    const portfolioPlaceholder = document.querySelector('.portfolio-placeholder');
    if (portfolioPlaceholder) {
        portfolioPlaceholder.remove();
    }

    portfolioData.forEach(project => {
        const portfolioItem = createPortfolioItem(project);
        portfolioGrid.innerHTML += portfolioItem;
    });

    // Add fade-in animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
}

// Contact Form Handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.classList.remove('loading');
        submitButton.classList.add('success');
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.classList.remove('success');
        }, 3000);
    }, 2000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// Image lazy loading (for future implementation)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load portfolio items
    loadPortfolio();
    
    // Initialize animations
    initAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add CSS for portfolio category
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-category {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-top: 10px;
            font-weight: 500;
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // You could add a fallback image here
        // e.target.src = 'images/fallback.jpg';
    }
}, true);

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Handle scroll-based animations or effects
    }, 100);
});

// Export functions for potential module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        portfolioData,
        createPortfolioItem,
        loadPortfolio
    };
}
