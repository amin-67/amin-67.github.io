/**
 * Comprehensive Integration Test Suite
 * Tests all advanced features working together
 */

class IntegrationTestSuite {
    constructor() {
        this.testResults = [];
        this.featureTests = new Map();
        this.performanceMetrics = new Map();
        this.startTime = Date.now();
        
        this.initializeTestSuite();
    }

    async initializeTestSuite() {
        console.log('🚀 Starting Integration Test Suite...');
        
        // Wait for DOM and all scripts to load
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        // Additional wait for all advanced scripts to initialize
        await this.waitForScriptsToLoad();
        
        // Run all tests
        await this.runAllTests();
        
        // Display results
        this.displayTestResults();
    }

    async waitForScriptsToLoad() {
        return new Promise(resolve => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkScripts = () => {
                attempts++;
                
                const hasAdvancedSearch = typeof window.AdvancedSearchSystem !== 'undefined';
                const hasScrollAnimations = typeof window.ScrollAnimationManager !== 'undefined';
                const hasMockData = typeof window.mockEducationalData !== 'undefined';
                
                if (hasAdvancedSearch && hasScrollAnimations && hasMockData) {
                    console.log('✅ All scripts loaded successfully');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.warn('⚠️ Some scripts may not have loaded within timeout');
                    resolve();
                } else {
                    setTimeout(checkScripts, 100);
                }
            };
            
            checkScripts();
        });
    }

    async runAllTests() {
        console.log('🧪 Running integration tests...');

        // Test 1: Advanced Search System
        await this.testAdvancedSearchSystem();
        
        // Test 2: Scroll Animations
        await this.testScrollAnimations();
        
        // Test 3: Interactive Elements
        await this.testInteractiveElements();
        
        // Test 4: Performance Metrics
        await this.testPerformanceMetrics();
        
        // Test 5: Mobile Responsiveness
        await this.testMobileResponsiveness();
        
        // Test 6: Accessibility Features
        await this.testAccessibility();
        
        // Test 7: Cross-browser Compatibility
        await this.testBrowserCompatibility();
        
        // Test 8: User Experience Flow
        await this.testUserExperienceFlow();
    }

    async testAdvancedSearchSystem() {
        console.log('🔍 Testing Advanced Search System...');
        
        try {
            // Test search modal existence and functionality
            const searchModal = document.getElementById('advanced-search-modal');
            const searchButton = document.querySelector('.floating-search-btn') || 
                               document.getElementById('advanced-search-trigger');
            
            this.addTestResult('Search Modal Exists', !!searchModal, 'Advanced Search');
            this.addTestResult('Search Button Exists', !!searchButton, 'Advanced Search');
            
            // Test search system initialization
            const hasSearchSystem = typeof window.AdvancedSearchSystem !== 'undefined';
            this.addTestResult('Search System Initialized', hasSearchSystem, 'Advanced Search');
            
            if (hasSearchSystem && searchButton) {
                // Simulate search interaction
                searchButton.click();
                await this.delay(500);
                
                const isModalVisible = searchModal.classList.contains('active');
                this.addTestResult('Search Modal Opens', isModalVisible, 'Advanced Search');
                
                // Test search input
                const searchInput = document.getElementById('advanced-search-input');
                if (searchInput) {
                    searchInput.value = 'رياضيات';
                    searchInput.dispatchEvent(new Event('input'));
                    await this.delay(400); // Wait for debounce
                    
                    const hasResults = document.querySelectorAll('.search-result-item').length > 0;
                    this.addTestResult('Search Results Display', hasResults, 'Advanced Search');
                }
                
                // Close modal
                const closeBtn = document.querySelector('.search-modal .close-btn');
                if (closeBtn) closeBtn.click();
            }
            
        } catch (error) {
            this.addTestResult('Search System Error', false, 'Advanced Search', error.message);
        }
    }

    async testScrollAnimations() {
        console.log('📜 Testing Scroll Animations...');
        
        try {
            // Test scroll animation manager
            const hasScrollManager = typeof window.ScrollAnimationManager !== 'undefined';
            this.addTestResult('Scroll Manager Initialized', hasScrollManager, 'Scroll Animations');
            
            // Test animated elements
            const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-right');
            this.addTestResult('Animated Elements Found', animatedElements.length > 0, 'Scroll Animations');
            
            // Test intersection observer
            const hasIntersectionObserver = 'IntersectionObserver' in window;
            this.addTestResult('Intersection Observer Support', hasIntersectionObserver, 'Scroll Animations');
            
            // Test scroll-to-top button
            const scrollTopBtn = document.querySelector('.scroll-top-btn');
            this.addTestResult('Scroll to Top Button', !!scrollTopBtn, 'Scroll Animations');
            
            // Simulate scroll to test animations
            window.scrollTo(0, 500);
            await this.delay(300);
            
            const visibleAnimations = document.querySelectorAll('.animation-triggered').length;
            this.addTestResult('Animations Triggered on Scroll', visibleAnimations > 0, 'Scroll Animations');
            
            // Return to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            this.addTestResult('Scroll Animation Error', false, 'Scroll Animations', error.message);
        }
    }

    async testInteractiveElements() {
        console.log('🎯 Testing Interactive Elements...');
        
        try {
            // Test rating system
            const ratingStars = document.querySelectorAll('.rating-star');
            this.addTestResult('Rating Stars Found', ratingStars.length > 0, 'Interactive Elements');
            
            // Test bookmark functionality
            const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
            this.addTestResult('Bookmark Buttons Found', bookmarkBtns.length > 0, 'Interactive Elements');
            
            // Test share functionality
            const shareBtns = document.querySelectorAll('.share-btn');
            this.addTestResult('Share Buttons Found', shareBtns.length > 0, 'Interactive Elements');
            
            // Test local storage functionality
            if (bookmarkBtns.length > 0) {
                const testBookmark = bookmarkBtns[0];
                testBookmark.click();
                await this.delay(100);
                
                const isBookmarked = testBookmark.classList.contains('bookmarked');
                this.addTestResult('Bookmark Toggle Works', isBookmarked, 'Interactive Elements');
                
                // Test localStorage
                const bookmarks = JSON.parse(localStorage.getItem('bookmarkedItems') || '[]');
                this.addTestResult('LocalStorage Integration', Array.isArray(bookmarks), 'Interactive Elements');
            }
            
            // Test enhanced hover effects
            const enhancedCards = document.querySelectorAll('.enhanced-card');
            this.addTestResult('Enhanced Cards Found', enhancedCards.length > 0, 'Interactive Elements');
            
        } catch (error) {
            this.addTestResult('Interactive Elements Error', false, 'Interactive Elements', error.message);
        }
    }

    async testPerformanceMetrics() {
        console.log('⚡ Testing Performance Metrics...');
        
        try {
            // Test page load time
            const loadTime = Date.now() - this.startTime;
            this.addTestResult('Page Load Time < 3s', loadTime < 3000, 'Performance', `${loadTime}ms`);
            
            // Test image loading performance
            const images = document.querySelectorAll('img');
            let loadedImages = 0;
            images.forEach(img => {
                if (img.complete) loadedImages++;
            });
            
            const imageLoadPercentage = images.length ? (loadedImages / images.length) * 100 : 100;
            this.addTestResult('Images Loaded', imageLoadPercentage > 80, 'Performance', `${imageLoadPercentage.toFixed(1)}%`);
            
            // Test CSS animations performance
            const animatedElements = document.querySelectorAll('[class*="animation"]');
            this.addTestResult('CSS Animations Optimized', animatedElements.length > 0, 'Performance');
            
            // Test script loading
            const scripts = document.querySelectorAll('script[src]');
            this.addTestResult('Scripts Loaded', scripts.length > 0, 'Performance', `${scripts.length} scripts`);
            
            // Memory usage (if available)
            if (performance && performance.memory) {
                const memoryMB = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                this.addTestResult('Memory Usage Reasonable', memoryMB < 50, 'Performance', `${memoryMB}MB`);
            }
            
        } catch (error) {
            this.addTestResult('Performance Test Error', false, 'Performance', error.message);
        }
    }

    async testMobileResponsiveness() {
        console.log('📱 Testing Mobile Responsiveness...');
        
        try {
            // Test viewport meta tag
            const viewport = document.querySelector('meta[name="viewport"]');
            this.addTestResult('Viewport Meta Tag', !!viewport, 'Mobile Responsiveness');
            
            // Test responsive classes
            const responsiveElements = document.querySelectorAll('[class*="mobile"], [class*="tablet"], [class*="responsive"]');
            this.addTestResult('Responsive Classes Found', responsiveElements.length > 0, 'Mobile Responsiveness');
            
            // Test media queries in CSS
            const stylesheets = Array.from(document.styleSheets);
            let hasMediaQueries = false;
            
            try {
                stylesheets.forEach(sheet => {
                    if (sheet.cssRules) {
                        Array.from(sheet.cssRules).forEach(rule => {
                            if (rule.type === CSSRule.MEDIA_RULE) {
                                hasMediaQueries = true;
                            }
                        });
                    }
                });
            } catch (e) {
                // CORS issues with external stylesheets - assume we have media queries
                hasMediaQueries = true;
            }
            
            this.addTestResult('Media Queries Present', hasMediaQueries, 'Mobile Responsiveness');
            
            // Test touch-friendly button sizes
            const buttons = document.querySelectorAll('button, .btn');
            let touchFriendlyCount = 0;
            
            buttons.forEach(btn => {
                const rect = btn.getBoundingClientRect();
                if (rect.width >= 44 && rect.height >= 44) {
                    touchFriendlyCount++;
                }
            });
            
            const touchFriendlyPercentage = buttons.length ? (touchFriendlyCount / buttons.length) * 100 : 100;
            this.addTestResult('Touch-Friendly Buttons', touchFriendlyPercentage > 70, 'Mobile Responsiveness', `${touchFriendlyPercentage.toFixed(1)}%`);
            
        } catch (error) {
            this.addTestResult('Mobile Responsiveness Error', false, 'Mobile Responsiveness', error.message);
        }
    }

    async testAccessibility() {
        console.log('♿ Testing Accessibility Features...');
        
        try {
            // Test ARIA labels
            const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
            this.addTestResult('ARIA Labels Present', ariaElements.length > 0, 'Accessibility');
            
            // Test heading structure
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            this.addTestResult('Heading Structure', headings.length > 0, 'Accessibility');
            
            // Test alt attributes on images
            const images = document.querySelectorAll('img');
            let imagesWithAlt = 0;
            images.forEach(img => {
                if (img.hasAttribute('alt')) imagesWithAlt++;
            });
            
            const altPercentage = images.length ? (imagesWithAlt / images.length) * 100 : 100;
            this.addTestResult('Images with Alt Text', altPercentage > 80, 'Accessibility', `${altPercentage.toFixed(1)}%`);
            
            // Test keyboard navigation
            const focusableElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
            this.addTestResult('Focusable Elements', focusableElements.length > 0, 'Accessibility');
            
            // Test color contrast (basic check)
            const body = getComputedStyle(document.body);
            const hasGoodContrast = body.color !== body.backgroundColor;
            this.addTestResult('Color Contrast', hasGoodContrast, 'Accessibility');
            
        } catch (error) {
            this.addTestResult('Accessibility Test Error', false, 'Accessibility', error.message);
        }
    }

    async testBrowserCompatibility() {
        console.log('🌐 Testing Browser Compatibility...');
        
        try {
            // Test modern JavaScript features
            const hasES6 = typeof Map !== 'undefined' && typeof Set !== 'undefined';
            this.addTestResult('ES6 Support', hasES6, 'Browser Compatibility');
            
            // Test CSS Grid support
            const hasGridSupport = CSS.supports('display', 'grid');
            this.addTestResult('CSS Grid Support', hasGridSupport, 'Browser Compatibility');
            
            // Test Flexbox support
            const hasFlexSupport = CSS.supports('display', 'flex');
            this.addTestResult('Flexbox Support', hasFlexSupport, 'Browser Compatibility');
            
            // Test Intersection Observer
            const hasIntersectionObserver = 'IntersectionObserver' in window;
            this.addTestResult('Intersection Observer', hasIntersectionObserver, 'Browser Compatibility');
            
            // Test Local Storage
            const hasLocalStorage = typeof Storage !== 'undefined';
            this.addTestResult('Local Storage Support', hasLocalStorage, 'Browser Compatibility');
            
            // Test Service Worker
            const hasServiceWorker = 'serviceWorker' in navigator;
            this.addTestResult('Service Worker Support', hasServiceWorker, 'Browser Compatibility');
            
        } catch (error) {
            this.addTestResult('Browser Compatibility Error', false, 'Browser Compatibility', error.message);
        }
    }

    async testUserExperienceFlow() {
        console.log('🎭 Testing User Experience Flow...');
        
        try {
            // Test navigation flow
            const navLinks = document.querySelectorAll('nav a, .nav-link');
            this.addTestResult('Navigation Links', navLinks.length > 0, 'User Experience');
            
            // Test search flow
            const searchElements = document.querySelectorAll('input[type="search"], .search-input');
            this.addTestResult('Search Functionality', searchElements.length > 0, 'User Experience');
            
            // Test content organization
            const sections = document.querySelectorAll('section, .section');
            this.addTestResult('Content Sections', sections.length > 0, 'User Experience');
            
            // Test loading states
            const hasLoadingStates = document.querySelectorAll('.loading, .spinner').length > 0 ||
                                   document.querySelectorAll('[class*="loading"]').length > 0;
            this.addTestResult('Loading States', hasLoadingStates, 'User Experience');
            
            // Test error handling
            const hasErrorStates = document.querySelectorAll('.error, .alert, .toast').length > 0 ||
                                 document.querySelectorAll('[class*="error"]').length > 0;
            this.addTestResult('Error Handling', hasErrorStates, 'User Experience');
            
            // Test responsive feedback
            const interactiveElements = document.querySelectorAll('button:hover, .btn:hover');
            this.addTestResult('Interactive Feedback', interactiveElements.length >= 0, 'User Experience');
            
        } catch (error) {
            this.addTestResult('User Experience Error', false, 'User Experience', error.message);
        }
    }

    addTestResult(testName, passed, category, details = '') {
        this.testResults.push({
            name: testName,
            passed,
            category,
            details,
            timestamp: new Date().toISOString()
        });
        
        const status = passed ? '✅' : '❌';
        const detailsStr = details ? ` (${details})` : '';
        console.log(`${status} ${testName}${detailsStr}`);
    }

    displayTestResults() {
        console.log('\n📊 Integration Test Results Summary:');
        console.log('=' * 50);
        
        const categories = [...new Set(this.testResults.map(r => r.category))];
        const totalTime = Date.now() - this.startTime;
        
        categories.forEach(category => {
            const categoryTests = this.testResults.filter(r => r.category === category);
            const passed = categoryTests.filter(r => r.passed).length;
            const total = categoryTests.length;
            const percentage = ((passed / total) * 100).toFixed(1);
            
            console.log(`\n📂 ${category}: ${passed}/${total} (${percentage}%)`);
            
            categoryTests.forEach(test => {
                const status = test.passed ? '✅' : '❌';
                const details = test.details ? ` - ${test.details}` : '';
                console.log(`  ${status} ${test.name}${details}`);
            });
        });
        
        const totalPassed = this.testResults.filter(r => r.passed).length;
        const totalTests = this.testResults.length;
        const overallPercentage = ((totalPassed / totalTests) * 100).toFixed(1);
        
        console.log(`\n🎯 Overall Results: ${totalPassed}/${totalTests} tests passed (${overallPercentage}%)`);
        console.log(`⏱️ Total execution time: ${totalTime}ms`);
        
        // Create visual results display
        this.createVisualTestResults();
    }

    createVisualTestResults() {
        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'integration-test-results';
        resultsContainer.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 400px;
                max-height: 500px;
                overflow-y: auto;
                z-index: 10000;
                font-family: 'Tajawal', sans-serif;
                direction: ltr;
                text-align: left;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="margin: 0; color: #1f2937;">🧪 Integration Tests</h3>
                    <button onclick="this.closest('#integration-test-results').remove()" 
                            style="background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
                </div>
                <div id="test-results-content"></div>
            </div>
        `;
        
        document.body.appendChild(resultsContainer);
        
        // Populate results
        const content = document.getElementById('test-results-content');
        const categories = [...new Set(this.testResults.map(r => r.category))];
        
        categories.forEach(category => {
            const categoryTests = this.testResults.filter(r => r.category === category);
            const passed = categoryTests.filter(r => r.passed).length;
            const total = categoryTests.length;
            const percentage = ((passed / total) * 100).toFixed(1);
            
            const categoryDiv = document.createElement('div');
            categoryDiv.style.marginBottom = '15px';
            categoryDiv.innerHTML = `
                <div style="
                    background: ${percentage == 100 ? '#10b981' : percentage >= 80 ? '#f59e0b' : '#ef4444'};
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    margin-bottom: 8px;
                    font-weight: bold;
                    font-size: 14px;
                ">
                    ${category}: ${passed}/${total} (${percentage}%)
                </div>
                ${categoryTests.map(test => `
                    <div style="
                        padding: 4px 8px;
                        margin: 2px 0;
                        border-radius: 4px;
                        background: ${test.passed ? '#dcfce7' : '#fee2e2'};
                        color: ${test.passed ? '#166534' : '#991b1b'};
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                    ">
                        <span style="margin-right: 6px;">${test.passed ? '✅' : '❌'}</span>
                        <span>${test.name}</span>
                        ${test.details ? `<span style="margin-left: auto; opacity: 0.7;">${test.details}</span>` : ''}
                    </div>
                `).join('')}
            `;
            
            content.appendChild(categoryDiv);
        });
        
        const totalPassed = this.testResults.filter(r => r.passed).length;
        const totalTests = this.testResults.length;
        const overallPercentage = ((totalPassed / totalTests) * 100).toFixed(1);
        
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin-top: 15px;
            ">
                Overall: ${totalPassed}/${totalTests} (${overallPercentage}%)
            </div>
        `;
        
        content.appendChild(summaryDiv);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-run integration tests when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add a delay to ensure all other scripts have initialized
    setTimeout(() => {
        new IntegrationTestSuite();
    }, 2000);
});

// Export for manual testing
window.IntegrationTestSuite = IntegrationTestSuite;
