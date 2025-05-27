/**
 * Performance Enhancement Script
 * This script adds modern features and optimizations to improve website speed and user experience
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Lazy loading for images
    initLazyLoading();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Search optimization
    initSearchOptimization();
    
    // Mobile menu enhancement
    initMobileMenu();
    
    // Performance monitoring
    initPerformanceMonitoring();
    
});

/**
 * Header scroll effect - changes header appearance on scroll
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Enhanced lazy loading with Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.category-card, .book-card, .feature-card, .stage-card, .exam-card, .stat-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.setProperty('--animation-delay', `${index * 0.1}s`);
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });
}

/**
 * Search optimization with debouncing
 */
function initSearchOptimization() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchTimeout);
                func(...args);
            };
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(later, wait);
        };
    }
    
    const performSearch = debounce(function(query) {
        if (query.length < 2) return;
        
        // Add your search logic here
        console.log('Searching for:', query);
        // You can implement real-time search suggestions here
    }, 300);
    
    searchInput.addEventListener('input', function() {
        performSearch(this.value.trim());
    });
    
    // Search suggestions (placeholder for future implementation)
    const searchSuggestions = document.createElement('div');
    searchSuggestions.className = 'search-suggestions';
    searchInput.parentElement.appendChild(searchSuggestions);
}

/**
 * Enhanced mobile menu
 */
function initMobileMenu() {
    // Create mobile menu toggle if it doesn't exist
    let menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const nav = document.querySelector('nav');
        if (nav) {
            nav.parentElement.insertBefore(menuToggle, nav);
        }
    }
    
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav?.classList.toggle('mobile-active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav?.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav?.classList.remove('mobile-active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            nav?.classList.remove('mobile-active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        return; // If web-vitals library is loaded elsewhere
    }
    
    // Basic performance monitoring
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            if (perfData) {
                const metrics = {
                    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
                    tcp: perfData.connectEnd - perfData.connectStart,
                    ttfb: perfData.responseStart - perfData.requestStart,
                    download: perfData.responseEnd - perfData.responseStart,
                    dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    total: perfData.loadEventEnd - perfData.navigationStart
                };
                
                console.log('Performance Metrics:', metrics);
                
                // Send to analytics if needed
                // analytics.track('page_performance', metrics);
            }
        }, 1000);
    });
}

/**
 * Utility function to add CSS dynamically
 */
function addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Add CSS for animations
addCSS(`
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
        transition-delay: var(--animation-delay, 0s);
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 0 0 12px 12px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        display: none;
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: flex !important;
        }
        
        nav.mobile-active ul {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }
        
        nav:not(.mobile-active) ul {
            display: none;
        }
    }
    
    /* Image loading effect */
    img {
        transition: opacity 0.3s ease;
    }
    
    img:not(.loaded) {
        opacity: 0.7;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Header transition */
    header {
        transition: transform 0.3s ease, background-color 0.3s ease, padding 0.3s ease;
    }
`);

// Export functions for external use
window.PerformanceEnhancements = {
    initHeaderScrollEffect,
    initLazyLoading,
    initSmoothScrolling,
    initScrollAnimations,
    initSearchOptimization,
    initMobileMenu,
    initPerformanceMonitoring
};
