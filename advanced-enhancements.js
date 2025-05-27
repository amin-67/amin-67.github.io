// تحسينات إضافية لنظام البحث المتقدم
// Additional Enhancements for Advanced Search System

/**
 * مدير التخزين المحلي المحسن
 * Enhanced Local Storage Manager
 */
class EnhancedStorageManager {
    constructor() {
        this.prefix = 'almotamayzon_';
        this.version = '2.0.0';
        this.maxCacheAge = 7 * 24 * 60 * 60 * 1000; // أسبوع واحد
    }

    // حفظ البيانات مع timestamp
    set(key, data, expirationMinutes = null) {
        try {
            const item = {
                data: data,
                timestamp: Date.now(),
                version: this.version,
                expires: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
            };
            
            localStorage.setItem(this.prefix + key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.warn('فشل في حفظ البيانات:', error);
            return false;
        }
    }

    // استرجاع البيانات مع فحص الصلاحية
    get(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;

            const parsed = JSON.parse(item);
            
            // فحص انتهاء الصلاحية
            if (parsed.expires && Date.now() > parsed.expires) {
                this.remove(key);
                return null;
            }

            // فحص عمر البيانات
            if (Date.now() - parsed.timestamp > this.maxCacheAge) {
                this.remove(key);
                return null;
            }

            return parsed.data;
        } catch (error) {
            console.warn('فشل في استرجاع البيانات:', error);
            return null;
        }
    }

    // حذف البيانات
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.warn('فشل في حذف البيانات:', error);
            return false;
        }
    }

    // تنظيف البيانات المنتهية الصلاحية
    cleanup() {
        try {
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith(this.prefix)) {
                    const cleanKey = key.replace(this.prefix, '');
                    if (!this.get(cleanKey)) {
                        keysToRemove.push(key);
                    }
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`🧹 تم تنظيف ${keysToRemove.length} عنصر من التخزين المحلي`);
            
        } catch (error) {
            console.warn('فشل في تنظيف التخزين المحلي:', error);
        }
    }

    // فحص مساحة التخزين المتاحة
    getStorageInfo() {
        try {
            const used = JSON.stringify(localStorage).length;
            const total = 5 * 1024 * 1024; // 5MB تقريباً
            
            return {
                used: used,
                total: total,
                available: total - used,
                usedPercentage: (used / total) * 100
            };
        } catch (error) {
            return null;
        }
    }
}

/**
 * مدير التحليلات المحسن
 * Enhanced Analytics Manager
 */
class SearchAnalyticsManager {
    constructor() {
        this.storage = new EnhancedStorageManager();
        this.sessionData = {
            searches: [],
            startTime: Date.now(),
            userAgent: navigator.userAgent,
            sessionId: this.generateSessionId()
        };
    }

    // توليد معرف الجلسة
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // تسجيل عملية بحث
    trackSearch(query, resultsCount, filters = {}) {
        const searchData = {
            query: query,
            resultsCount: resultsCount,
            filters: filters,
            timestamp: Date.now(),
            sessionId: this.sessionData.sessionId
        };

        // إضافة للجلسة الحالية
        this.sessionData.searches.push(searchData);

        // حفظ في التخزين المحلي
        const allSearches = this.storage.get('search_history') || [];
        allSearches.unshift(searchData);
        
        // الاحتفاظ بآخر 1000 بحث فقط
        if (allSearches.length > 1000) {
            allSearches.splice(1000);
        }
        
        this.storage.set('search_history', allSearches, 60 * 24 * 30); // شهر واحد

        // تحديث الإحصائيات
        this.updateSearchStats(query, resultsCount);
    }

    // تحديث إحصائيات البحث
    updateSearchStats(query, resultsCount) {
        const stats = this.storage.get('search_stats') || {
            totalSearches: 0,
            popularQueries: {},
            averageResults: 0,
            emptySearches: 0,
            lastUpdated: Date.now()
        };

        stats.totalSearches++;
        stats.popularQueries[query] = (stats.popularQueries[query] || 0) + 1;
        
        if (resultsCount === 0) {
            stats.emptySearches++;
        }

        // حساب متوسط النتائج
        const avgResults = stats.averageResults || 0;
        stats.averageResults = (avgResults * (stats.totalSearches - 1) + resultsCount) / stats.totalSearches;
        
        stats.lastUpdated = Date.now();

        this.storage.set('search_stats', stats, 60 * 24 * 30);
    }

