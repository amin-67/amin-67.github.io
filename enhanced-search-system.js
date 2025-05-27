/**
 * نظام البحث المحسن مع الذكاء الاصطناعي وتحسين محركات البحث
 * Enhanced Search System with AI and SEO Optimization
 */

class EnhancedSearchSystem {
    constructor() {
        this.searchData = [];
        this.searchIndex = new Map();
        this.searchHistory = this.getSearchHistory();
        this.searchAnalytics = this.getSearchAnalytics();
        this.aiSuggestions = [];
        this.searchFilters = {
            stage: '',
            grade: '',
            subject: '',
            contentType: '',
            difficulty: '',
            language: 'ar'
        };
        
        this.init();
    }

    async init() {
        console.log('🔍 تهيئة نظام البحث المحسن...');
        
        // تحميل بيانات البحث
        await this.loadSearchData();
        
        // إنشاء فهرس البحث
        this.buildSearchIndex();
        
        // إنشاء واجهة البحث المحسنة
        this.createEnhancedSearchUI();
        
        // تفعيل البحث الذكي
        this.enableSmartSearch();
        
        // تتبع تحليلات البحث
        this.initSearchAnalytics();
        
        console.log('✅ تم تهيئة نظام البحث بنجاح');
    }

    async loadSearchData() {
        // محاكاة تحميل البيانات من API
        try {
            // بيانات موسعة للمحتوى التعليمي
            this.searchData = [
                // المرحلة الابتدائية - الصف الأول
                {
                    id: 'ar_1_1',
                    title: 'كتاب اللغة العربية للصف الأول الابتدائي - الفصل الدراسي الأول',
                    description: 'كتاب اللغة العربية المقرر من وزارة التربية والتعليم للصف الأول الابتدائي، يحتوي على دروس القراءة والكتابة والإملاء',
                    stage: 'primary',
                    grade: '1',
                    subject: 'arabic',
                    contentType: 'book',
                    difficulty: 'beginner',
                    keywords: ['قراءة', 'كتابة', 'إملاء', 'حروف', 'كلمات', 'جمل'],
                    author: 'وزارة التربية والتعليم',
                    publishDate: '2024',
                    downloadCount: 15420,
                    rating: 4.8,
                    fileSize: '12.5 MB',
                    pages: 98,
                    language: 'ar',
                    thumbnail: 'images/books/arabic/grade1-arabic.jpg',
                    downloadUrl: 'primary/grade1/arabic/arabic-book-term1.pdf',
                    previewUrl: 'primary/grade1/arabic/preview.html'
                },
                {
                    id: 'math_1_1',
                    title: 'كتاب الرياضيات للصف الأول الابتدائي - منهج جديد 2024',
                    description: 'كتاب الرياضيات المطور للصف الأول الابتدائي، يشمل الأرقام والعمليات الحسابية البسيطة والأشكال الهندسية',
                    stage: 'primary',
                    grade: '1',
                    subject: 'math',
                    contentType: 'book',
                    difficulty: 'beginner',
                    keywords: ['أرقام', 'جمع', 'طرح', 'أشكال', 'ألوان', 'قياس'],
                    author: 'وزارة التربية والتعليم',
                    publishDate: '2024',
                    downloadCount: 12890,
                    rating: 4.7,
                    fileSize: '15.2 MB',
                    pages: 112,
                    language: 'ar',
                    thumbnail: 'images/books/math/grade1-math.jpg',
                    downloadUrl: 'primary/grade1/math/math-book.pdf',
                    previewUrl: 'primary/grade1/math/preview.html'
                },
                // مذكرات تفوق
                {
                    id: 'excellence_ar_1',
                    title: 'مذكرة التفوق في اللغة العربية - أولى ابتدائي',
                    description: 'مذكرة شاملة ومبسطة لتعليم القراءة والكتابة للصف الأول الابتدائي مع تمارين تفاعلية وأنشطة ممتعة',
                    stage: 'primary',
                    grade: '1',
                    subject: 'arabic',
                    contentType: 'note',
                    difficulty: 'beginner',
                    keywords: ['تفوق', 'تمارين', 'أنشطة', 'تفاعلي', 'مبسط'],
                    author: 'الأستاذ محمد علي',
                    publishDate: '2024',
                    downloadCount: 8765,
                    rating: 4.9,
                    fileSize: '8.7 MB',
                    pages: 65,
                    language: 'ar',
                    thumbnail: 'images/notes/excellence-arabic-1.jpg',
                    downloadUrl: 'primary/grade1/arabic/excellence-note.pdf',
                    previewUrl: 'primary/grade1/arabic/excellence-preview.html'
                },
                // المرحلة الإعدادية
                {
                    id: 'science_prep_1',
                    title: 'كتاب العلوم للصف الأول الإعدادي - الترم الأول',
                    description: 'كتاب العلوم الشامل للصف الأول الإعدادي، يغطي أساسيات الفيزياء والكيمياء والأحياء بطريقة مبسطة ومشوقة',
                    stage: 'preparatory',
                    grade: '1',
                    subject: 'science',
                    contentType: 'book',
                    difficulty: 'intermediate',
                    keywords: ['فيزياء', 'كيمياء', 'أحياء', 'تجارب', 'علمي'],
                    author: 'وزارة التربية والتعليم',
                    publishDate: '2024',
                    downloadCount: 9543,
                    rating: 4.6,
                    fileSize: '18.9 MB',
                    pages: 156,
                    language: 'ar',
                    thumbnail: 'images/books/science/prep1-science.jpg',
                    downloadUrl: 'preparatory/grade1/science/science-book.pdf',
                    previewUrl: 'preparatory/grade1/science/preview.html'
                },
                // المرحلة الثانوية
                {
                    id: 'physics_sec_1',
                    title: 'كتاب التفوق في الفيزياء - أولى ثانوي',
                    description: 'كتاب التفوق في الفيزياء للصف الأول الثانوي، شرح مفصل مع حلول نموذجية وتمارين متدرجة الصعوبة',
                    stage: 'secondary',
                    grade: '1',
                    subject: 'physics',
                    contentType: 'book',
                    difficulty: 'advanced',
                    keywords: ['فيزياء', 'تفوق', 'حلول', 'تمارين', 'متقدم'],
                    author: 'دار التفوق',
                    publishDate: '2024',
                    downloadCount: 7821,
                    rating: 4.8,
                    fileSize: '22.4 MB',
                    pages: 298,
                    language: 'ar',
                    thumbnail: 'images/books/physics/altafawok-physics.jpg',
                    downloadUrl: 'secondary/physics/altafawok-physics.html',
                    previewUrl: 'secondary/physics/preview.html'
                },
                // مراجعات نهائية
                {
                    id: 'final_review_math_6',
                    title: 'المراجعة النهائية في الرياضيات - سادسة ابتدائي',
                    description: 'مراجعة شاملة ونهائية لمنهج الرياضيات للصف السادس الابتدائي، تشمل جميع الوحدات مع نماذج امتحانات',
                    stage: 'primary',
                    grade: '6',
                    subject: 'math',
                    contentType: 'review',
                    difficulty: 'intermediate',
                    keywords: ['مراجعة', 'نهائية', 'شاملة', 'امتحانات', 'نماذج'],
                    author: 'الأستاذ أحمد سالم',
                    publishDate: '2024',
                    downloadCount: 11234,
                    rating: 4.9,
                    fileSize: '14.8 MB',
                    pages: 89,
                    language: 'ar',
                    thumbnail: 'images/reviews/math-grade6-final.jpg',
                    downloadUrl: 'primary/grade6/math/final-review.pdf',
                    previewUrl: 'primary/grade6/math/review-preview.html'
                }
            ];
            
            // إضافة المزيد من البيانات التجريبية
            this.generateMoreData();
            
        } catch (error) {
            console.error('خطأ في تحميل بيانات البحث:', error);
        }
    }

