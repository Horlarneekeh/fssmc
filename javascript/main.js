/**
 * Main javascript file for FSSMC interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Scroll Reveal Animations utilizing Intersection Observer
    // Select all elements that have the .animate-up class
    const animateElements = document.querySelectorAll('.animate-up');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Determine if element is in viewport
                if (entry.isIntersecting) {
                    // Add the 'visible' class which triggers the CSS animation
                    entry.target.classList.add('visible');
                    // Once animated, we don't need to observe it again
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => observer.observe(el));
    }
});
