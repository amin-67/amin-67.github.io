/**
 * Performance Monitoring and Optimization System
 * Real-time performance tracking and optimization suggestions
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = new Map();
        this.optimizations = [];
        this.isMonitoring = false;
        
        this.init();
    }

    init() {
        console.log('📊 Initializing Performance Monitor...');
        
        // Start monitoring when page is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMonitoring());
        } else {
            this.startMonitoring();
        }
    }

    startMonitoring() {
        this.isMonitoring = true;
        
        // Monitor core web vitals
        this.monitorCoreWebVitals();
        
        // Monitor resource loading
        this.monitorResourceLoading();
        
        // Monitor user interactions
        this.monitorUserInteractions();
        
        // Monitor scroll performance
        this.monitorScrollPerformance();
        
        // Monitor memory usage
        this.monitorMemoryUsage();
        
        // Create performance dashboard
        this.createPerformanceDashboard();
        
        console.log('✅ Performance monitoring started');
    }

    monitorCoreWebVitals() {
        // First Contentful Paint (FCP)
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name === 'first-contentful-paint') {
                    this.recordMetric('FCP', entry.startTime, 'ms');
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['paint'] });
            this.observers.set('paint', observer);
        } catch (e) {
            console.warn('Paint timing not supported');
        }

        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                this.recordMetric('LCP', entry.startTime, 'ms');
            });
        });
        
        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.set('lcp', lcpObserver);
        } catch (e) {
            console.warn('LCP timing not supported');
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    this.recordMetric('CLS', clsValue, 'score');
                }
            });
        });
        
        try {
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.set('cls', clsObserver);
        } catch (e) {
            console.warn('Layout shift timing not supported');
        }

        // First Input Delay (FID) simulation through click events
        document.addEventListener('click', (event) => {
            const startTime = performance.now();
            requestAnimationFrame(() => {
                const delay = performance.now() - startTime;
                this.recordMetric('FID_Simulation', delay, 'ms');
            });
        }, { once: true, passive: true });
    }

    monitorResourceLoading() {
        // Monitor all resource loading
        const resourceObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.initiatorType) {
                    this.recordMetric(
                        `Resource_${entry.initiatorType}`,
                        entry.responseEnd - entry.requestStart,
                        'ms'
                    );
                }
            });
        });
        
        try {
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.set('resource', resourceObserver);
        } catch (e) {
            console.warn('Resource timing not supported');
        }

        // Monitor image loading specifically
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;
        
        const checkImageLoad = () => {
            loadedImages++;
            const loadPercentage = (loadedImages / totalImages) * 100;
            this.recordMetric('Image_Load_Progress', loadPercentage, '%');
            
            if (loadedImages === totalImages) {
                this.recordMetric('All_Images_Loaded', performance.now(), 'ms');
            }
        };

        images.forEach(img => {
            if (img.complete) {
                checkImageLoad();
            } else {
                img.addEventListener('load', checkImageLoad);
                img.addEventListener('error', checkImageLoad);
            }
        });
    }

    monitorUserInteractions() {
        let interactionCount = 0;
        const interactionTypes = ['click', 'scroll', 'keydown', 'touchstart'];
        
        interactionTypes.forEach(type => {
            document.addEventListener(type, () => {
                interactionCount++;
                this.recordMetric('User_Interactions', interactionCount, 'count');
            }, { passive: true });
        });

        // Monitor search usage
        const searchInput = document.querySelector('#search-input, .search-input');
        if (searchInput) {
            let searchCount = 0;
            searchInput.addEventListener('input', () => {
                searchCount++;
                this.recordMetric('Search_Usage', searchCount, 'count');
            });
        }

        // Monitor advanced search usage
        const advancedSearchBtn = document.querySelector('.floating-search-btn, #advanced-search-trigger');
        if (advancedSearchBtn) {
            let advancedSearchCount = 0;
            advancedSearchBtn.addEventListener('click', () => {
                advancedSearchCount++;
                this.recordMetric('Advanced_Search_Usage', advancedSearchCount, 'count');
            });
        }
    }

    monitorScrollPerformance() {
        let lastScrollTime = performance.now();
        let scrollCount = 0;
        let smoothScrollIssues = 0;
        
        const scrollHandler = () => {
            const currentTime = performance.now();
            const scrollDelta = currentTime - lastScrollTime;
            
            scrollCount++;
            this.recordMetric('Scroll_Events', scrollCount, 'count');
            
            // Detect janky scrolling (>16.67ms between frames = <60fps)
            if (scrollDelta > 16.67) {
                smoothScrollIssues++;
                this.recordMetric('Scroll_Jank_Events', smoothScrollIssues, 'count');
            }
            
            lastScrollTime = currentTime;
        };
        
        document.addEventListener('scroll', scrollHandler, { passive: true });
    }

    monitorMemoryUsage() {
        if (performance.memory) {
            const checkMemory = () => {
                const memory = performance.memory;
                this.recordMetric('Memory_Used', memory.usedJSHeapSize / 1024 / 1024, 'MB');
                this.recordMetric('Memory_Total', memory.totalJSHeapSize / 1024 / 1024, 'MB');
                this.recordMetric('Memory_Limit', memory.jsHeapSizeLimit / 1024 / 1024, 'MB');
            };
            
            checkMemory();
            setInterval(checkMemory, 10000); // Check every 10 seconds
        }
    }

    recordMetric(name, value, unit) {
        const timestamp = performance.now();
        
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        
        this.metrics.get(name).push({
            value,
            unit,
            timestamp
        });

        // Update dashboard if visible
        this.updateDashboard(name, value, unit);
        
        // Check for optimization opportunities
        this.checkOptimizations(name, value);
    }

    checkOptimizations(metricName, value) {
        const optimizations = [];

        switch (metricName) {
            case 'FCP':
                if (value > 2000) {
                    optimizations.push({
                        type: 'warning',
                        message: 'First Contentful Paint is slow (>2s). Consider optimizing critical CSS and reducing render-blocking resources.',
                        metric: metricName,
                        value: value
                    });
                }
                break;
                
            case 'LCP':
                if (value > 2500) {
                    optimizations.push({
                        type: 'warning',
                        message: 'Largest Contentful Paint is slow (>2.5s). Optimize largest content elements and image loading.',
                        metric: metricName,
                        value: value
                    });
                }
                break;
                
            case 'CLS':
                if (value > 0.1) {
                    optimizations.push({
                        type: 'error',
                        message: 'Cumulative Layout Shift is high (>0.1). Add dimensions to images and avoid inserting content above existing content.',
                        metric: metricName,
                        value: value
                    });
                }
                break;
                
            case 'Memory_Used':
                if (value > 50) {
                    optimizations.push({
                        type: 'warning',
                        message: 'High memory usage detected (>50MB). Consider optimizing JavaScript and removing unused code.',
                        metric: metricName,
                        value: value
                    });
                }
                break;
                
            case 'Scroll_Jank_Events':
                if (value > 10) {
                    optimizations.push({
                        type: 'warning',
                        message: 'Scroll performance issues detected. Optimize scroll event handlers and animations.',
                        metric: metricName,
                        value: value
                    });
                }
                break;
        }

        this.optimizations.push(...optimizations);
        this.displayOptimizations();
    }

    createPerformanceDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'performance-dashboard';
        dashboard.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(17, 24, 39, 0.95);
                backdrop-filter: blur(10px);
                color: white;
                padding: 15px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                font-family: 'Courier New', monospace;
                font-size: 12px;
                min-width: 300px;
                max-height: 400px;
                overflow-y: auto;
                z-index: 9999;
                transition: transform 0.3s ease;
                direction: ltr;
                text-align: left;
            " id="dashboard-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #10b981;">📊 Performance Monitor</span>
                    <div>
                        <button onclick="this.closest('#performance-dashboard').style.transform = this.closest('#performance-dashboard').style.transform === 'translateY(calc(100% - 40px))' ? 'translateY(0)' : 'translateY(calc(100% - 40px))'" 
                                style="background: none; border: none; color: white; cursor: pointer; margin-right: 5px;">⇅</button>
                        <button onclick="this.closest('#performance-dashboard').remove()" 
                                style="background: none; border: none; color: white; cursor: pointer;">×</button>
                    </div>
                </div>
                <div id="metrics-display"></div>
                <div id="optimizations-display" style="margin-top: 10px;"></div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
    }

    updateDashboard(metricName, value, unit) {
        const metricsDisplay = document.getElementById('metrics-display');
        if (!metricsDisplay) return;

        const metricId = `metric-${metricName.replace(/[^a-zA-Z0-9]/g, '-')}`;
        let metricElement = document.getElementById(metricId);
        
        if (!metricElement) {
            metricElement = document.createElement('div');
            metricElement.id = metricId;
            metricElement.style.cssText = `
                margin: 3px 0;
                padding: 3px 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                font-size: 11px;
            `;
            metricsDisplay.appendChild(metricElement);
        }
        
        const color = this.getMetricColor(metricName, value);
        metricElement.innerHTML = `
            <span style="color: ${color};">●</span>
            <span style="margin-left: 5px;">${metricName}:</span>
            <span style="float: right; font-weight: bold;">${value.toFixed(2)} ${unit}</span>
        `;
    }

    getMetricColor(metricName, value) {
        switch (metricName) {
            case 'FCP':
                return value < 1000 ? '#10b981' : value < 2000 ? '#f59e0b' : '#ef4444';
            case 'LCP':
                return value < 1500 ? '#10b981' : value < 2500 ? '#f59e0b' : '#ef4444';
            case 'CLS':
                return value < 0.1 ? '#10b981' : value < 0.25 ? '#f59e0b' : '#ef4444';
            case 'Memory_Used':
                return value < 25 ? '#10b981' : value < 50 ? '#f59e0b' : '#ef4444';
            default:
                return '#60a5fa';
        }
    }

    displayOptimizations() {
        const optimizationsDisplay = document.getElementById('optimizations-display');
        if (!optimizationsDisplay) return;
        
        const recentOptimizations = this.optimizations.slice(-3);
        
        optimizationsDisplay.innerHTML = recentOptimizations.map(opt => `
            <div style="
                margin: 5px 0;
                padding: 5px;
                background: ${opt.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'};
                border-left: 3px solid ${opt.type === 'error' ? '#ef4444' : '#f59e0b'};
                border-radius: 4px;
                font-size: 10px;
                line-height: 1.3;
            ">
                <div style="color: ${opt.type === 'error' ? '#ef4444' : '#f59e0b'}; font-weight: bold;">
                    ${opt.type === 'error' ? '⚠️' : '💡'} ${opt.metric}
                </div>
                <div style="color: #e5e7eb; margin-top: 2px;">
                    ${opt.message}
                </div>
            </div>
        `).join('');
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: {},
            optimizations: this.optimizations,
            summary: {}
        };

        // Process metrics
        this.metrics.forEach((values, name) => {
            if (values.length > 0) {
                const latest = values[values.length - 1];
                const average = values.reduce((sum, v) => sum + v.value, 0) / values.length;
                
                report.metrics[name] = {
                    latest: latest.value,
                    average: average,
                    unit: latest.unit,
                    count: values.length
                };
            }
        });

        // Generate summary
        report.summary = {
            performanceScore: this.calculatePerformanceScore(),
            totalOptimizations: this.optimizations.length,
            criticalIssues: this.optimizations.filter(o => o.type === 'error').length,
            warnings: this.optimizations.filter(o => o.type === 'warning').length
        };

        return report;
    }

    calculatePerformanceScore() {
        let score = 100;
        
        // Deduct points for poor metrics
        const fcp = this.getLatestMetric('FCP');
        if (fcp > 2000) score -= 20;
        else if (fcp > 1000) score -= 10;
        
        const lcp = this.getLatestMetric('LCP');
        if (lcp > 2500) score -= 20;
        else if (lcp > 1500) score -= 10;
        
        const cls = this.getLatestMetric('CLS');
        if (cls > 0.25) score -= 30;
        else if (cls > 0.1) score -= 15;
        
        const memory = this.getLatestMetric('Memory_Used');
        if (memory > 50) score -= 15;
        else if (memory > 25) score -= 5;
        
        return Math.max(0, score);
    }

    getLatestMetric(name) {
        const values = this.metrics.get(name);
        return values && values.length > 0 ? values[values.length - 1].value : 0;
    }

    exportReport() {
        const report = this.generateReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    stop() {
        this.isMonitoring = false;
        
        // Disconnect all observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        this.observers.clear();
        
        // Remove dashboard
        const dashboard = document.getElementById('performance-dashboard');
        if (dashboard) {
            dashboard.remove();
        }
        
        console.log('🛑 Performance monitoring stopped');
    }
}

// Auto-initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
});

// Export for manual control
window.PerformanceMonitor = PerformanceMonitor;