    generateMoreData() {
        // إنشاء المزيد من البيانات التجريبية
        const subjects = ['arabic', 'math', 'english', 'science', 'social', 'religion'];
        const stages = ['primary', 'preparatory', 'secondary'];
        const contentTypes = ['book', 'note', 'exam', 'review'];
        const gradesByStage = {
            'primary': ['1', '2', '3', '4', '5', '6'],
            'preparatory': ['1', '2', '3'],
            'secondary': ['1', '2', '3']
        };

        let idCounter = 1000;
        
        stages.forEach(stage => {
            gradesByStage[stage].forEach(grade => {
                subjects.forEach(subject => {
                    contentTypes.forEach(contentType => {
                        this.searchData.push({
                            id: `gen_${idCounter++}`,
                            title: this.generateTitle(subject, stage, grade, contentType),
                            description: this.generateDescription(subject, stage, grade, contentType),
                            stage,
                            grade,
                            subject,
                            contentType,
                            difficulty: this.getDifficulty(stage),
                            keywords: this.generateKeywords(subject, contentType),
                            author: this.getRandomAuthor(),
                            publishDate: '2024',
                            downloadCount: Math.floor(Math.random() * 20000) + 1000,
                            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                            fileSize: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
                            pages: Math.floor(Math.random() * 200) + 50,
                            language: 'ar',
                            thumbnail: `images/${contentType}s/${subject}/${stage}-${grade}.jpg`,
                            downloadUrl: `${stage}/grade${grade}/${subject}/${contentType}.pdf`,
                            previewUrl: `${stage}/grade${grade}/${subject}/preview.html`
                        });
                    });
                });
            });
        });
    }

