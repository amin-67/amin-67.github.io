/* ==================================================
   تحسينات JavaScript المتقدمة للأداء والتفاعل
   Ultra Enhanced JavaScript Features
   ================================================== */

class UltraEnhancedWebsite {
    constructor() {
        this.init();
        this.setupPerformanceMonitoring();
        this.setupAdvancedSearch();
        this.setupScrollEffects();
        this.setupLazyLoading();
        this.setupAdvancedUI();
        this.setupSEOEnhancements();
    }

    init() {
        console.log('🚀 تهيئة الموقع المتقدم...');
        this.isLoading = false;
        this.searchCache = new Map();
        this.intersectionObserver = null;
        this.performanceMetrics = {
            loadTime: 0,
            searchResponseTime: 0,
            userInteractions: 0
        };
        
        // تهيئة المتغيرات
        this.lastScrollY = 0;
        this.ticking = false;
        
        this.setupEventListeners();
        this.initializeAdvancedFeatures();
    }

    setupEventListeners() {
        // تحسين أداء التمرير
        window.addEventListener('scroll', this.throttleScroll.bind(this), { passive: true });
        
        // تحسين تغيير حجم النافذة
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // مراقبة حالة الشبكة
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', this.handleNetworkChange.bind(this));
        }
        
        // مراقبة تفاعل المستخدم
        for (const event of ['click', 'keypress', 'scroll', 'mousemove']) {
            document.addEventListener(event, this.trackUserInteraction.bind(this), { passive: true });
        }
        
