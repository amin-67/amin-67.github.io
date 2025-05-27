/**
 * Advanced Search System - نظام البحث المتقدم
 * Features: نتائج فورية، اقتراحات ذكية، فلترة، تاريخ البحث
 */

class AdvancedSearch {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.searchOverlay = null;
        this.searchHistory = this.getSearchHistory();
        this.popularSearches = [
            'رياضيات أولى ابتدائي',
            'اللغة العربية',
            'اللغة الإنجليزية', 
            'العلوم',
            'الدراسات الاجتماعية',
            'التربية الدينية',
            'مراجعة نهائية',
            'امتحانات سابقة'
        ];
        this.recentSearches = [];
        this.debounceTimer = null;
        this.currentResults = [];
        this.selectedIndex = -1;
        
        this.initializeSearch();
        this.setupEventListeners();
        this.createSearchInterface();
    }

    initializeSearch() {
        // إنشاء عناصر البحث المتقدم
        this.createAdvancedSearchModal();
        this.loadSearchData();
    }

    createAdvancedSearchModal() {
        // إنشاء modal للبحث المتقدم
        const modalHTML = `
            <div id="advanced-search-modal" class="search-modal">
                <div class="search-modal-content">
                    <div class="search-modal-header">
                        <h3><i class="fas fa-search"></i> البحث المتقدم</h3>
                        <button class="search-modal-close">&times;</button>
                    </div>
                    
                    <div class="search-form">
                        <div class="search-input-group">
                            <input type="text" id="main-search-input" placeholder="ابحث في جميع المواد والمراحل..." autocomplete="off">
                            <button type="button" class="search-voice-btn" title="البحث الصوتي">
                                <i class="fas fa-microphone"></i>
                            </button>
                        </div>
                        
                        <div class="search-filters">
                            <div class="filter-group">
                                <label>المرحلة التعليمية:</label>
                                <select id="stage-filter">
                                    <option value="">جميع المراحل</option>
                                    <option value="primary">ابتدائي</option>
                                    <option value="preparatory">إعدادي</option>
                                    <option value="secondary">ثانوي</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label>الصف الدراسي:</label>
                                <select id="grade-filter">
                                    <option value="">جميع الصفوف</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label>المادة:</label>
                                <select id="subject-filter">
                                    <option value="">جميع المواد</option>
                                    <option value="arabic">اللغة العربية</option>
                                    <option value="math">الرياضيات</option>
                                    <option value="english">اللغة الإنجليزية</option>
                                    <option value="science">العلوم</option>
                                    <option value="social">الدراسات الاجتماعية</option>
                                    <option value="religion">التربية الدينية</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label>نوع المحتوى:</label>
                                <select id="content-filter">
                                    <option value="">جميع الأنواع</option>
                                    <option value="book">كتاب مدرسي</option>
                                    <option value="note">مذكرة</option>
                                    <option value="exam">امتحان</option>
                                    <option value="review">مراجعة</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="search-suggestions">
                            <div class="suggestions-section">
                                <h4>عمليات البحث الشائعة:</h4>
                                <div class="popular-searches"></div>
                            </div>
                            
                            <div class="suggestions-section">
                                <h4>عمليات البحث الأخيرة:</h4>
                                <div class="recent-searches"></div>
                            </div>
                        </div>
                        
                        <div class="search-results-container">
                            <div class="results-stats"></div>
                            <div class="search-results-grid"></div>
                            <div class="search-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // البحث السريع في الهيدر
            const headerSearch = document.querySelector('.search-box input');
            if (headerSearch) {
                headerSearch.addEventListener('input', (e) => this.handleQuickSearch(e));
                headerSearch.addEventListener('focus', () => this.showQuickResults());
                headerSearch.addEventListener('keydown', (e) => this.handleKeyboard(e));
            }

            // أزرار فتح البحث المتقدم
            const searchButtons = document.querySelectorAll('.search-box button, .advanced-search-trigger');
            searchButtons.forEach(btn => {
                btn.addEventListener('click', () => this.openAdvancedSearch());
            });

            // إغلاق البحث المتقدم
            const closeBtn = document.querySelector('.search-modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeAdvancedSearch());
            }

            // البحث الصوتي
            const voiceBtn = document.querySelector('.search-voice-btn');
            if (voiceBtn) {
                voiceBtn.addEventListener('click', () => this.startVoiceSearch());
            }

            // فلاتر البحث
            this.setupFilterListeners();
            
            // البحث المتقدم
            const mainSearchInput = document.getElementById('main-search-input');
            if (mainSearchInput) {
                mainSearchInput.addEventListener('input', (e) => this.handleAdvancedSearch(e));
            }
        });
    }

    handleQuickSearch(e) {
        const query = e.target.value.trim();
        
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            if (query.length > 0) {
                this.performSearch(query, 'quick');
                this.showQuickResults();
            } else {
                this.hideQuickResults();
            }
        }, 300);
    }

    handleAdvancedSearch(e) {
        const query = e.target.value.trim();
        
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            if (query.length > 0) {
                this.performAdvancedSearch();
            }
        }, 300);
    }

    performSearch(query, type = 'quick') {
        // محاكاة البحث - يمكن ربطها بقاعدة بيانات حقيقية
        const mockResults = this.generateMockResults(query);
        
        if (type === 'quick') {
            this.displayQuickResults(mockResults);
        } else {
            this.displayAdvancedResults(mockResults);
        }
        
        // حفظ في تاريخ البحث
        this.addToSearchHistory(query);
    }

    generateMockResults(query) {
        const mockData = [
            {
                title: 'كتاب الرياضيات - الصف الأول الابتدائي',
                description: 'كتاب الرياضيات للصف الأول الابتدائي طبعة 2024',
                category: 'كتب مدرسية',
                stage: 'ابتدائي',
                grade: 'الأول',
                subject: 'رياضيات',
                image: 'images/books/math/grade1-math.jpg',
                downloadUrl: '#',
                views: 1250,
                downloads: 890,
                rating: 4.8
            },
            {
                title: 'مذكرة اللغة العربية - شرح وتدريبات',
                description: 'مذكرة شاملة في اللغة العربية للصف الأول الابتدائي',
                category: 'مذكرات',
                stage: 'ابتدائي', 
                grade: 'الأول',
                subject: 'عربي',
                image: 'images/books/arabic/grade1-arabic.jpg',
                downloadUrl: '#',
                views: 2100,
                downloads: 1450,
                rating: 4.9
            },
            {
                title: 'امتحانات سابقة - الرياضيات',
                description: 'مجموعة امتحانات الرياضيات للأعوام السابقة',
                category: 'امتحانات',
                stage: 'ابتدائي',
                grade: 'الأول', 
                subject: 'رياضيات',
                image: 'images/exams/math-exams.jpg',
                downloadUrl: '#',
                views: 980,
                downloads: 720,
                rating: 4.7
            }
        ];
        
        return mockData.filter(item => 
            item.title.includes(query) || 
            item.description.includes(query) ||
            item.subject.includes(query)
        );
    }

    displayQuickResults(results) {
        let quickResultsContainer = document.querySelector('.quick-search-results');
        
        if (!quickResultsContainer) {
            quickResultsContainer = document.createElement('div');
            quickResultsContainer.className = 'quick-search-results';
            document.querySelector('.search-box').appendChild(quickResultsContainer);
        }
        
        if (results.length === 0) {
            quickResultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد نتائج مطابقة</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = results.slice(0, 5).map(result => `
            <div class="quick-result-item" onclick="window.location.href='${result.downloadUrl}'">
                <div class="result-image">
                    <img src="${result.image}" alt="${result.title}" loading="lazy">
                </div>
                <div class="result-content">
                    <h4>${result.title}</h4>
                    <p>${result.description}</p>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                        <span class="result-stats">
                            <i class="fas fa-eye"></i> ${result.views}
                            <i class="fas fa-download"></i> ${result.downloads}
                        </span>
                    </div>
                </div>
                <div class="result-rating">
                    <div class="stars">${this.generateStars(result.rating)}</div>
                    <span class="rating-text">${result.rating}</span>
                </div>
            </div>
        `).join('');
        
        quickResultsContainer.innerHTML = resultsHTML + `
            <div class="view-all-results">
                <button onclick="advancedSearch.openAdvancedSearch()">
                    عرض جميع النتائج <i class="fas fa-arrow-left"></i>
                </button>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }

    showQuickResults() {
        const container = document.querySelector('.quick-search-results');
        if (container) {
            container.style.display = 'block';
            container.classList.add('show');
        }
    }

    hideQuickResults() {
        const container = document.querySelector('.quick-search-results');
        if (container) {
            container.style.display = 'none';
            container.classList.remove('show');
        }
    }

    openAdvancedSearch() {
        const modal = document.getElementById('advanced-search-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // تركيز على حقل البحث
            setTimeout(() => {
                const input = document.getElementById('main-search-input');
                if (input) input.focus();
            }, 100);
            
            // تحميل البحثات الشائعة والأخيرة
            this.loadPopularSearches();
            this.loadRecentSearches();
        }
    }

    closeAdvancedSearch() {
        const modal = document.getElementById('advanced-search-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    loadPopularSearches() {
        const container = document.querySelector('.popular-searches');
        if (container) {
            const searchesHTML = this.popularSearches.map(search => `
                <span class="search-tag" onclick="advancedSearch.setSearchQuery('${search}')">
                    ${search}
                </span>
            `).join('');
            container.innerHTML = searchesHTML;
        }
    }

    loadRecentSearches() {
        const container = document.querySelector('.recent-searches');
        if (container) {
            if (this.searchHistory.length === 0) {
                container.innerHTML = '<p class="no-history">لا توجد عمليات بحث سابقة</p>';
                return;
            }
            
            const searchesHTML = this.searchHistory.slice(0, 8).map(search => `
                <span class="search-tag recent" onclick="advancedSearch.setSearchQuery('${search}')">
                    <i class="fas fa-history"></i> ${search}
                    <button class="remove-search" onclick="event.stopPropagation(); advancedSearch.removeFromHistory('${search}')">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `).join('');
            container.innerHTML = searchesHTML;
        }
    }

    setSearchQuery(query) {
        const input = document.getElementById('main-search-input');
        if (input) {
            input.value = query;
            this.performAdvancedSearch();
        }
    }

    addToSearchHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 20); // الاحتفاظ بآخر 20 بحث
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    }

    removeFromHistory(query) {
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        this.loadRecentSearches();
    }

    getSearchHistory() {
        const history = localStorage.getItem('searchHistory');
        return history ? JSON.parse(history) : [];
    }

    setupFilterListeners() {
        const stageFilter = document.getElementById('stage-filter');
        const gradeFilter = document.getElementById('grade-filter');
        
        if (stageFilter) {
            stageFilter.addEventListener('change', () => {
                this.updateGradeOptions();
                this.performAdvancedSearch();
            });
        }
        
        const filters = ['grade-filter', 'subject-filter', 'content-filter'];
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', () => this.performAdvancedSearch());
            }
        });
    }

    updateGradeOptions() {
        const stageFilter = document.getElementById('stage-filter');
        const gradeFilter = document.getElementById('grade-filter');
        
        if (!stageFilter || !gradeFilter) return;
        
        const stage = stageFilter.value;
        let gradeOptions = '<option value="">جميع الصفوف</option>';
        
        switch (stage) {
            case 'primary':
                for (let i = 1; i <= 6; i++) {
                    gradeOptions += `<option value="${i}">الصف ${this.numberToArabic(i)} الابتدائي</option>`;
                }
                break;
            case 'preparatory':
                for (let i = 1; i <= 3; i++) {
                    gradeOptions += `<option value="${i}">الصف ${this.numberToArabic(i)} الإعدادي</option>`;
                }
                break;
            case 'secondary':
                for (let i = 1; i <= 3; i++) {
                    gradeOptions += `<option value="${i}">الصف ${this.numberToArabic(i)} الثانوي</option>`;
                }
                break;
        }
        
        gradeFilter.innerHTML = gradeOptions;
    }

    numberToArabic(num) {
        const arabicNumbers = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
        return arabicNumbers[num] || num.toString();
    }

    startVoiceSearch() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'ar-EG';
            recognition.continuous = false;
            recognition.interimResults = false;

            const voiceBtn = document.querySelector('.search-voice-btn');
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const input = document.getElementById('main-search-input');
                if (input) {
                    input.value = transcript;
                    this.performAdvancedSearch();
                }
            };

            recognition.onerror = () => {
                alert('حدث خطأ في التعرف على الصوت. تأكد من إعطاء الإذن للميكروفون.');
            };

            recognition.onend = () => {
                voiceBtn.classList.remove('listening');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            };

            recognition.start();
        } else {
            alert('متصفحك لا يدعم البحث الصوتي');
        }
    }

    performAdvancedSearch() {
        const query = document.getElementById('main-search-input')?.value.trim() || '';
        const stage = document.getElementById('stage-filter')?.value || '';
        const grade = document.getElementById('grade-filter')?.value || '';
        const subject = document.getElementById('subject-filter')?.value || '';
        const content = document.getElementById('content-filter')?.value || '';
        
        // تطبيق الفلاتر
        let results = this.generateMockResults(query);
        
        if (stage) {
            results = results.filter(item => item.stage.includes(stage));
        }
        
        if (subject) {
            results = results.filter(item => item.subject.includes(subject));
        }
        
        this.displayAdvancedResults(results);
        
        if (query) {
            this.addToSearchHistory(query);
        }
    }

    displayAdvancedResults(results) {
        const container = document.querySelector('.search-results-grid');
        const statsContainer = document.querySelector('.results-stats');
        
        if (!container || !statsContainer) return;
        
        // إحصائيات النتائج
        statsContainer.innerHTML = `
            <div class="results-info">
                <span class="results-count">تم العثور على ${results.length} نتيجة</span>
                <div class="sort-options">
                    <label>ترتيب حسب:</label>
                    <select id="sort-results">
                        <option value="relevance">الأكثر صلة</option>
                        <option value="newest">الأحدث</option>
                        <option value="popular">الأكثر شعبية</option>
                        <option value="rating">التقييم</option>
                    </select>
                </div>
            </div>
        `;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results-advanced">
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>لم نجد ما تبحث عنه</h3>
                    <p>جرب استخدام كلمات أخرى أو قم بتوسيع معايير البحث</p>
                    <div class="search-suggestions-alt">
                        <p>اقتراحات البحث:</p>
                        <div class="suggestions-tags">
                            ${this.popularSearches.slice(0, 4).map(search => `
                                <span class="suggestion-tag" onclick="advancedSearch.setSearchQuery('${search}')">
                                    ${search}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // عرض النتائج
        const resultsHTML = results.map(result => `
            <div class="search-result-card">
                <div class="result-image-container">
                    <img src="${result.image}" alt="${result.title}" loading="lazy">
                    <div class="result-overlay">
                        <button class="quick-preview-btn" title="معاينة سريعة">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="add-favorite-btn" title="إضافة للمفضلة">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                
                <div class="result-content">
                    <div class="result-header">
                        <h3 class="result-title">${result.title}</h3>
                        <div class="result-rating">
                            <div class="stars">${this.generateStars(result.rating)}</div>
                            <span class="rating-value">${result.rating}</span>
                        </div>
                    </div>
                    
                    <p class="result-description">${result.description}</p>
                    
                    <div class="result-tags">
                        <span class="tag tag-category">${result.category}</span>
                        <span class="tag tag-stage">${result.stage}</span>
                        <span class="tag tag-grade">${result.grade}</span>
                        <span class="tag tag-subject">${result.subject}</span>
                    </div>
                    
                    <div class="result-stats">
                        <div class="stat">
                            <i class="fas fa-eye"></i>
                            <span>${result.views} مشاهدة</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-download"></i>
                            <span>${result.downloads} تحميل</span>
                        </div>
                    </div>
                    
                    <div class="result-actions">
                        <button class="btn btn-primary download-btn">
                            <i class="fas fa-download"></i>
                            تحميل
                        </button>
                        <button class="btn btn-outline preview-btn">
                            <i class="fas fa-eye"></i>
                            معاينة
                        </button>
                        <button class="btn btn-outline share-btn">
                            <i class="fas fa-share"></i>
                            مشاركة
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = resultsHTML;
        
        // إضافة أحداث للأزرار
        this.attachResultsEventListeners();
    }

    attachResultsEventListeners() {
        // أزرار المفضلة
        document.querySelectorAll('.add-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('active');
                const icon = btn.querySelector('i');
                icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
            });
        });
        
        // أزرار المشاركة
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.shareResult(btn);
            });
        });
    }

    shareResult(button) {
        if (navigator.share) {
            navigator.share({
                title: 'شاركه مع أصدقائك',
                text: 'اكتشف هذا المحتوى التعليمي المفيد',
                url: window.location.href
            });
        } else {
            // نسخ الرابط
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showToast('تم نسخ الرابط بنجاح!');
            });
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    handleKeyboard(e) {
        const results = document.querySelectorAll('.quick-result-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
            this.updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
            this.updateSelection();
        } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
            e.preventDefault();
            results[this.selectedIndex].click();
        } else if (e.key === 'Escape') {
            this.hideQuickResults();
        }
    }

    updateSelection() {
        const results = document.querySelectorAll('.quick-result-item');
        results.forEach((result, index) => {
            result.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    loadSearchData() {
        // تحميل بيانات البحث من localStorage أو من الخادم
        const savedData = localStorage.getItem('searchData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.popularSearches = data.popularSearches || this.popularSearches;
        }
    }

    createSearchInterface() {
        // إضافة أيقونة البحث المتقدم في الشريط الجانبي
        this.createFloatingSearch();
    }

    createFloatingSearch() {
        const floatingSearchHTML = `
            <div id="floating-search" class="floating-search">
                <button class="floating-search-btn" onclick="advancedSearch.openAdvancedSearch()" title="البحث المتقدم">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', floatingSearchHTML);
    }
}

// تهيئة نظام البحث عند تحميل الصفحة
let advancedSearch;
document.addEventListener('DOMContentLoaded', () => {
    advancedSearch = new AdvancedSearch();
});

// تصدير للاستخدام العام
window.AdvancedSearch = AdvancedSearch;