    generateTitle(subject, stage, grade, contentType) {
        const subjectNames = {
            'arabic': 'اللغة العربية',
            'math': 'الرياضيات',
            'english': 'اللغة الإنجليزية',
            'science': 'العلوم',
            'social': 'الدراسات الاجتماعية',
            'religion': 'التربية الدينية'
        };

        const stageNames = {
            'primary': 'الابتدائي',
            'preparatory': 'الإعدادي',
            'secondary': 'الثانوي'
        };

        const contentTypeNames = {
            'book': 'كتاب',
            'note': 'مذكرة',
            'exam': 'امتحان',
            'review': 'مراجعة'
        };

        return `${contentTypeNames[contentType]} ${subjectNames[subject]} - الصف ${this.getGradeInArabic(grade)} ${stageNames[stage]}`;
    }

    generateDescription(subject, stage, grade, contentType) {
        const descriptions = {
            'book': 'كتاب شامل ومفصل يغطي جميع أجزاء المنهج',
            'note': 'مذكرة مبسطة ومركزة للفهم السريع',
            'exam': 'نماذج امتحانات متنوعة مع الحلول النموذجية',
            'review': 'مراجعة نهائية شاملة لجميع الوحدات'
        };

        return descriptions[contentType] + ` للصف ${this.getGradeInArabic(grade)} في مادة ${this.getSubjectInArabic(subject)}`;
    }

    getGradeInArabic(grade) {
        const grades = {
            '1': 'الأول',
            '2': 'الثاني',
            '3': 'الثالث',
            '4': 'الرابع',
            '5': 'الخامس',
            '6': 'السادس'
        };
        return grades[grade] || grade;
    }

    getSubjectInArabic(subject) {
        const subjects = {
            'arabic': 'اللغة العربية',
            'math': 'الرياضيات',
            'english': 'اللغة الإنجليزية',
            'science': 'العلوم',
            'social': 'الدراسات الاجتماعية',
            'religion': 'التربية الدينية'
        };
        return subjects[subject] || subject;
    }

    getDifficulty(stage) {
        const difficulties = {
            'primary': 'beginner',
            'preparatory': 'intermediate',
            'secondary': 'advanced'
        };
        return difficulties[stage];
    }