    // الحصول على البحثات الشائعة
    getPopularSearches(limit = 10) {
        const stats = this.storage.get('search_stats');
        if (!stats?.popularQueries) return [];

        return Object.entries(stats.popularQueries)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([query, count]) => ({ query, count }));
    }

    // الحصول على تاريخ البحث
    getSearchHistory(limit = 50) {
        const history = this.storage.get('search_history') || [];
        return history.slice(0, limit);
    }

    // الحصول على إحصائيات البحث
    getSearchStats() {
        return this.storage.get('search_stats') || {
            totalSearches: 0,
            popularQueries: {},
            averageResults: 0,
            emptySearches: 0
        };
    }

    // مسح تاريخ البحث
    clearSearchHistory() {
        this.storage.remove('search_history');
        this.storage.remove('search_stats');
        this.sessionData.searches = [];
    }
}

/**
 * مدير التنبيهات الذكي
 * Smart Notifications Manager
 */
class SmartNotificationManager {
    constructor() {
        this.storage = new EnhancedStorageManager();
        this.permissionGranted = false;
        this.init();
    }

    async init() {
        // فحص دعم التنبيهات
        if ('Notification' in window) {
            const permission = await this.requestPermission();
            this.permissionGranted = permission === 'granted';
        }
    }

    // طلب إذن التنبيهات
    async requestPermission() {
        if (Notification.permission === 'default') {
            return await Notification.requestPermission();
        }
        return Notification.permission;
    }

    // إرسال تنبيه
    showNotification(title, options = {}) {
        if (!this.permissionGranted) {
            console.warn('لم يتم منح إذن التنبيهات');
            return null;
        }

        const defaultOptions = {
            icon: '/logo.svg',
            badge: '/favicon.svg',
            dir: 'rtl',
            lang: 'ar',
            tag: 'almotamayzon-notification',
            requireInteraction: false,
            ...options
        };

        try {
            const notification = new Notification(title, defaultOptions);
            
            // تسجيل التنبيه
            this.logNotification(title, options);
            
            return notification;
        } catch (error) {
            console.error('فشل في إرسال التنبيه:', error);
            return null;
        }
    }

    // تنبيه نتائج البحث
    notifySearchResults(query, count) {
        if (count === 0) {
            this.showNotification('لم توجد نتائج', {
                body: `لم توجد نتائج لـ "${query}". جرب مصطلحات أخرى.`,
                icon: '/images/icons/no-results.png'
            });
        } else if (count > 100) {
            this.showNotification('نتائج كثيرة!', {
                body: `تم العثور على ${count} نتيجة لـ "${query}". قد تحتاج لتضييق البحث.`,
                icon: '/images/icons/many-results.png'
            });
        }
    }

    // تنبيه تحديث المحتوى
    notifyContentUpdate(contentType, count) {
        this.showNotification('محتوى جديد متاح!', {
            body: `تم إضافة ${count} ${contentType} جديد. اكتشف المحتوى الجديد الآن.`,
            icon: '/images/icons/new-content.png',
            actions: [
                { action: 'view', title: 'عرض الجديد' },
                { action: 'dismiss', title: 'تجاهل' }
            ]
        });
    }

    // تسجيل التنبيهات
    logNotification(title, options) {
        const notifications = this.storage.get('notifications_log') || [];
        notifications.unshift({
            title,
            options,
            timestamp: Date.now()
        });

        // الاحتفاظ بآخر 100 تنبيه
        if (notifications.length > 100) {
            notifications.splice(100);
        }

        this.storage.set('notifications_log', notifications, 60 * 24 * 7); // أسبوع
    }
}

/**
 * مدير الأداء المتقدم
 * Advanced Performance Manager
 */
class AdvancedPerformanceManager {
    constructor() {
        this.metrics = {
            searchTimes: [],
            renderTimes: [],
            networkRequests: [],
            memoryUsage: [],
            userInteractions: 0,
            startTime: performance.now()
        };
        
        this.init();
    }

    init() {
        // مراقبة الأداء
        this.observePerformance();
        
        // مراقبة استخدام الذاكرة
        this.monitorMemoryUsage();
        
        // تتبع تفاعلات المستخدم
        this.trackUserInteractions();
    }