        // تحسين البحث
        this.setupEnhancedSearchListeners();
    }

    setupEnhancedSearchListeners() {
        const searchInputs = document.querySelectorAll('input[type="text"]');
        for (const input of searchInputs) {
            input.addEventListener('input', this.debounce(this.handleSearchInput.bind(this), 300));
            input.addEventListener('focus', this.handleSearchFocus.bind(this));
            input.addEventListener('blur', this.handleSearchBlur.bind(this));
        }

        // زر البحث المتقدم العائم
        const floatingSearchBtn = document.querySelector('.floating-search-btn') || 
                                 document.querySelector('.enhanced-search-btn') ||
                                 document.getElementById('enhanced-search-btn');
        
        if (floatingSearchBtn) {
            floatingSearchBtn.addEventListener('click', this.openAdvancedSearch.bind(this));
        }

        // زر العودة لأعلى
        const backToTopBtn = document.querySelector('.scroll-to-top') || 
                            document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
        }
    }

    throttleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.handleScroll();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // إظهار/إخفاء زر العودة لأعلى
        this.toggleBackToTopButton(currentScrollY);
        
        // تأثيرات الشريط العلوي
        this.updateHeaderOnScroll(currentScrollY, scrollDirection);
        
        // تحديث الحركات المرئية
        this.updateScrollAnimations();
        
        this.lastScrollY = currentScrollY;
    }

    toggleBackToTopButton(scrollY) {
        const backToTopBtn = document.querySelector('.scroll-to-top') || 
                            document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
            if (scrollY > 500) {
                backToTopBtn.classList.add('visible', 'show');
            } else {
                backToTopBtn.classList.remove('visible', 'show');
            }
        }
    }

    updateHeaderOnScroll(scrollY, direction) {
        const header = document.querySelector('header');
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    scrollToTop() {
        const startTime = performance.now();
        const startScrollY = window.scrollY;
        const duration = Math.min(1000, startScrollY / 3); // مدة التحريك حسب المسافة

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // تطبيق حركة سلسة
            const easeOutCubic = 1 - (1 - progress) ** 3;
            const currentScrollY = startScrollY * (1 - easeOutCubic);
            
            window.scrollTo(0, currentScrollY);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
        
        // تتبع الحدث
        this.trackUserInteraction({ type: 'scroll_to_top' });
    }

    openAdvancedSearch() {
        const searchModal = document.getElementById('enhanced-search-modal') ||
                           document.querySelector('.search-modal');
        
        if (searchModal) {
            searchModal.classList.add('active');
            
            // تركيز على حقل البحث
            const modalInput = searchModal.querySelector('input[type="text"]');
            if (modalInput) {
                setTimeout(() => modalInput.focus(), 100);
            }
            
            // إضافة تأثير الخلفية المشوشة
            document.body.style.overflow = 'hidden';
            
            this.trackUserInteraction({ type: 'advanced_search_opened' });
        }
    }

    handleSearchInput(event) {
        const query = event.target.value.trim();
        if (query.length < 2) return;

        const startTime = performance.now();
        
        // البحث في التخزين المؤقت أولاً
        if (this.searchCache.has(query)) {
            this.displaySearchResults(this.searchCache.get(query));
            return;
        }

        // تطبيق البحث المتقدم
        this.performAdvancedSearch(query).then(results => {
            const endTime = performance.now();
            this.performanceMetrics.searchResponseTime = endTime - startTime;
            
            // حفظ في التخزين المؤقت
            this.searchCache.set(query, results);
            
            // عرض النتائج
            this.displaySearchResults(results);
            
            // تتبع البحث لـ SEO
            this.trackSearchForSEO(query, results.length);
        });
    }

    async performAdvancedSearch(query) {
        // محاكاة بحث متقدم مع نتائج محسنة
        return new Promise(resolve => {
            setTimeout(() => {
                const mockResults = this.generateMockSearchResults(query);
                resolve(mockResults);
            }, 100); // استجابة سريعة
        });
    }

    generateMockSearchResults(query) {
        const subjects = ['رياضيات', 'علوم', 'عربي', 'انجليزي', 'دراسات', 'دين'];
        const stages = ['ابتدائي', 'اعدادي', 'ثانوي'];
        const types = ['مذكرة', 'كتاب خارجي', 'مراجعة', 'امتحان'];
        
        const results = [];
        const queryLower = query.toLowerCase();
        
        // توليد نتائج ذكية بناءً على البحث
        for (let i = 0; i < 12; i++) {
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const stage = stages[Math.floor(Math.random() * stages.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            
            // تقييم الصلة بالبحث
            let relevance = 0;
            if (subject.includes(queryLower)) relevance += 3;
            if (stage.includes(queryLower)) relevance += 2;
            if (type.includes(queryLower)) relevance += 1;
            relevance += Math.random(); // إضافة عشوائية
            
            results.push({
                id: i + 1,
                title: `${type} ${subject} - ${stage}`,
                description: `${type} شاملة في مادة ${subject} للمرحلة ${stage} مع حلول نموذجية`,
                type: type,
                subject: subject,
                stage: stage,
                relevance: relevance,
                downloadCount: Math.floor(Math.random() * 1000) + 100,
                rating: (Math.random() * 2 + 3).toFixed(1), // 3-5 نجوم
                size: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
                thumbnail: `images/books/${subject.toLowerCase()}.jpg`
            });
        }
        
        // ترتيب حسب الصلة
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    displaySearchResults(results) {
        const resultsContainer = document.querySelector('.search-results-grid') ||
                                document.querySelector('.search-results');
        
        if (!resultsContainer) return;

        // تنظيف النتائج السابقة
        resultsContainer.innerHTML = '';
        
        // عرض عدد النتائج
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `${results.length} نتيجة`;
        }

        // إنشاء البطاقات
        for (const result of results) {
            const resultCard = this.createResultCard(result);
            resultsContainer.appendChild(resultCard);
        }

        // تطبيق حركات الظهور
        this.animateSearchResults();
    }

    createResultCard(result) {
        const card = document.createElement('div');
        card.className = 'result-card fade-in';
        card.innerHTML = `
            <div class="result-thumbnail">
                <img src="${result.thumbnail}" alt="${result.title}" 
                     onerror="this.src='images/default-book.jpg'">
                <div class="result-overlay">
                    <button class="quick-preview-btn" data-id="${result.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="result-content">
                <h3 class="result-title">${result.title}</h3>
                <p class="result-description">${result.description}</p>
                <div class="result-meta">
                    <span class="result-type">${result.type}</span>
                    <span class="result-stage">${result.stage}</span>
                    <span class="result-rating">
                        <i class="fas fa-star"></i> ${result.rating}
                    </span>
                </div>
                <div class="result-stats">
                    <span class="download-count">
                        <i class="fas fa-download"></i> ${result.downloadCount}
                    </span>
                    <span class="file-size">
                        <i class="fas fa-file"></i> ${result.size}
                    </span>
                </div>
                <div class="result-actions">
                    <button class="btn-primary download-btn" data-id="${result.id}">
                        <i class="fas fa-download"></i> تحميل
                    </button>
                    <button class="btn-secondary favorite-btn" data-id="${result.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        // إضافة أحداث التفاعل
        this.addCardEventListeners(card, result);
        
        return card;
    }

    addCardEventListeners(card, result) {
        // زر التحميل
        const downloadBtn = card.querySelector('.download-btn');
        downloadBtn.addEventListener('click', () => {
            this.handleDownload(result);
        });

        // زر المفضلة
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(result.id, favoriteBtn);
        });

        // معاينة سريعة
        const previewBtn = card.querySelector('.quick-preview-btn');
        previewBtn.addEventListener('click', () => {
            this.showQuickPreview(result);
        });

        // تأثير عند المرور
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }

    animateSearchResults() {
        const cards = document.querySelectorAll('.result-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    handleDownload(result) {
        // إظهار رسالة تحميل
        this.showNotification(`بدء تحميل ${result.title}`, 'success');
        
        // تحديث إحصائيات التحميل
        result.downloadCount++;
        
        // تتبع التحميل
        this.trackUserInteraction({ 
            type: 'download', 
            item: result.title,
            category: result.subject 
        });
        
        // محاكاة التحميل (في التطبيق الحقيقي سيكون رابط فعلي)
        console.log(`تحميل: ${result.title}`);
    }

    toggleFavorite(resultId, button) {
        const icon = button.querySelector('i');
        const isFavorited = icon.classList.contains('fas');
        
        if (isFavorited) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.showNotification('تم إزالة المادة من المفضلة', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.showNotification('تم إضافة المادة للمفضلة', 'success');
        }
        
        this.trackUserInteraction({ 
            type: 'favorite_toggle', 
            item_id: resultId,
            action: isFavorited ? 'remove' : 'add'
        });
    }

    showQuickPreview(result) {
        // إنشاء نافذة معاينة سريعة
        const previewModal = document.createElement('div');
        previewModal.className = 'preview-modal';
        previewModal.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h3>${result.title}</h3>
                    <button class="close-preview">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="preview-body">
                    <img src="${result.thumbnail}" alt="${result.title}">
                    <div class="preview-info">
                        <p><strong>الوصف:</strong> ${result.description}</p>
                        <p><strong>النوع:</strong> ${result.type}</p>
                        <p><strong>المرحلة:</strong> ${result.stage}</p>
                        <p><strong>التقييم:</strong> ${result.rating} نجمة</p>
                        <p><strong>حجم الملف:</strong> ${result.size}</p>
                        <p><strong>مرات التحميل:</strong> ${result.downloadCount}</p>
                    </div>
                </div>
                <div class="preview-actions">
                    <button class="btn-primary download-btn">
                        <i class="fas fa-download"></i> تحميل الآن
                    </button>
                    <button class="btn-secondary share-btn">
                        <i class="fas fa-share"></i> مشاركة
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(previewModal);
        
        // إضافة أحداث الإغلاق
        const closeBtn = previewModal.querySelector('.close-preview');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(previewModal);
        });
        
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                document.body.removeChild(previewModal);
            }
        });
        
        // تأثير الظهور
        setTimeout(() => previewModal.classList.add('show'), 10);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => notification.classList.add('show'), 10);
        
        // إخفاء تلقائي بعد 3 ثواني
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // زر الإغلاق
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    trackSearchForSEO(query, resultsCount) {
        // إرسال بيانات البحث لـ Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                search_term: query,
                content_group1: 'site_search',
                custom_parameter_1: resultsCount
            });
        }
        
        // تحديث Schema.org
        const searchAction = {
            "@context": "https://schema.org",
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://almotamayzon.com/search?q=${encodeURIComponent(query)}`
            },
            "query-input": "required name=search_term_string",
            "actionStatus": "CompletedActionStatus",
            "result": {
                "@type": "SearchResultsPage",
                "name": "نتائج البحث",
                "numberOfItems": resultsCount
            }
        };
        
        // إضافة البيانات المنظمة
        let searchScript = document.getElementById('dynamic-search-schema');
        if (!searchScript) {
            searchScript = document.createElement('script');
            searchScript.id = 'dynamic-search-schema';
            searchScript.type = 'application/ld+json';
            document.head.appendChild(searchScript);
        }
        searchScript.textContent = JSON.stringify(searchAction);
    }

    trackUserInteraction(event) {
        this.performanceMetrics.userInteractions++;
        
        // إرسال للتحليلات
        if (typeof gtag !== 'undefined') {
            gtag('event', event.type, {
                event_category: 'user_interaction',
                event_label: event.item || event.action || '',
                value: 1
            });
        }
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.intersectionObserver = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            this.intersectionObserver.unobserve(img);
                        }
                    }
                }
            }, {
                rootMargin: '50px'
            });
            
            // مراقبة جميع الصور
            for (const img of document.querySelectorAll('img[data-src]')) {
                this.intersectionObserver.observe(img);
            }
        }
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        animationObserver.unobserve(entry.target);
                    }
                }
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            for (const el of animatedElements) {
                animationObserver.observe(el);
            }
        }
    }

    updateScrollAnimations() {
        // تحديث الحركات المخصصة أثناء التمرير
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        for (const element of parallaxElements) {
            element.style.transform = `translateY(${rate}px)`;
        }
    }

    setupPerformanceMonitoring() {
        // مراقبة أداء الصفحة
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.performanceMetrics.loadTime = loadTime;
            
            console.log(`⚡ تم تحميل الصفحة في ${loadTime.toFixed(2)} مللي ثانية`);
            
            // إرسال للتحليلات
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    value: Math.round(loadTime),
                    custom_parameter: 'performance_monitoring'
                });
            }
        });
        
        // مراقبة الأخطاء
        window.addEventListener('error', (event) => {
            console.error('خطأ في الموقع:', event.error);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: event.error.message,
                    fatal: false
                });
            }
        });
    }

    setupSEOEnhancements() {
        // تحديث العنوان ديناميكياً
        this.updatePageTitle();
        
        // إضافة breadcrumbs ديناميكي
        this.updateBreadcrumbs();
        
        // تحسين meta descriptions
        this.updateMetaDescription();
    }

    updatePageTitle() {
        const currentPage = this.detectCurrentPage();
        const titles = {
            home: 'المتميزون - أفضل مكتبة تعليمية مجانية في مصر',
            search: 'البحث في المكتبة التعليمية - المتميزون',
            primary: 'المرحلة الابتدائية - مذكرات وكتب مجانية',
            preparatory: 'المرحلة الإعدادية - مذكرات وكتب مجانية',
            secondary: 'المرحلة الثانوية - مذكرات وكتب مجانية'
        };
        
        if (titles[currentPage]) {
            document.title = titles[currentPage];
        }
    }

    detectCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('primary')) return 'primary';
        if (path.includes('preparatory')) return 'preparatory';
        if (path.includes('secondary')) return 'secondary';
        if (path.includes('search')) return 'search';
        return 'home';
    }

    updateBreadcrumbs() {
        // إنشاء breadcrumbs ديناميكي
        const breadcrumbContainer = document.querySelector('.breadcrumbs');
        if (breadcrumbContainer) {
            const currentPage = this.detectCurrentPage();
            const breadcrumbs = this.generateBreadcrumbs(currentPage);
            breadcrumbContainer.innerHTML = breadcrumbs;
        }
    }

    generateBreadcrumbs(currentPage) {
        const breadcrumbData = {
            home: [
                { name: 'الرئيسية', url: '/' }
            ],
            primary: [
                { name: 'الرئيسية', url: '/' },
                { name: 'المرحلة الابتدائية', url: '/primary/' }
            ],
            preparatory: [
                { name: 'الرئيسية', url: '/' },
                { name: 'المرحلة الإعدادية', url: '/preparatory/' }
            ],
            secondary: [
                { name: 'الرئيسية', url: '/' },
                { name: 'المرحلة الثانوية', url: '/secondary/' }
            ]
        };
        
        const items = breadcrumbData[currentPage] || breadcrumbData.home;
        return items.map((item, index) => {
            if (index === items.length - 1) {
                return `<span class="breadcrumb-current">${item.name}</span>`;
            }
            return `<a href="${item.url}" class="breadcrumb-link">${item.name}</a>`;
        }).join(' <span class="breadcrumb-separator">></span> ');
    }

    updateMetaDescription() {
        const currentPage = this.detectCurrentPage();
        const descriptions = {
            home: 'موقع المتميزون أفضل مكتبة تعليمية مجانية في مصر - تحميل مذكرات وكتب خارجية لجميع المراحل التعليمية',
            primary: 'مذكرات وكتب خارجية مجانية للمرحلة الابتدائية - من الصف الأول إلى السادس الابتدائي',
            preparatory: 'مذكرات وكتب خارجية مجانية للمرحلة الإعدادية - الصف الأول والثاني والثالث الإعدادي',
            secondary: 'مذكرات وكتب خارجية مجانية للمرحلة الثانوية - الصف الأول والثاني والثالث الثانوي'
        };
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && descriptions[currentPage]) {
            metaDesc.setAttribute('content', descriptions[currentPage]);
        }
    }

    setupAdvancedUI() {
        // تحسينات واجهة المستخدم المتقدمة
        this.setupKeyboardNavigation();
        this.setupTooltips();
        this.setupProgressIndicators();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // Alt + S للبحث السريع
            if (event.altKey && event.key === 's') {
                event.preventDefault();
                this.openAdvancedSearch();
            }
            
            // Escape لإغلاق النوافذ
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
            
            // مفاتيح الأسهم للتنقل بين النتائج
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                this.navigateSearchResults(event.key);
            }
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal, .search-modal, .preview-modal');
        for (const modal of modals) {
            modal.classList.remove('active', 'show');
        }
        document.body.style.overflow = 'auto';
    }

    navigateSearchResults(direction) {
        const results = document.querySelectorAll('.result-card');
        const currentFocus = document.querySelector('.result-card.keyboard-focus');
        
        if (results.length === 0) return;
        
        let nextIndex = 0;
        if (currentFocus) {
            const currentIndex = Array.from(results).indexOf(currentFocus);
            nextIndex = direction === 'ArrowDown' ? 
                       Math.min(currentIndex + 1, results.length - 1) :
                       Math.max(currentIndex - 1, 0);
            currentFocus.classList.remove('keyboard-focus');
        }
        
        results[nextIndex].classList.add('keyboard-focus');
        results[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        for (const element of tooltipElements) {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        }
    }

    showTooltip(event) {
        const text = event.target.getAttribute('data-tooltip');
        if (!text) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => tooltip.classList.add('show'), 10);
        
        // Store reference for cleanup
        event.target.tooltipElement = tooltip;
    }

    hideTooltip(event) {
        const tooltip = event.target.tooltipElement;
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    document.body.removeChild(tooltip);
                }
            }, 200);
            event.target.tooltipElement = null;
        }
    }

    setupProgressIndicators() {
        // إعداد مؤشرات التقدم للتحميل
        console.log('تم إعداد مؤشرات التقدم');
    }

    initializeAdvancedFeatures() {
        // تهيئة الميزات المتقدمة
        console.log('✅ تم تهيئة جميع الميزات المتقدمة');
        
        // إشعار المستخدم
        setTimeout(() => {
            this.showNotification('مرحباً بك في موقع المتميزون المحسن! 🚀', 'success');
        }, 1000);
    }

    // دوال مساعدة
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    handleResize() {
        // تحديث التخطيط عند تغيير حجم النافذة
        this.updateResponsiveLayout();
    }

    updateResponsiveLayout() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        
        // تحديث موضع الأزرار العائمة
        const floatingBtn = document.querySelector('.floating-search-btn');
        const backToTopBtn = document.querySelector('.scroll-to-top');
        
        if (isMobile) {
            if (floatingBtn) {
                floatingBtn.style.bottom = '120px';
                floatingBtn.style.right = '15px';
            }
            if (backToTopBtn) {
                backToTopBtn.style.bottom = '70px';
                backToTopBtn.style.right = '15px';
            }
        }
    }

    handleNetworkChange() {
        const connection = navigator.connection;
        if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
            this.showNotification('اتصال إنترنت بطيء - تم تفعيل وضع التوفير', 'warning');
            this.enableDataSaver();
        }
    }

    enableDataSaver() {
        // تقليل جودة الصور وإيقاف الحركات
        document.body.classList.add('data-saver-mode');
    }

    handleSearchFocus(event) {
        event.target.parentElement.classList.add('search-focused');
    }

    handleSearchBlur(event) {
        event.target.parentElement.classList.remove('search-focused');
    }
}

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    window.ultraEnhancedWebsite = new UltraEnhancedWebsite();
});

// تصدير للاستخدام العام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UltraEnhancedWebsite;
}
