// Portfolio Data - Add your projects here
const portfolioData = [
    // Commercial Projects
    {
        id: 1,
        title: "Educational Center Lobby",
        description: "Modern educational facilities with contemporary design and sustainable features",
        category: "Commercial",
        image: "images/Commercial1.jpg"
    },
    {
        id: 2,
        title: "Educational Center Lobby",
        description: "Modern educational facilities with contemporary design and sustainable features",
        category: "Commercial",
        image: "images/Commercial2.jpg"
    },
    {
        id: 3,
        title: "Adult Training Classroom",
        description: "Multiple classrroms for international student training, including A/V installations and A/C in Costa Rica",
        category: "Commercial",
        image: "images/Commercial3.jpg"
    },
    {
        id: 4,
        title: "Adult Training Classroom",
        description: "Multiple classrroms for international student training, including A/V installations and A/C in Costa Rica",
        category: "Commercial",
        image: "images/Commercial4.jpg"
    },
    {
        id: 5,
        title: "Lecture Hall - in Progress",
        description: "230+ Lecture Hall, complete remodel. Addison, IL",
        category: "Commercial",
        image: "images/Commercial5.jpeg"
    },
    
    // Residential Projects
    {
        id: 6,
        title: "Modern Missionary Campus Room",
        description: "Contemporary studio apartment with sustainable design and modern amenities",
        category: "Residential",
        image: "images/Residential1.jpg"
    },
    {
        id: 7,
        title: "Modern Missionary Campus Room",
        description: "Contemporary studio apartment with sustainable design and modern amenities",
        category: "Residential",
        image: "images/Residential2.jpg"
    },
    {
        id: 8,
        title: "Home Remodel",
        description: "Complete House Remodel",
        category: "Residential",
        image: "images/Residential3.jpeg"
    },
    {
        id: 9,
        title: "Home Remodel",
        description: "Living Room - Before",
        category: "Residential",
        image: "images/Residential4.jpeg"
    },
    {
        id: 10,
        title: "Home Remodel",
        description: "Living Room - After",
        category: "Residential",
        image: "images/Residential5.jpeg"
    },
    {
        id: 11,
        title: "Home Remodel",
        description: "Kitchen - Before",
        category: "Residential",
        image: "images/Residential6.jpeg"
    },
    {
        id: 12,
        title: "Home Remodel",
        description: "Kitchen - After",
        category: "Residential",
        image: "images/Residential7.jpeg"
    },
    
    // Construction Drawings
    {
        id: 13,
        title: "Electrical Drawings",
        description: "Detailed construction drawings for electrical components and systems",
        category: "Construction Drawings",
        image: "images/Construction1.jpg"
    },
    {
        id: 14,
        title: "Finishes plan",
        description: "Furniture, cabinetry, flooring and paint",
        category: "Construction Drawings",
        image: "images/Construction2.jpg"
    },
    {
        id: 15,
        title: "Site Development Plans",
        description: "Site water, seweage, gas plans",
        category: "Construction Drawings",
        image: "images/Construction3.jpg"
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

// Lightbox State
let lightboxOpen = false;
let lightboxCurrentIndex = 0;

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
    setupCarouselNavigation();
}

function createCarouselSlides() {
    carouselTrack.innerHTML = '';
    
    currentProjects.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="carousel-image">
            <button class="expand-btn" data-index="${index}" aria-label="Expand image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
            </button>
        `;
        carouselTrack.appendChild(slide);
    });

    // Add click event to expand buttons
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.getAttribute('data-index'));
            openLightbox(index);
        });
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

// Lightbox Functions
function openLightbox(index) {
    if (currentProjects.length === 0) return;
    
    lightboxOpen = true;
    lightboxCurrentIndex = index;
    
    // Create lightbox HTML
    const lightboxHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
                <button class="lightbox-prev" aria-label="Previous image">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div class="lightbox-content">
                    <img src="${currentProjects[lightboxCurrentIndex].image}" alt="${currentProjects[lightboxCurrentIndex].title}" class="lightbox-image">
                    <div class="lightbox-info">
                        <h3 class="lightbox-title">${currentProjects[lightboxCurrentIndex].title}</h3>
                        <p class="lightbox-description">${currentProjects[lightboxCurrentIndex].description}</p>
                        <div class="lightbox-category">${currentProjects[lightboxCurrentIndex].category}</div>
                    </div>
                </div>
                <button class="lightbox-next" aria-label="Next image">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners to lightbox
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', lightboxPrevSlide);
    lightboxNext.addEventListener('click', lightboxNextSlide);
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', handleLightboxKeyboard);
}

function closeLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    if (lightboxOverlay) {
        lightboxOverlay.remove();
    }
    document.body.style.overflow = '';
    lightboxOpen = false;
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

function lightboxNextSlide() {
    lightboxCurrentIndex = (lightboxCurrentIndex + 1) % currentProjects.length;
    updateLightboxContent();
}

function lightboxPrevSlide() {
    lightboxCurrentIndex = (lightboxCurrentIndex - 1 + currentProjects.length) % currentProjects.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxCategory = document.querySelector('.lightbox-category');
    
    if (lightboxImage && currentProjects[lightboxCurrentIndex]) {
        lightboxImage.src = currentProjects[lightboxCurrentIndex].image;
        lightboxImage.alt = currentProjects[lightboxCurrentIndex].title;
        lightboxTitle.textContent = currentProjects[lightboxCurrentIndex].title;
        lightboxDescription.textContent = currentProjects[lightboxCurrentIndex].description;
        lightboxCategory.textContent = currentProjects[lightboxCurrentIndex].category;
    }
}

function handleLightboxKeyboard(e) {
    if (!lightboxOpen) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            lightboxPrevSlide();
            break;
        case 'ArrowRight':
            lightboxNextSlide();
            break;
    }
}

// Carousel Navigation
function setupCarouselNavigation() {
    // Remove existing event listeners to prevent duplicates
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Update references to the new buttons
    const updatedPrevBtn = document.querySelector('.carousel-prev');
    const updatedNextBtn = document.querySelector('.carousel-next');
    
    // Add fresh event listeners
    updatedPrevBtn.addEventListener('click', prevSlide);
    updatedNextBtn.addEventListener('click', nextSlide);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (currentProjects.length === 0 || lightboxOpen) return;
    
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
    
    // Add CSS for carousel and lightbox
    const style = document.createElement('style');
    style.textContent = `
        .carousel-slide {
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