    generateKeywords(subject, contentType) {
        const baseKeywords = {
            'arabic': ['قراءة', 'كتابة', 'إملاء', 'نحو', 'صرف', 'أدب'],
            'math': ['حساب', 'جبر', 'هندسة', 'إحصاء', 'أرقام', 'معادلات'],
            'english': ['grammar', 'vocabulary', 'reading', 'writing', 'speaking'],
            'science': ['تجارب', 'فيزياء', 'كيمياء', 'أحياء', 'علمي'],
            'social': ['تاريخ', 'جغرافيا', 'اجتماع', 'وطنية', 'حضارة'],
            'religion': ['قرآن', 'سيرة', 'فقه', 'أخلاق', 'عبادة']
        };

        const contentKeywords = {
            'book': ['منهج', 'مقرر', 'رسمي'],
            'note': ['شرح', 'مبسط', 'ملخص'],
            'exam': ['اختبار', 'نموذج', 'حلول'],
            'review': ['مراجعة', 'نهائية', 'شاملة']
        };

        return [...(baseKeywords[subject] || []), ...(contentKeywords[contentType] || [])];
    }

    getRandomAuthor() {
        const authors = [
            'وزارة التربية والتعليم',
            'دار التفوق',
            'الأستاذ محمد أحمد',
            'الأستاذة فاطمة سالم',
            'الأستاذ أحمد علي',
            'دار المعرفة',
            'الأستاذ خالد محمود',
            'الأستاذة نورا حسن'
        ];
        return authors[Math.floor(Math.random() * authors.length)];
    }

    buildSearchIndex() {
        // بناء فهرس البحث للوصول السريع
        this.searchIndex.clear();
        
        this.searchData.forEach(item => {
            // فهرسة العنوان
            this.indexText(item.title, item);
            
            // فهرسة الوصف
            this.indexText(item.description, item);
            
            // فهرسة الكلمات المفتاحية
            item.keywords.forEach(keyword => {
                this.indexText(keyword, item);
            });
            
            // فهرسة المؤلف
            this.indexText(item.author, item);
        });
    }

    indexText(text, item) {
        if (!text) return;
        
        // تقسيم النص إلى كلمات
        const words = text.toLowerCase()
            .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2);
        
