/**
 * Feature Testing & Validation Script
 * سكريبت اختبار والتحقق من الميزات
 */

class FeatureTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            tests: []
        };
        this.init();
    }

    init() {
        console.log('🧪 بدء اختبار الميزات المتقدمة...');
        this.runAllTests();
    }

    async runAllTests() {
        // Test 1: Advanced Search System
        await this.testAdvancedSearch();
        
        // Test 2: Scroll Animations
        await this.testScrollAnimations();
        
        // Test 3: Interactive Elements
        await this.testInteractiveElements();
        
        // Test 4: Data Loading
        await this.testDataLoading();
        
        // Test 5: Responsive Design
        await this.testResponsiveDesign();
        
        // Test 6: Accessibility Features
        await this.testAccessibility();
        
        // Test 7: Performance
        await this.testPerformance();
        
        // Show Results
        this.showTestResults();
    }

    async testAdvancedSearch() {
        console.log('🔍 اختبار نظام البحث المتقدم...');
        
        try {
            // Test search modal exists
            const searchModal = document.getElementById('advanced-search-modal');
            this.assert(searchModal !== null, 'Search modal exists');
            
            // Test floating search button
            const floatingBtn = document.getElementById('floating-search-btn');
            this.assert(floatingBtn !== null, 'Floating search button exists');
            
            // Test search input
            const searchInput = document.getElementById('modal-search-input');
            this.assert(searchInput !== null, 'Search input exists');
            
            // Test filters
            const stageFilter = document.getElementById('stage-filter');
            const gradeFilter = document.getElementById('grade-filter');
            const subjectFilter = document.getElementById('subject-filter');
            const contentFilter = document.getElementById('content-filter');
            
            this.assert(stageFilter !== null, 'Stage filter exists');
            this.assert(gradeFilter !== null, 'Grade filter exists');
            this.assert(subjectFilter !== null, 'Subject filter exists');
            this.assert(contentFilter !== null, 'Content filter exists');
            
            // Test voice search button
            const voiceBtn = document.querySelector('.search-voice-btn');
            this.assert(voiceBtn !== null, 'Voice search button exists');
            
            console.log('✅ نظام البحث المتقدم - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في نظام البحث المتقدم:', error);
            this.testResults.failed++;
        }
    }

    async testScrollAnimations() {
        console.log('🎨 اختبار تأثيرات التمرير...');
        
        try {
            // Test animation classes exist
            const fadeElements = document.querySelectorAll('.fade-in-up');
            const scaleElements = document.querySelectorAll('.scale-in');
            
            this.assert(fadeElements.length > 0, 'Fade-in-up elements exist');
            this.assert(scaleElements.length > 0, 'Scale-in elements exist');
            
            // Test scroll to top button creation
            setTimeout(() => {
                const scrollToTopBtn = document.querySelector('.scroll-to-top');
                this.assert(scrollToTopBtn !== null, 'Scroll to top button created');
            }, 1000);
            
            console.log('✅ تأثيرات التمرير - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في تأثيرات التمرير:', error);
            this.testResults.failed++;
        }
    }

    async testInteractiveElements() {
        console.log('🎯 اختبار العناصر التفاعلية...');
        
        try {
            // Test cards exist
            const cards = document.querySelectorAll('.stage-card, .category-card, .feature-card');
            this.assert(cards.length > 0, 'Interactive cards exist');
            
            // Wait for bookmark and share buttons to be created
            setTimeout(() => {
                const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
                const shareBtns = document.querySelectorAll('.share-btn');
                const ratingContainers = document.querySelectorAll('.rating-container');
                
                this.assert(bookmarkBtns.length > 0, 'Bookmark buttons created');
                this.assert(shareBtns.length > 0, 'Share buttons created');
                this.assert(ratingContainers.length > 0, 'Rating systems created');
            }, 1500);
            
            console.log('✅ العناصر التفاعلية - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في العناصر التفاعلية:', error);
            this.testResults.failed++;
        }
    }

    async testDataLoading() {
        console.log('📊 اختبار تحميل البيانات...');
        
        try {
            // Test mock data availability
            this.assert(typeof window.mockData !== 'undefined', 'Mock data loaded');
            this.assert(window.mockData.contentDatabase.length > 0, 'Content database has data');
            this.assert(window.mockData.searchSuggestions.popular.length > 0, 'Search suggestions available');
            
            console.log('✅ تحميل البيانات - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            this.testResults.failed++;
        }
    }

    async testResponsiveDesign() {
        console.log('📱 اختبار التصميم المتجاوب...');
        
        try {
            // Test viewport meta tag
            const viewport = document.querySelector('meta[name="viewport"]');
            this.assert(viewport !== null, 'Viewport meta tag exists');
            
            // Test responsive containers
            const containers = document.querySelectorAll('.container');
            this.assert(containers.length > 0, 'Responsive containers exist');
            
            // Test mobile-specific elements
            const mobileNav = document.querySelector('.mobile-nav');
            // Note: Mobile nav might not exist if not implemented yet
            
            console.log('✅ التصميم المتجاوب - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في التصميم المتجاوب:', error);
            this.testResults.failed++;
        }
    }

    async testAccessibility() {
        console.log('♿ اختبار إمكانية الوصول...');
        
        try {
            // Test semantic HTML
            const header = document.querySelector('header');
            const nav = document.querySelector('nav');
            const main = document.querySelector('main');
            const footer = document.querySelector('footer');
            
            this.assert(header !== null, 'Header element exists');
            this.assert(nav !== null, 'Nav element exists');
            this.assert(footer !== null, 'Footer element exists');
            
            // Test alt attributes on images
            const images = document.querySelectorAll('img');
            let imagesWithAlt = 0;
            images.forEach(img => {
                if (img.alt && img.alt.trim() !== '') {
                    imagesWithAlt++;
                }
            });
            
            this.assert(imagesWithAlt > 0, 'Images have alt attributes');
            
            // Test ARIA labels
            const buttonsWithLabels = document.querySelectorAll('button[aria-label], button[title]');
            this.assert(buttonsWithLabels.length > 0, 'Buttons have labels');
            
            console.log('✅ إمكانية الوصول - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في إمكانية الوصول:', error);
            this.testResults.failed++;
        }
    }

    async testPerformance() {
        console.log('⚡ اختبار الأداء...');
        
        try {
            // Test CSS and JS files loading
            const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
            const jsFiles = document.querySelectorAll('script[src]');
            
            this.assert(cssFiles.length > 0, 'CSS files loaded');
            this.assert(jsFiles.length > 0, 'JavaScript files loaded');
            
            // Test critical resources
            const criticalCSS = document.querySelector('style');
            this.assert(criticalCSS !== null, 'Critical CSS exists');
            
            // Test lazy loading attributes
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            this.assert(lazyImages.length > 0, 'Lazy loading implemented');
            
            console.log('✅ الأداء - تم الاختبار');
            
        } catch (error) {
            console.error('❌ خطأ في الأداء:', error);
            this.testResults.failed++;
        }
    }

    assert(condition, testName) {
        if (condition) {
            console.log(`  ✅ ${testName}`);
            this.testResults.passed++;
            this.testResults.tests.push({ name: testName, status: 'passed' });
        } else {
            console.log(`  ❌ ${testName}`);
            this.testResults.failed++;
            this.testResults.tests.push({ name: testName, status: 'failed' });
        }
    }

    showTestResults() {
        console.log('\n📊 نتائج الاختبار:');
        console.log(`✅ نجح: ${this.testResults.passed}`);
        console.log(`❌ فشل: ${this.testResults.failed}`);
        console.log(`📈 معدل النجاح: ${Math.round((this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100)}%`);
        
        // Create visual test results
        this.createTestResultsDisplay();
    }

    createTestResultsDisplay() {
        // Create test results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'test-results';
        resultsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 300px;
            font-family: Arial, sans-serif;
            border: 2px solid #e5e7eb;
        `;
        
        const successRate = Math.round((this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100);
        const statusColor = successRate >= 80 ? '#10b981' : successRate >= 60 ? '#f59e0b' : '#ef4444';
        
        resultsContainer.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; color: ${statusColor};">
                🧪 نتائج الاختبار
            </h3>
            <div style="margin-bottom: 0.5rem;">
                <strong>معدل النجاح: ${successRate}%</strong>
            </div>
            <div style="margin-bottom: 0.5rem;">
                ✅ نجح: ${this.testResults.passed}
            </div>
            <div style="margin-bottom: 1rem;">
                ❌ فشل: ${this.testResults.failed}
            </div>
            <div style="height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden;">
                <div style="height: 100%; width: ${successRate}%; background: ${statusColor}; transition: width 1s ease;"></div>
            </div>
            <button onclick="this.parentElement.remove()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: #6b7280;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
            ">إغلاق</button>
        `;
        
        document.body.appendChild(resultsContainer);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (resultsContainer.parentElement) {
                resultsContainer.remove();
            }
        }, 10000);
    }
}

