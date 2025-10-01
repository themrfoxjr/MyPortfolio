// Portfolio Data - Add your projects here
const portfolioData = [
    // Commercial Projects
    {
        id: 1,
        title: "Commercial Office Renovation",
        description: "Multi-million dollar office facility renovation with modern amenities",
        category: "Commercial",
        image: "images/commercial1.jpg"
    },
    {
        id: 2,
        title: "Retail Center Design",
        description: "Large-scale retail center with integrated parking and landscaping",
        category: "Commercial",
        image: "images/commercial2.jpg"
    },
    {
        id: 3,
        title: "Mixed-Use Development",
        description: "Urban mixed-use project combining retail, office, and residential spaces",
        category: "Commercial",
        image: "images/commercial3.jpg"
    },
    
    // Residential Projects
    {
        id: 4,
        title: "Modern Family Residence",
        description: "Contemporary single-family home with sustainable design features",
        category: "Residential",
        image: "images/residential1.jpg"
    },
    {
        id: 5,
        title: "Luxury Apartment Complex",
        description: "High-end residential development with premium amenities",
        category: "Residential",
        image: "images/residential2.jpg"
    },
    {
        id: 6,
        title: "Custom Home Design",
        description: "Bespoke residential design tailored to client specifications",
        category: "Residential",
        image: "images/residential3.jpg"
    },
    
    // Construction Drawings
    {
        id: 7,
        title: "Structural Detailing",
        description: "Detailed construction drawings for structural components",
        category: "Construction Drawings",
        image: "images/construction1.jpg"
    },
    {
        id: 8,
        title: "MEP Coordination",
        description: "Mechanical, electrical, and plumbing system integration drawings",
        category: "Construction Drawings",
        image: "images/construction2.jpg"
    },
    {
        id: 9,
        title: "Site Development Plans",
        description: "Comprehensive site development and grading drawings",
        category: "Construction Drawings",
        image: "images/construction3.jpg"
    },
    
    // Presentations
    {
        id: 10,
        title: "Client Presentation Renderings",
        description: "High-quality 3D renderings for client presentations",
        category: "Presentations",
        image: "images/presentation1.jpg"
    },
    {
        id: 11,
        title: "Stakeholder Review Materials",
        description: "Presentation materials for board and stakeholder reviews",
        category: "Presentations",
        image: "images/presentation2.jpg"
    },
    {
        id: 12,
        title: "Design Development Package",
        description: "Comprehensive design development presentation package",
        category: "Presentations",
        image: "images/presentation3.jpg"
    },
    
    // Concepts
    {
        id: 13,
        title: "Urban Planning Concept",
        description: "Master planning concept for urban redevelopment",
        category: "Concepts",
        image: "images/concept1.jpg"
    },
    {
        id: 14,
        title: "Sustainable Design Study",
        description: "Conceptual study for sustainable building practices",
        category: "Concepts",
        image: "images/concept2.jpg"
    },
    {
        id: 15,
        title: "Innovative Space Planning",
        description: "Creative space planning concepts for optimal functionality",
        category: "Concepts",
        image: "images/concept3.jpg"
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
        <div class="portfolio-item fade-in" data-category="${project.category.toLowerCase().replace(' ', '-')}">
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

function createFilterButtons() {
    const categories = [...new Set(portfolioData.map(project => project.category))];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    // Add "All" button
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        ${categories.map(category => 
            `<button class="filter-btn" data-filter="${category.toLowerCase().replace(' ', '-')}">${category}</button>`
        ).join('')}
    `;
    
    const portfolioSection = document.querySelector('.portfolio .container');
    const portfolioTitle = document.querySelector('.portfolio .section-title');
    portfolioSection.insertBefore(filterContainer, portfolioTitle.nextSibling);
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });
}

function filterPortfolio(filter) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('visible');
            }, 100);
        } else {
            item.classList.remove('visible');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
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

    // Create filter buttons
    createFilterButtons();

    // Add fade-in animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
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