    // مراقبة الأداء
    observePerformance() {
        if ('PerformanceObserver' in window) {
            // مراقبة التنقل
            const navObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.networkRequests.push({
                        name: entry.name,
                        duration: entry.duration,
                        startTime: entry.startTime,
                        type: entry.entryType
                    });
                }
            });
            
            try {
                navObserver.observe({ entryTypes: ['navigation', 'resource'] });
            } catch (error) {
                console.warn('فشل في مراقبة الأداء:', error);
            }
        }
    }

    // قياس وقت البحث
    measureSearchTime(searchFunction) {
        return async (...args) => {
            const startTime = performance.now();
            const result = await searchFunction(...args);
            const endTime = performance.now();
            
            const duration = endTime - startTime;
            this.metrics.searchTimes.push(duration);
            
            // الاحتفاظ بآخر 100 قياس
            if (this.metrics.searchTimes.length > 100) {
                this.metrics.searchTimes.shift();
            }
            
            return result;
        };
    }

    // قياس وقت الرندر
    measureRenderTime(renderFunction) {
        return (...args) => {
            const startTime = performance.now();
            const result = renderFunction(...args);
            const endTime = performance.now();
            
            const duration = endTime - startTime;
            this.metrics.renderTimes.push(duration);
            
            if (this.metrics.renderTimes.length > 100) {
                this.metrics.renderTimes.shift();
            }
            
            return result;
        };
    }

    // مراقبة استخدام الذاكرة
    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                this.metrics.memoryUsage.push({
                    used: memory.usedJSHeapSize,
                    total: memory.totalJSHeapSize,
                    limit: memory.jsHeapSizeLimit,
                    timestamp: Date.now()
                });
                
                // الاحتفاظ بآخر 50 قياس
                if (this.metrics.memoryUsage.length > 50) {
                    this.metrics.memoryUsage.shift();
                }
            }, 30000); // كل 30 ثانية
        }
    }

    // تتبع تفاعلات المستخدم
    trackUserInteractions() {
        ['click', 'touch', 'keypress'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                this.metrics.userInteractions++;
            }, { passive: true });
        });
    }

    // الحصول على إحصائيات الأداء
    getPerformanceStats() {
        const searchTimes = this.metrics.searchTimes;
        const renderTimes = this.metrics.renderTimes;
        
        return {
            averageSearchTime: searchTimes.length > 0 ? 
                searchTimes.reduce((a, b) => a + b, 0) / searchTimes.length : 0,
            
            averageRenderTime: renderTimes.length > 0 ?
                renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length : 0,
            
            totalInteractions: this.metrics.userInteractions,
            
            sessionDuration: performance.now() - this.metrics.startTime,
            
            memoryUsage: this.metrics.memoryUsage.length > 0 ?
                this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1] : null,
                
            networkRequests: this.metrics.networkRequests.length
        };
    }

    // تحسين الأداء التلقائي
    optimizePerformance() {
        const stats = this.getPerformanceStats();
        
        // إذا كان البحث بطيئاً
        if (stats.averageSearchTime > 1000) {
            console.warn('⚠️ البحث بطيء، تفعيل التحسينات...');
            this.enableSearchOptimizations();
        }
        
        // إذا كان استخدام الذاكرة مرتفعاً
        if (stats.memoryUsage?.used > stats.memoryUsage?.limit * 0.8) {
            console.warn('⚠️ استخدام ذاكرة مرتفع، تنظيف الذاكرة...');
            this.cleanupMemory();
        }
    }

    // تفعيل تحسينات البحث
    enableSearchOptimizations() {
        // تقليل عدد النتائج المعروضة
        window.searchResultsLimit = Math.min(window.searchResultsLimit || 50, 20);
        
        // تفعيل التحميل الكسول
        window.enableLazyLoading = true;
        
        // تقليل تكرار البحث
        window.searchDebounceTime = Math.max(window.searchDebounceTime || 300, 500);
    }

    // تنظيف الذاكرة
    cleanupMemory() {
        // تنظيف التخزين المؤقت
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    if (name.includes('old') || name.includes('temp')) {
                        caches.delete(name);
                    }
                });
            });
        }
        
        // تنظيف عقد DOM غير المستخدمة
        const unusedElements = document.querySelectorAll('.removed, .hidden, .temp');
        unusedElements.forEach(el => el.remove());
        
        // إجبار garbage collection إذا كان متاحاً
        if (window.gc) {
            window.gc();
        }
    }
}

// تصدير الفئات
window.EnhancedStorageManager = EnhancedStorageManager;
window.SearchAnalyticsManager = SearchAnalyticsManager;
window.SmartNotificationManager = SmartNotificationManager;
window.AdvancedPerformanceManager = AdvancedPerformanceManager;

// تهيئة تلقائية
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة المديرين
    window.storageManager = new EnhancedStorageManager();
    window.analyticsManager = new SearchAnalyticsManager();
    window.notificationManager = new SmartNotificationManager();
    window.performanceManager = new AdvancedPerformanceManager();
    
    // تنظيف دوري
    setInterval(() => {
        window.storageManager.cleanup();
        window.performanceManager.optimizePerformance();
    }, 5 * 60 * 1000); // كل 5 دقائق
    
    console.log('🎯 تم تهيئة التحسينات المتقدمة للموقع');
});