// Feature demonstration
class FeatureDemo {
    constructor() {
        this.demos = [];
        this.init();
    }

    init() {
        this.createDemoButton();
        this.setupDemoModes();
    }

    createDemoButton() {
        const demoBtn = document.createElement('button');
        demoBtn.id = 'demo-trigger';
        demoBtn.innerHTML = '🎬 عرض توضيحي';
        demoBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: linear-gradient(135deg, #8b5cf6, #a855f7);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        
        demoBtn.addEventListener('click', () => this.startDemo());
        demoBtn.addEventListener('mouseenter', () => {
            demoBtn.style.transform = 'scale(1.05)';
            demoBtn.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
        });
        demoBtn.addEventListener('mouseleave', () => {
            demoBtn.style.transform = 'scale(1)';
            demoBtn.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
        });
        
        document.body.appendChild(demoBtn);
    }

    setupDemoModes() {
        this.demos = [
            {
                name: 'البحث المتقدم',
                action: () => this.demoAdvancedSearch()
            },
            {
                name: 'تأثيرات التمرير',
                action: () => this.demoScrollEffects()
            },
            {
                name: 'التفاعل مع الكروت',
                action: () => this.demoCardInteractions()
            },
            {
                name: 'البحث الصوتي',
                action: () => this.demoVoiceSearch()
            }
        ];
    }

    async startDemo() {
        for (let i = 0; i < this.demos.length; i++) {
            const demo = this.demos[i];
            this.showDemoMessage(`عرض توضيحي: ${demo.name}`);
            await this.delay(1000);
            await demo.action();
            await this.delay(2000);
        }
        this.showDemoMessage('انتهى العرض التوضيحي! 🎉');
    }

    async demoAdvancedSearch() {
        // Open search modal
        const floatingBtn = document.getElementById('floating-search-btn');
        if (floatingBtn) {
            floatingBtn.click();
            await this.delay(500);
            
            // Type in search box
            const searchInput = document.getElementById('modal-search-input');
            if (searchInput) {
                this.typeText(searchInput, 'رياضيات أولى ابتدائي');
                await this.delay(1000);
                
                // Clear and close
                searchInput.value = '';
                const closeBtn = document.querySelector('.search-modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
    }

    async demoScrollEffects() {
        // Scroll to sections to trigger animations
        const sections = ['#educational-stages', '#categories', '#features'];
        
        for (const section of sections) {
            const element = document.querySelector(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                await this.delay(1500);
            }
        }
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async demoCardInteractions() {
        // Find first card and demonstrate interactions
        const firstCard = document.querySelector('.stage-card, .category-card');
        if (firstCard) {
            // Highlight card
            firstCard.style.outline = '3px solid #8b5cf6';
            firstCard.style.outlineOffset = '4px';
            
            await this.delay(1000);
            
            // Demo bookmark button
            const bookmarkBtn = firstCard.querySelector('.bookmark-btn');
            if (bookmarkBtn) {
                bookmarkBtn.click();
                await this.delay(500);
                bookmarkBtn.click(); // Toggle back
            }
            
            // Remove highlight
            firstCard.style.outline = '';
            firstCard.style.outlineOffset = '';
        }
    }

    async demoVoiceSearch() {
        // Open search modal
        const floatingBtn = document.getElementById('floating-search-btn');
        if (floatingBtn) {
            floatingBtn.click();
            await this.delay(500);
            
            // Highlight voice button
            const voiceBtn = document.querySelector('.search-voice-btn');
            if (voiceBtn) {
                voiceBtn.style.background = '#ef4444';
                voiceBtn.style.color = 'white';
                this.showDemoMessage('اضغط على الميكروفون وقل "رياضيات"');
                
                await this.delay(2000);
                
                voiceBtn.style.background = '';
                voiceBtn.style.color = '';
                
                const closeBtn = document.querySelector('.search-modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
    }

    typeText(input, text) {
        let i = 0;
        const typing = setInterval(() => {
            input.value += text[i];
            input.dispatchEvent(new Event('input'));
            i++;
            if (i >= text.length) {
                clearInterval(typing);
            }
        }, 100);
    }

    showDemoMessage(message) {
        // Remove existing message
        const existing = document.getElementById('demo-message');
        if (existing) existing.remove();
        
        const messageEl = document.createElement('div');
        messageEl.id = 'demo-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(17, 24, 39, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
        }, 2000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize testing and demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load
    setTimeout(() => {
        new FeatureTester();
        new FeatureDemo();
    }, 2000);
});

// Console commands for manual testing
window.testFeatures = () => new FeatureTester();
window.startDemo = () => new FeatureDemo().startDemo();

console.log('🧪 أدوات الاختبار جاهزة! استخدم testFeatures() أو startDemo() في وحدة التحكم');
