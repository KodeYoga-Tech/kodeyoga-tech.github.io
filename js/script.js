/**
 * KodeYoga - Software Consultancy Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Floating navigation buttons
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                
                // Reset icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    
                    // Reset icon
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Floating navigation buttons functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollToBottomBtn) {
        scrollToBottomBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active link on page load
    updateActiveNavLink();
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset previous error states
            removeErrorState(name);
            removeErrorState(email);
            removeErrorState(message);
            
            // Validate name
            if (!name.value.trim()) {
                addErrorState(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                addErrorState(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                addErrorState(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                addErrorState(message, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                
                // Hide the form
                contactForm.style.display = 'none';
                
                // Create and show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your message!</h3>
                    <p>We've received your inquiry and will get back to you as soon as possible.</p>
                `;
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Reset form for future use (though it's hidden now)
                contactForm.reset();
            }
        });
    }
    
    // Helper functions for form validation
    function addErrorState(element, message) {
        // Add error class to input
        element.classList.add('error');
        
        // Create error message element if it doesn't exist
        let errorMessage = element.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            element.parentNode.appendChild(errorMessage);
        }
        
        // Set error message
        errorMessage.textContent = message;
    }
    
    function removeErrorState(element) {
        // Remove error class from input
        element.classList.remove('error');
        
        // Remove error message if it exists
        const errorMessage = element.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff3860 !important;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 0.25rem;
        }
        
        .form-success {
            text-align: center;
            padding: 2rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .form-success i {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        
        .form-success h3 {
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced animations for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .practice-card, .team-member, .contact-card, .faq-item, .section-header, .hero-content, .service-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                // Add animation classes based on element type
                if (element.classList.contains('service-card')) {
                    element.classList.add('animate-fade-in');
                } else if (element.classList.contains('value-card')) {
                    element.classList.add('animate-scale-in');
                } else if (element.classList.contains('practice-card')) {
                    element.classList.add('animate-slide-right');
                } else if (element.classList.contains('team-member')) {
                    element.classList.add('animate-fade-in');
                } else if (element.classList.contains('contact-card')) {
                    element.classList.add('animate-slide-left');
                } else if (element.classList.contains('faq-item')) {
                    element.classList.add('animate-fade-in');
                } else if (element.classList.contains('section-header')) {
                    element.classList.add('animate-scale-in');
                } else if (element.classList.contains('hero-content')) {
                    element.classList.add('animate-fade-in');
                } else if (element.classList.contains('service-item')) {
                    element.classList.add('animate-slide-left');
                }
                
                // Remove the observer once animation is applied
                element.classList.add('animated');
            }
        });
    };
    
    // Apply staggered animation delays to card elements
    const applyStaggeredDelays = () => {
        const cardGroups = [
            '.services-grid .service-card',
            '.values-grid .value-card',
            '.practices-grid .practice-card',
            '.team-grid .team-member',
            '.contact-grid .contact-card',
            '.faq-grid .faq-item'
        ];
        
        cardGroups.forEach(selector => {
            const cards = document.querySelectorAll(selector);
            cards.forEach((card, index) => {
                const delayClass = `animate-delay-${(index % 5) + 1}`;
                card.classList.add(delayClass);
            });
        });
    };
    
    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('animate-pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('animate-pulse');
        });
    });
    
    // Initialize animations
    applyStaggeredDelays();
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
    
    // Modal Functionality for Core Values and Services
    const valueCards = document.querySelectorAll('.value-card');
    const serviceCards = document.querySelectorAll('.service-card');
    const valueModal = document.getElementById('valueModal');
    const serviceModal = document.getElementById('serviceModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const allModalDetails = document.querySelectorAll('.modal-details');
    
    // Function to open modal with specific content
    function openModal(modal, detailId) {
        // Hide all modal details first
        allModalDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show the specific modal content
        const targetDetail = document.getElementById(detailId);
        if (targetDetail) {
            targetDetail.style.display = 'block';
        }
        
        // Show the modal
        modal.style.display = 'block';
        
        // Prevent scrolling on the body when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Core Values Modal Functionality
    valueCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const valueType = card.getAttribute('data-value');
        
        readMoreBtn.addEventListener('click', () => {
            openModal(valueModal, `modal-${valueType}`);
        });
    });
    
    // Services Modal Functionality
    serviceCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const serviceType = card.getAttribute('data-service');
        
        readMoreBtn.addEventListener('click', () => {
            openModal(serviceModal, `modal-${serviceType}`);
        });
    });
    
    // Close modal when X is clicked
    closeModalButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === valueModal) {
            closeModal(valueModal);
        } else if (event.target === serviceModal) {
            closeModal(serviceModal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (valueModal.style.display === 'block') {
                closeModal(valueModal);
            }
            if (serviceModal.style.display === 'block') {
                closeModal(serviceModal);
            }
        }
    });
});