        words.forEach(word => {
            if (!this.searchIndex.has(word)) {
                this.searchIndex.set(word, new Set());
            }
            this.searchIndex.get(word).add(item);
        });
    }

    createEnhancedSearchUI() {
        // إنشاء واجهة البحث المحسنة
        const searchContainer = document.createElement('div');
        searchContainer.id = 'enhanced-search-container';
        searchContainer.innerHTML = `
            <div class="enhanced-search-modal" id="enhanced-search-modal">
                <div class="search-backdrop" onclick="enhancedSearchSystem.closeSearch()"></div>
                <div class="search-container">
                    <div class="search-header">
                        <h2><i class="fas fa-search"></i> البحث الذكي المتقدم</h2>
                        <button class="close-search" onclick="enhancedSearchSystem.closeSearch()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="search-input-section">
                        <div class="main-search-box">
                            <input type="text" 
                                   id="enhanced-search-input" 
                                   placeholder="ابحث عن المذكرات والكتب والمراجعات..." 
                                   autocomplete="off"
                                   spellcheck="false">
                            <button class="voice-search-btn" onclick="enhancedSearchSystem.startVoiceSearch()">
                                <i class="fas fa-microphone"></i>
                            </button>
                            <button class="clear-search-btn" onclick="enhancedSearchSystem.clearSearch()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="search-suggestions" id="search-suggestions"></div>
                        
                        <div class="search-filters-toggle">
                            <button onclick="enhancedSearchSystem.toggleFilters()">
                                <i class="fas fa-filter"></i> فلاتر البحث المتقدمة
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        
                        <div class="search-filters" id="search-filters">
                            <div class="filters-grid">
                                <div class="filter-item">
                                    <label>المرحلة:</label>
                                    <select id="stage-filter">
                                        <option value="">جميع المراحل</option>
                                        <option value="primary">الابتدائي</option>
                                        <option value="preparatory">الإعدادي</option>
                                        <option value="secondary">الثانوي</option>
                                    </select>
                                </div>
                                
                                <div class="filter-item">
                                    <label>الصف:</label>
                                    <select id="grade-filter">
                                        <option value="">جميع الصفوف</option>
                                    </select>
                                </div>
                                
                                <div class="filter-item">
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
                                
                                <div class="filter-item">
                                    <label>نوع المحتوى:</label>
                                    <select id="content-filter">
                                        <option value="">جميع الأنواع</option>
                                        <option value="book">كتب مدرسية</option>
                                        <option value="note">مذكرات</option>
                                        <option value="exam">امتحانات</option>
                                        <option value="review">مراجعات</option>
                                    </select>
                                </div>
                                
                                <div class="filter-item">
                                    <label>مستوى الصعوبة:</label>
                                    <select id="difficulty-filter">
                                        <option value="">جميع المستويات</option>
                                        <option value="beginner">مبتدئ</option>
                                        <option value="intermediate">متوسط</option>
                                        <option value="advanced">متقدم</option>
                                    </select>
                                </div>
                                
                                <div class="filter-item">
                                    <label>ترتيب النتائج:</label>
                                    <select id="sort-filter">
                                        <option value="relevance">الأكثر صلة</option>
                                        <option value="downloads">الأكثر تحميلاً</option>
                                        <option value="rating">الأعلى تقييماً</option>
                                        <option value="newest">الأحدث</option>
                                        <option value="title">الترتيب الأبجدي</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="filter-actions">
                                <button class="apply-filters" onclick="enhancedSearchSystem.applyFilters()">
                                    <i class="fas fa-check"></i> تطبيق الفلاتر
                                </button>
                                <button class="reset-filters" onclick="enhancedSearchSystem.resetFilters()">
                                    <i class="fas fa-undo"></i> إعادة تعيين
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="search-results-section">
                        <div class="results-header" id="results-header" style="display: none;">
                            <div class="results-count">
                                <span id="results-count-text">0 نتيجة</span>
                                <span id="search-time"></span>
                            </div>
                            <div class="view-options">
                                <button class="view-toggle active" data-view="grid">
                                    <i class="fas fa-th"></i>
                                </button>
                                <button class="view-toggle" data-view="list">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="search-results" id="search-results"></div>
                        
                        <div class="load-more-container" id="load-more-container" style="display: none;">
                            <button class="load-more-btn" onclick="enhancedSearchSystem.loadMoreResults()">
                                <i class="fas fa-plus"></i> تحميل المزيد من النتائج
                            </button>
                        </div>
                    </div>
                    
                    <div class="search-history-section" id="search-history">
                        <h3><i class="fas fa-history"></i> البحثات الأخيرة</h3>
                        <div class="history-items" id="history-items"></div>
                    </div>
                    
                    <div class="popular-searches-section">
                        <h3><i class="fas fa-fire"></i> البحثات الشائعة</h3>
                        <div class="popular-items" id="popular-items"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchContainer);
        
        // إضافة زر البحث العائم
        this.createFloatingSearchButton();
        
        // تفعيل أحداث البحث
        this.setupSearchEvents();
    }

    createFloatingSearchButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-search-btn';
        floatingBtn.innerHTML = `
            <button onclick="enhancedSearchSystem.openSearch()">
                <i class="fas fa-search"></i>
                <span>البحث المتقدم</span>
            </button>
        `;
        document.body.appendChild(floatingBtn);
    }

    setupSearchEvents() {
        const searchInput = document.getElementById('enhanced-search-input');
        
        if (searchInput) {
            // البحث المباشر أثناء الكتابة
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
            
            // التنقل بالكيبورد
            searchInput.addEventListener('keydown', (e) => {
                this.handleKeyboardNavigation(e);
            });
            
            // التركيز على البحث
            searchInput.addEventListener('focus', () => {
                this.showSearchSuggestions();
            });
        }
        
        // فلاتر البحث
        ['stage-filter', 'grade-filter', 'subject-filter', 'content-filter', 'difficulty-filter', 'sort-filter'].forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', () => {
                    this.updateSearchFilters();
                    this.performSearch();
                });
            }
        });
        
        // تحديث قائمة الصفوف عند تغيير المرحلة
        const stageFilter = document.getElementById('stage-filter');
        if (stageFilter) {
            stageFilter.addEventListener('change', () => {
                this.updateGradeOptions();
            });
        }
    }

    handleSearchInput(query) {
        // إلغاء البحث السابق
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // البحث مع تأخير للأداء
        this.searchTimeout = setTimeout(() => {
            if (query.trim().length > 0) {
                this.performSearch(query);
            } else {
                this.showDefaultContent();
            }
        }, 300);
    }

    async performSearch(query = null) {
        const searchStartTime = performance.now();
        
        if (!query) {
            query = document.getElementById('enhanced-search-input')?.value || '';
        }
        
        // تسجيل البحث في التحليلات
        this.recordSearch(query);
        
        // تطبيق الفلاتر
        let results = this.searchInData(query);
        results = this.applyCurrentFilters(results);
        results = this.sortResults(results);
        
        // عرض النتائج
        const searchTime = (performance.now() - searchStartTime).toFixed(2);
        this.displayResults(results, query, searchTime);
        
        // حفظ في التاريخ
        if (query.trim()) {
            this.addToSearchHistory(query);
        }
    }

    searchInData(query) {
        if (!query || query.trim().length === 0) {
            return this.searchData;
        }
        
        const searchTerms = query.toLowerCase()
            .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\w\s]/g, '')
            .split(/\s+/)
            .filter(term => term.length > 1);
        
        const results = new Map();
        
        searchTerms.forEach(term => {
            // البحث في الفهرس
            this.searchIndex.forEach((items, indexedTerm) => {
                if (indexedTerm.includes(term)) {
                    const relevanceScore = this.calculateRelevance(term, indexedTerm);
                    items.forEach(item => {
                        const currentScore = results.get(item) || 0;
                        results.set(item, currentScore + relevanceScore);
                    });
                }
            });
        });
        
        // ترتيب حسب الصلة
        return Array.from(results.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([item]) => item);
    }

    calculateRelevance(searchTerm, indexedTerm) {
        if (indexedTerm === searchTerm) return 10; // تطابق تام
        if (indexedTerm.startsWith(searchTerm)) return 8; // يبدأ بـ
        if (indexedTerm.includes(searchTerm)) return 5; // يحتوي على
        return 2; // صلة جزئية
    }

    applyCurrentFilters(results) {
        return results.filter(item => {
            return (!this.searchFilters.stage || item.stage === this.searchFilters.stage) &&
                   (!this.searchFilters.grade || item.grade === this.searchFilters.grade) &&
                   (!this.searchFilters.subject || item.subject === this.searchFilters.subject) &&
                   (!this.searchFilters.contentType || item.contentType === this.searchFilters.contentType) &&
                   (!this.searchFilters.difficulty || item.difficulty === this.searchFilters.difficulty);
        });
    }

    sortResults(results) {
        const sortBy = document.getElementById('sort-filter')?.value || 'relevance';
        
        switch (sortBy) {
            case 'downloads':
                return results.sort((a, b) => b.downloadCount - a.downloadCount);
            case 'rating':
                return results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
            case 'newest':
                return results.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            case 'title':
                return results.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
            default:
                return results; // الأكثر صلة (الترتيب الافتراضي)
        }
    }

    displayResults(results, query, searchTime) {
        const resultsContainer = document.getElementById('search-results');
        const resultsHeader = document.getElementById('results-header');
        const resultsCount = document.getElementById('results-count-text');
        const searchTimeSpan = document.getElementById('search-time');
        
        if (!resultsContainer) return;
        
        // إظهار معلومات النتائج
        if (resultsHeader && resultsCount && searchTimeSpan) {
            resultsHeader.style.display = 'flex';
            resultsCount.textContent = `${results.length} نتيجة`;
            searchTimeSpan.textContent = `(${searchTime} مللي ثانية)`;
        }
        
        // عرض النتائج
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>لم يتم العثور على نتائج</h3>
                    <p>جرب تعديل كلمات البحث أو الفلاتر</p>
                    <div class="search-suggestions-no-results">
                        <h4>اقتراحات:</h4>
                        <ul>
                            <li>تأكد من كتابة الكلمات بشكل صحيح</li>
                            <li>استخدم كلمات أكثر عمومية</li>
                            <li>قلل من عدد الفلاتر المطبقة</li>
                            <li>جرب البحث في مرحلة تعليمية أخرى</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            const viewMode = document.querySelector('.view-toggle.active')?.dataset.view || 'grid';
            resultsContainer.className = `search-results ${viewMode}-view`;
            
            resultsContainer.innerHTML = results.map(item => this.createResultCard(item)).join('');
        }
        
        // إخفاء المحتوى الافتراضي
        document.getElementById('search-history').style.display = 'none';
        document.querySelector('.popular-searches-section').style.display = 'none';
    }

    createResultCard(item) {
        return `
            <div class="result-card" data-id="${item.id}">
                <div class="result-thumbnail">
                    <img src="${item.thumbnail}" alt="${item.title}" loading="lazy"
                         onerror="this.src='images/placeholder.jpg'">
                    <div class="result-badges">
                        <span class="badge badge-${item.contentType}">${this.getContentTypeLabel(item.contentType)}</span>
                        <span class="badge badge-${item.difficulty}">${this.getDifficultyLabel(item.difficulty)}</span>
                    </div>
                </div>
                
                <div class="result-content">
                    <h3 class="result-title">${this.highlightSearchTerms(item.title)}</h3>
                    <p class="result-description">${this.highlightSearchTerms(item.description)}</p>
                    
                    <div class="result-meta">
                        <div class="meta-row">
                            <span><i class="fas fa-user"></i> ${item.author}</span>
                            <span><i class="fas fa-calendar"></i> ${item.publishDate}</span>
                        </div>
                        <div class="meta-row">
                            <span><i class="fas fa-download"></i> ${item.downloadCount.toLocaleString()}</span>
                            <span><i class="fas fa-star"></i> ${item.rating}</span>
                            <span><i class="fas fa-file"></i> ${item.fileSize}</span>
                        </div>
                    </div>
                    
                    <div class="result-actions">
                        <button class="btn-primary" onclick="enhancedSearchSystem.downloadFile('${item.downloadUrl}', '${item.title}')">
                            <i class="fas fa-download"></i> تحميل
                        </button>
                        <button class="btn-secondary" onclick="enhancedSearchSystem.previewFile('${item.previewUrl}')">
                            <i class="fas fa-eye"></i> معاينة
                        </button>
                        <button class="btn-icon bookmark-btn" onclick="enhancedSearchSystem.toggleBookmark('${item.id}')" 
                                title="إضافة للمفضلة">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <button class="btn-icon share-btn" onclick="enhancedSearchSystem.shareItem('${item.id}')" 
                                title="مشاركة">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getContentTypeLabel(type) {
        const labels = {
            'book': 'كتاب',
            'note': 'مذكرة',
            'exam': 'امتحان',
            'review': 'مراجعة'
        };
        return labels[type] || type;
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            'beginner': 'مبتدئ',
            'intermediate': 'متوسط',
            'advanced': 'متقدم'
        };
        return labels[difficulty] || difficulty;
    }

    highlightSearchTerms(text) {
        const query = document.getElementById('enhanced-search-input')?.value || '';
        if (!query.trim()) return text;
        
        const terms = query.trim().split(/\s+/);
        let highlightedText = text;
        
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }

    // باقي الدوال...
    openSearch() {
        const modal = document.getElementById('enhanced-search-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('search-open');
            
            // التركيز على البحث
            setTimeout(() => {
                const input = document.getElementById('enhanced-search-input');
                if (input) input.focus();
            }, 100);
            
            this.showDefaultContent();
        }
    }

    closeSearch() {
        const modal = document.getElementById('enhanced-search-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('search-open');
        }
    }

    showDefaultContent() {
        document.getElementById('search-history').style.display = 'block';
        document.querySelector('.popular-searches-section').style.display = 'block';
        document.getElementById('results-header').style.display = 'none';
        
        this.displaySearchHistory();
        this.displayPopularSearches();
    }

    updateSearchFilters() {
        this.searchFilters = {
            stage: document.getElementById('stage-filter')?.value || '',
            grade: document.getElementById('grade-filter')?.value || '',
            subject: document.getElementById('subject-filter')?.value || '',
            contentType: document.getElementById('content-filter')?.value || '',
            difficulty: document.getElementById('difficulty-filter')?.value || '',
            language: 'ar'
        };
    }

    getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }

    getSearchAnalytics() {
        return JSON.parse(localStorage.getItem('searchAnalytics') || '{}');
    }

    recordSearch(query) {
        if (!this.searchAnalytics.searches) {
            this.searchAnalytics.searches = {};
        }
        
        this.searchAnalytics.searches[query] = (this.searchAnalytics.searches[query] || 0) + 1;
        localStorage.setItem('searchAnalytics', JSON.stringify(this.searchAnalytics));
    }

    addToSearchHistory(query) {
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.searchHistory.unshift(query);
        this.searchHistory = this.searchHistory.slice(0, 10); // الاحتفاظ بآخر 10 بحثات
        
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

    displaySearchHistory() {
        const container = document.getElementById('history-items');
        if (!container) return;
        
        if (this.searchHistory.length === 0) {
            container.innerHTML = '<p class="no-history">لا توجد بحثات سابقة</p>';
            return;
        }
        
        container.innerHTML = this.searchHistory
            .slice(0, 5)
            .map(query => `
                <div class="history-item" onclick="enhancedSearchSystem.searchFromHistory('${query}')">
                    <i class="fas fa-history"></i>
                    <span>${query}</span>
                    <button onclick="event.stopPropagation(); enhancedSearchSystem.removeFromHistory('${query}')" 
                            class="remove-history">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
    }

    displayPopularSearches() {
        const container = document.getElementById('popular-items');
        if (!container) return;
        
        const popular = [
            'رياضيات أولى ابتدائي',
            'اللغة العربية ثانية ابتدائي',
            'العلوم أولى إعدادي',
            'الفيزياء أولى ثانوي',
            'مراجعة نهائية',
            'امتحانات سابقة'
        ];
        
        container.innerHTML = popular
            .map(query => `
                <div class="popular-item" onclick="enhancedSearchSystem.searchFromHistory('${query}')">
                    <i class="fas fa-fire"></i>
                    <span>${query}</span>
                </div>
            `).join('');
    }

    searchFromHistory(query) {
        const input = document.getElementById('enhanced-search-input');
        if (input) {
            input.value = query;
            this.performSearch(query);
        }
    }

    // تفعيل النظام
    enableSmartSearch() {
        console.log('✅ تم تفعيل البحث الذكي');
    }

    initSearchAnalytics() {
        console.log('📊 تم تفعيل تحليلات البحث');
    }
}

// تشغيل النظام
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedSearchSystem = new EnhancedSearchSystem();
});

// تصدير للاستخدام الخارجي
window.EnhancedSearchSystem = EnhancedSearchSystem;
