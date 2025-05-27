/**
 * User Feedback & Analytics System
 * Collects user feedback and provides analytics insights
 */

class UserFeedbackSystem {
    constructor() {
        this.feedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
        this.analytics = JSON.parse(localStorage.getItem('userAnalytics') || '{}');
        this.sessionData = this.initializeSession();
        
        this.init();
    }

    init() {
        console.log('💬 Initializing User Feedback System...');
        
        // Create feedback widget
        this.createFeedbackWidget();
        
        // Track user behavior
        this.initializeAnalytics();
        
        // Setup feedback modal
        this.createFeedbackModal();
        
        console.log('✅ User Feedback System initialized');
    }

    initializeSession() {
        return {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            pageViews: 1,
            interactions: 0,
            searchQueries: [],
            featuresUsed: new Set(),
            timeOnPage: 0
        };
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    createFeedbackWidget() {
        const widget = document.createElement('div');
        widget.id = 'feedback-widget';
        widget.innerHTML = `
            <div style="
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px;
                border-radius: 25px 0 0 25px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                z-index: 9998;
                transition: all 0.3s ease;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                font-weight: bold;
                font-size: 14px;
                user-select: none;
                direction: ltr;
            " onmouseover="this.style.transform = 'translateY(-50%) translateX(5px)'" 
               onmouseout="this.style.transform = 'translateY(-50%) translateX(0)'"
               onclick="window.userFeedbackSystem.openFeedbackModal()">
                💬 رأيك يهمنا
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    createFeedbackModal() {
        const modal = document.createElement('div');
        modal.id = 'feedback-modal';
        modal.innerHTML = `
            <div class="feedback-modal-overlay" onclick="window.userFeedbackSystem.closeFeedbackModal()" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 10001;
                display: none;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="feedback-modal-content" onclick="event.stopPropagation()" style="
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    transform: scale(0.7);
                    transition: transform 0.3s ease;
                    font-family: 'Tajawal', sans-serif;
                    direction: rtl;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #1f2937; font-size: 24px;">💬 شاركنا رأيك</h3>
                        <button onclick="window.userFeedbackSystem.closeFeedbackModal()" style="
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #6b7280;
                            padding: 0;
                            width: 30px;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            transition: background-color 0.2s;
                        " onmouseover="this.style.backgroundColor = '#f3f4f6'" onmouseout="this.style.backgroundColor = 'transparent'">×</button>
                    </div>
                    
                    <form id="feedback-form">
                        <!-- Rating Section -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: #374151;">
                                ما رأيك في الموقع بشكل عام؟
                            </label>
                            <div id="overall-rating" style="display: flex; gap: 5px; direction: ltr; justify-content: center;">
                                ${[1,2,3,4,5].map(i => `
                                    <span class="rating-star" data-rating="${i}" style="
                                        font-size: 30px;
                                        cursor: pointer;
                                        color: #d1d5db;
                                        transition: color 0.2s;
                                    " onmouseover="window.userFeedbackSystem.highlightStars(${i})" 
                                       onmouseout="window.userFeedbackSystem.resetStars()"
                                       onclick="window.userFeedbackSystem.setRating(${i})">⭐</span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Feature Rating -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 15px; font-weight: bold; color: #374151;">
                                قيّم المميزات التالية:
                            </label>
                            <div id="feature-ratings">
                                ${[
                                    { key: 'search', name: 'البحث المتقدم' },
                                    { key: 'design', name: 'التصميم والشكل العام' },
                                    { key: 'speed', name: 'سرعة الموقع' },
                                    { key: 'content', name: 'جودة المحتوى' },
                                    { key: 'navigation', name: 'سهولة التنقل' }
                                ].map(feature => `
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 10px; background: #f9fafb; border-radius: 8px;">
                                        <span style="color: #374151;">${feature.name}</span>
                                        <div style="display: flex; gap: 3px;">
                                            ${[1,2,3,4,5].map(i => `
                                                <span class="feature-rating-star" data-feature="${feature.key}" data-rating="${i}" style="
                                                    font-size: 16px;
                                                    cursor: pointer;
                                                    color: #d1d5db;
                                                    transition: color 0.2s;
                                                " onclick="window.userFeedbackSystem.setFeatureRating('${feature.key}', ${i})">⭐</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Comments Section -->
                        <div style="margin-bottom: 25px;">
                            <label for="feedback-comments" style="display: block; margin-bottom: 10px; font-weight: bold; color: #374151;">
                                ملاحظات أو اقتراحات إضافية:
                            </label>
                            <textarea id="feedback-comments" placeholder="اكتب ملاحظاتك هنا..." style="
                                width: 100%;
                                min-height: 100px;
                                padding: 12px;
                                border: 2px solid #e5e7eb;
                                border-radius: 8px;
                                font-family: 'Tajawal', sans-serif;
                                font-size: 14px;
                                resize: vertical;
                                transition: border-color 0.2s;
                                box-sizing: border-box;
                            " onfocus="this.style.borderColor = '#667eea'" onblur="this.style.borderColor = '#e5e7eb'"></textarea>
                        </div>

                        <!-- Contact Info (Optional) -->
                        <div style="margin-bottom: 25px;">
                            <label for="feedback-email" style="display: block; margin-bottom: 10px; font-weight: bold; color: #374151;">
                                البريد الإلكتروني (اختياري):
                            </label>
                            <input type="email" id="feedback-email" placeholder="your.email@example.com" style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #e5e7eb;
                                border-radius: 8px;
                                font-family: 'Tajawal', sans-serif;
                                font-size: 14px;
                                transition: border-color 0.2s;
                                box-sizing: border-box;
                                direction: ltr;
                                text-align: left;
                            " onfocus="this.style.borderColor = '#667eea'" onblur="this.style.borderColor = '#e5e7eb'">
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" style="
                            width: 100%;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            padding: 15px;
                            border-radius: 10px;
                            font-family: 'Tajawal', sans-serif;
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.2s, box-shadow 0.2s;
                        " onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'" 
                           onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = 'none'">
                            إرسال التقييم
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup form submission
        document.getElementById('feedback-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitFeedback();
        });
    }

    openFeedbackModal() {
        const modal = document.getElementById('feedback-modal');
        const overlay = modal.querySelector('.feedback-modal-overlay');
        const content = modal.querySelector('.feedback-modal-content');
        
        modal.style.display = 'block';
        setTimeout(() => {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);
        
        this.trackEvent('feedback_modal_opened');
    }

    closeFeedbackModal() {
        const modal = document.getElementById('feedback-modal');
        const overlay = modal.querySelector('.feedback-modal-overlay');
        const content = modal.querySelector('.feedback-modal-content');
        
        overlay.style.opacity = '0';
        content.style.transform = 'scale(0.7)';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('#overall-rating .rating-star');
        stars.forEach((star, index) => {
            star.style.color = index < rating ? '#fbbf24' : '#d1d5db';
        });
    }

    resetStars() {
        const currentRating = this.getCurrentRating();
        this.highlightStars(currentRating);
    }

    setRating(rating) {
        this.currentRating = rating;
        this.highlightStars(rating);
    }

    setFeatureRating(feature, rating) {
        if (!this.featureRatings) this.featureRatings = {};
        this.featureRatings[feature] = rating;
        
        const stars = document.querySelectorAll(`[data-feature="${feature}"]`);
        stars.forEach((star, index) => {
            star.style.color = index < rating ? '#fbbf24' : '#d1d5db';
        });
    }

    getCurrentRating() {
        return this.currentRating || 0;
    }

    submitFeedback() {
        const comments = document.getElementById('feedback-comments').value;
        const email = document.getElementById('feedback-email').value;
        
        const feedbackData = {
            id: this.generateSessionId(),
            timestamp: new Date().toISOString(),
            overallRating: this.currentRating || 0,
            featureRatings: this.featureRatings || {},
            comments: comments,
            email: email,
            sessionData: this.sessionData,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language
        };
        
        this.feedback.push(feedbackData);
        localStorage.setItem('userFeedback', JSON.stringify(this.feedback));
        
        this.showThankYouMessage();
        this.closeFeedbackModal();
        
        this.trackEvent('feedback_submitted', { rating: this.currentRating });
        
        console.log('💬 Feedback submitted:', feedbackData);
    }

    showThankYouMessage() {
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
                z-index: 10002;
                font-family: 'Tajawal', sans-serif;
                font-weight: bold;
                transform: translateX(400px);
                transition: transform 0.5s ease;
                direction: rtl;
            ">
                ✨ شكراً لك! تم إرسال تقييمك بنجاح
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.firstElementChild.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.firstElementChild.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 4000);
    }

    initializeAnalytics() {
        // Track page views
        this.trackEvent('page_view');
        
        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.trackEvent('scroll_depth', { depth: scrollDepth });
            }
        });
        
        // Track time on page
        setInterval(() => {
            this.sessionData.timeOnPage = Date.now() - this.sessionData.startTime;
        }, 1000);
        
        // Track clicks
        document.addEventListener('click', (event) => {
            this.sessionData.interactions++;
            
            const target = event.target.closest('button, a, .clickable');
            if (target) {
                this.trackEvent('click', {
                    element: target.tagName,
                    className: target.className,
                    text: target.textContent.slice(0, 50)
                });
            }
        });
        
        // Track search queries
        const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length > 2) {
                    this.sessionData.searchQueries.push({
                        query: e.target.value,
                        timestamp: Date.now()
                    });
                    this.trackEvent('search', { query: e.target.value });
                }
            });
        });
        
        // Track feature usage
        this.trackFeatureUsage();
        
        // Save analytics before page unload
        window.addEventListener('beforeunload', () => {
            this.saveAnalytics();
        });
    }

    trackFeatureUsage() {
        // Track advanced search usage
        const advancedSearchBtn = document.querySelector('.floating-search-btn, #advanced-search-trigger');
        if (advancedSearchBtn) {
            advancedSearchBtn.addEventListener('click', () => {
                this.sessionData.featuresUsed.add('advanced_search');
                this.trackEvent('feature_used', { feature: 'advanced_search' });
            });
        }
        
        // Track bookmark usage
        document.addEventListener('click', (e) => {
            if (e.target.closest('.bookmark-btn')) {
                this.sessionData.featuresUsed.add('bookmark');
                this.trackEvent('feature_used', { feature: 'bookmark' });
            }
            
            if (e.target.closest('.share-btn')) {
                this.sessionData.featuresUsed.add('share');
                this.trackEvent('feature_used', { feature: 'share' });
            }
            
            if (e.target.closest('.rating-star')) {
                this.sessionData.featuresUsed.add('rating');
                this.trackEvent('feature_used', { feature: 'rating' });
            }
        });
    }

    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            data: data,
            timestamp: Date.now(),
            sessionId: this.sessionData.sessionId
        };
        
        if (!this.analytics.events) this.analytics.events = [];
        this.analytics.events.push(event);
        
        // Keep only last 1000 events to manage storage
        if (this.analytics.events.length > 1000) {
            this.analytics.events = this.analytics.events.slice(-1000);
        }
    }

    saveAnalytics() {
        this.analytics.lastUpdated = Date.now();
        this.analytics.sessionData = this.sessionData;
        localStorage.setItem('userAnalytics', JSON.stringify(this.analytics));
    }

    generateAnalyticsReport() {
        const report = {
            feedback: this.feedback,
            analytics: this.analytics,
            summary: {
                totalFeedback: this.feedback.length,
                averageRating: this.feedback.length > 0 ? 
                    this.feedback.reduce((sum, f) => sum + (f.overallRating || 0), 0) / this.feedback.length : 0,
                totalEvents: this.analytics.events ? this.analytics.events.length : 0,
                mostUsedFeatures: this.getMostUsedFeatures(),
                commonSearchQueries: this.getCommonSearchQueries()
            }
        };
        
        return report;
    }

    getMostUsedFeatures() {
        if (!this.analytics.events) return [];
        
        const featureUsage = {};
        this.analytics.events
            .filter(e => e.name === 'feature_used')
            .forEach(e => {
                const feature = e.data.feature;
                featureUsage[feature] = (featureUsage[feature] || 0) + 1;
            });
        
        return Object.entries(featureUsage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([feature, count]) => ({ feature, count }));
    }

    getCommonSearchQueries() {
        if (!this.analytics.events) return [];
        
        const queryCount = {};
        this.analytics.events
            .filter(e => e.name === 'search')
            .forEach(e => {
                const query = e.data.query;
                queryCount[query] = (queryCount[query] || 0) + 1;
            });
        
        return Object.entries(queryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([query, count]) => ({ query, count }));
    }

    exportAnalytics() {
        const report = this.generateAnalyticsReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `user-feedback-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize feedback system
document.addEventListener('DOMContentLoaded', () => {
    window.userFeedbackSystem = new UserFeedbackSystem();
});

// Export for external access
window.UserFeedbackSystem = UserFeedbackSystem;
