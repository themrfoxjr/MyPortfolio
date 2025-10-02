// Portfolio Data - Add your projects here
const portfolioData = [
    // Commercial Projects
    {
        id: 1,
        title: "Commercial Office Building",
        description: "Modern commercial office facility with contemporary design and sustainable features",
        category: "Commercial",
        image: "images/Commercial1.png"
    },
    {
        id: 2,
        title: "Retail Complex Design",
        description: "Large-scale retail center with integrated commercial spaces and parking facilities",
        category: "Commercial",
        image: "images/Commercial2.png"
    },
    {
        id: 3,
        title: "Mixed-Use Development Project",
        description: "Urban mixed-use development combining commercial, retail, and office spaces",
        category: "Commercial",
        image: "images/Commercial3.png"
    },
    {
        id: 4,
        title: "Commercial Facility Expansion",
        description: "Expansion and renovation of existing commercial facility with modern amenities",
        category: "Commercial",
        image: "images/Commercial4.png"
    },
    {
        id: 5,
        title: "Corporate Headquarters",
        description: "State-of-the-art corporate headquarters with integrated green spaces",
        category: "Commercial",
        image: "images/Commercial5.jpeg"
    },
    
    // Residential Projects
    {
        id: 6,
        title: "Modern Single-Family Residence",
        description: "Contemporary single-family home with sustainable design and modern amenities",
        category: "Residential",
        image: "images/Residential1.png"
    },
    {
        id: 7,
        title: "Luxury Residential Development",
        description: "High-end residential complex with premium finishes and community amenities",
        category: "Residential",
        image: "images/Residential2.png"
    },
    {
        id: 8,
        title: "Custom Home Design",
        description: "Bespoke residential design tailored to client specifications and site conditions",
        category: "Residential",
        image: "images/Residential3.jpeg"
    },
    {
        id: 9,
        title: "Residential Community Planning",
        description: "Master planning for residential community with integrated green spaces",
        category: "Residential",
        image: "images/Residential4.jpeg"
    },
    {
        id: 10,
        title: "Modern Townhouse Development",
        description: "Contemporary townhouse development with efficient space planning",
        category: "Residential",
        image: "images/Residential5.jpeg"
    },
    {
        id: 11,
        title: "Luxury Villa Design",
        description: "High-end villa design with premium materials and architectural details",
        category: "Residential",
        image: "images/Residential6.jpeg"
    },
    {
        id: 12,
        title: "Sustainable Residential Project",
        description: "Eco-friendly residential design incorporating sustainable building practices",
        category: "Residential",
        image: "images/Residential7.jpeg"
    },
    
    // Construction Drawings
    {
        id: 13,
        title: "Structural Detailing",
        description: "Detailed construction drawings for structural components and systems",
        category: "Construction Drawings",
        image: "images/construction1.jpg"
    },
    {
        id: 14,
        title: "MEP Coordination",
        description: "Mechanical, electrical, and plumbing system integration drawings",
        category: "Construction Drawings",
        image: "images/construction2.jpg"
    },
    {
        id: 15,
        title: "Site Development Plans",
        description: "Comprehensive site development and grading drawings",
        category: "Construction Drawings",
        image: "images/construction3.jpg"
    },
    
    // Presentations
    {
        id: 16,
        title: "Client Presentation Renderings",
        description: "High-quality 3D renderings for client presentations and approvals",
        category: "Presentations",
        image: "images/presentation1.jpg"
    },
    {
        id: 17,
        title: "Stakeholder Review Materials",
        description: "Presentation materials for board and stakeholder reviews",
        category: "Presentations",
        image: "images/presentation2.jpg"
    },
    {
        id: 18,
        title: "Design Development Package",
        description: "Comprehensive design development presentation package",
        category: "Presentations",
        image: "images/presentation3.jpg"
    },
    
    // Concepts
    {
        id: 19,
        title: "Urban Planning Concept",
        description: "Master planning concept for urban redevelopment and revitalization",
        category: "Concepts",
        image: "images/concept1.jpg"
    },
    {
        id: 20,
        title: "Sustainable Design Study",
        description: "Conceptual study for sustainable building practices and environmental integration",
        category: "Concepts",
        image: "images/concept2.jpg"
    },
    {
        id: 21,
        title: "Innovative Space Planning",
        description: "Creative space planning concepts for optimal functionality and user experience",
        category: "Concepts",
        image: "images/concept3.jpg"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const portfolioFilters = document.querySelector('.portfolio-filters');
const carouselTrack = document.querySelector('.carousel-track');
const carouselDots = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const projectTitle = document.querySelector('.project-title');
const projectDescription = document.querySelector('.project-description');
const projectCategory = document.querySelector('.project-category');

// Carousel State
let currentCategory = null;
let currentSlideIndex = 0;
let currentProjects = [];

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

// Portfolio Carousel Functions
function createFilterButtons() {
    const categories = [...new Set(portfolioData.map(project => project.category))];
    
    portfolioFilters.innerHTML = `
        ${categories.map(category => 
            `<button class="filter-btn" data-category="${category.toLowerCase().replace(' ', '-')}">${category}</button>`
        ).join('')}
    `;
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            loadCategory(category);
        });
    });
}

function loadCategory(category) {
    currentCategory = category;
    currentSlideIndex = 0;
    currentProjects = portfolioData.filter(project => 
        project.category.toLowerCase().replace(' ', '-') === category
    );
    
    createCarouselSlides();
    createCarouselDots();
    updateProjectInfo();
    showCarousel();
}

function createCarouselSlides() {
    carouselTrack.innerHTML = '';
    
    currentProjects.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="carousel-image">
        `;
        carouselTrack.appendChild(slide);
    });
}

function createCarouselDots() {
    carouselDots.innerHTML = '';
    
    currentProjects.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
}

function updateProjectInfo() {
    if (currentProjects.length > 0) {
        const currentProject = currentProjects[currentSlideIndex];
        projectTitle.textContent = currentProject.title;
        projectDescription.textContent = currentProject.description;
        projectCategory.textContent = currentProject.category;
    }
}

function showCarousel() {
    // Remove placeholder if it exists
    const placeholder = document.querySelector('.carousel-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

function goToSlide(index) {
    if (index < 0 || index >= currentProjects.length) return;
    
    // Update slides
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    // Update current index and project info
    currentSlideIndex = index;
    updateProjectInfo();
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % currentProjects.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + currentProjects.length) % currentProjects.length;
    goToSlide(prevIndex);
}

// Carousel Navigation
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (currentProjects.length === 0) return;
    
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create filter buttons
    createFilterButtons();
    
    // Initialize animations
    initAnimations();
    
    // Add CSS for carousel
    const style = document.createElement('style');
    style.textContent = `
        .carousel-slide {
            transition: opacity 0.5s ease;
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
