/**
 * Performance Testing Script
 * This script measures various performance metrics of the website
 */

// Performance metrics collection
function collectPerformanceMetrics() {
    if (!('performance' in window)) {
        console.log('Performance API not supported');
        return;
    }

    // Core Web Vitals
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    console.log('=== Performance Metrics ===');
    
    // Navigation Timing
    if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        const firstByte = navigation.responseStart - navigation.fetchStart;
        
        console.log(`Load Time: ${loadTime.toFixed(2)}ms`);
        console.log(`DOM Content Loaded: ${domContentLoaded.toFixed(2)}ms`);
        console.log(`Time to First Byte: ${firstByte.toFixed(2)}ms`);
    }
    
    // Paint Timing
    paint.forEach(entry => {
        console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
    });
    
    // Resource Timing
    const resources = performance.getEntriesByType('resource');
    let totalResourceTime = 0;
    let cssCount = 0;
    let jsCount = 0;
    let imageCount = 0;
    
    resources.forEach(resource => {
        totalResourceTime += resource.responseEnd - resource.fetchStart;
        
        if (resource.name.includes('.css')) cssCount++;
        else if (resource.name.includes('.js')) jsCount++;
        else if (resource.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) imageCount++;
    });
    
    console.log(`\nResource Summary:`);
    console.log(`Total Resources: ${resources.length}`);
    console.log(`CSS Files: ${cssCount}`);
    console.log(`JavaScript Files: ${jsCount}`);
    console.log(`Images: ${imageCount}`);
    console.log(`Average Resource Load Time: ${(totalResourceTime / resources.length).toFixed(2)}ms`);
    
    // Memory Usage (if available)
    if ('memory' in performance) {
        const memory = performance.memory;
        console.log(`\nMemory Usage:`);
        console.log(`Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    }
}

// Test mobile menu functionality
function testMobileMenu() {
    console.log('\n=== Mobile Menu Test ===');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        console.log('✓ Mobile menu elements found');
        
        // Test toggle functionality
        menuToggle.click();
        setTimeout(() => {
            const isActive = nav.classList.contains('mobile-active');
            console.log(`✓ Menu toggle test: ${isActive ? 'PASSED' : 'FAILED'}`);
            
            // Close menu
            if (isActive) {
                menuToggle.click();
            }
        }, 100);
    } else {
        console.log('✗ Mobile menu elements not found');
    }
}

// Test lazy loading
function testLazyLoading() {
    console.log('\n=== Lazy Loading Test ===');
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const observerImages = document.querySelectorAll('img[data-src]');
    
    console.log(`Images with loading="lazy": ${lazyImages.length}`);
    console.log(`Images with intersection observer: ${observerImages.length}`);
    
    if (lazyImages.length > 0 || observerImages.length > 0) {
        console.log('✓ Lazy loading implemented');
    } else {
        console.log('⚠ No lazy loading detected');
    }
}

// Test service worker
function testServiceWorker() {
    console.log('\n=== Service Worker Test ===');
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            if (registrations.length > 0) {
                console.log('✓ Service Worker registered');
                registrations.forEach((registration, index) => {
                    console.log(`  SW ${index + 1}: ${registration.scope}`);
                });
            } else {
                console.log('⚠ Service Worker not registered');
            }
        });
    } else {
        console.log('✗ Service Worker not supported');
    }
}

// Test CSS variables
function testModernCSS() {
    console.log('\n=== Modern CSS Test ===');
    
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
    const supportsCSSGrid = CSS.supports('display', 'grid');
    const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
    
    console.log(`CSS Variables: ${primaryColor ? '✓ Working' : '✗ Not found'}`);
    console.log(`CSS Grid: ${supportsCSSGrid ? '✓ Supported' : '✗ Not supported'}`);
    console.log(`Backdrop Filter: ${supportsBackdropFilter ? '✓ Supported' : '✗ Not supported'}`);
}

// Test accessibility
function testAccessibility() {
    console.log('\n=== Accessibility Test ===');
    
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    const altTexts = document.querySelectorAll('img[alt]');
    const ariaLabels = document.querySelectorAll('[aria-label]');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    console.log(`Skip links: ${skipLinks.length}`);
    console.log(`Images with alt text: ${altTexts.length}`);
    console.log(`Elements with aria-labels: ${ariaLabels.length}`);
    console.log(`Heading structure: ${headings.length} headings found`);
    
    // Check heading hierarchy
    let previousLevel = 0;
    let hierarchyValid = true;
    headings.forEach(heading => {
        const currentLevel = parseInt(heading.tagName.substring(1));
        if (currentLevel > previousLevel + 1) {
            hierarchyValid = false;
        }
        previousLevel = currentLevel;
    });
    
    console.log(`Heading hierarchy: ${hierarchyValid ? '✓ Valid' : '⚠ Issues found'}`);
}

// Run all tests
function runAllTests() {
    console.clear();
    console.log('🚀 Website Performance & Enhancement Tests');
    console.log('==========================================');
    
    // Wait for page to fully load
    if (document.readyState === 'complete') {
        runTests();
    } else {
        window.addEventListener('load', runTests);
    }
}

function runTests() {
    collectPerformanceMetrics();
    testMobileMenu();
    testLazyLoading();
    testServiceWorker();
    testModernCSS();
    testAccessibility();
    
    console.log('\n=== Test Complete ===');
    console.log('Check the console for detailed results');
}

// Auto-run tests when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Export for manual testing
window.performanceTest = {
    runAllTests,
    collectPerformanceMetrics,
    testMobileMenu,
    testLazyLoading,
    testServiceWorker,
    testModernCSS,
    testAccessibility
};
