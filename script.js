// Enhanced Website Functionality - المتميزون Educational Platform
// تحسينات متقدمة للموقع التعليمي

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 تحميل وظائف الموقع الأساسية...');
    
    // تهيئة المتغيرات الأساسية
    initializeVariables();
    
    // تفعيل التنقل السلس
    initializeSmoothScrolling();
    
    // تفعيل تحديث الروابط النشطة
    initializeActiveLinks();
    
    // تفعيل نماذج الاتصال
    initializeContactForms();
    
    // تفعيل الحركات والتأثيرات
    initializeAnimations();
    
    // تفعيل تحسينات الأداء
    initializePerformanceOptimizations();
    
    // تفعيل إمكانية الوصول
    initializeAccessibility();
    
    console.log('✅ تم تحميل جميع وظائف الموقع بنجاح');
});

// تهيئة المتغيرات الأساسية
function initializeVariables() {
    window.siteConfig = {
        siteName: 'المتميزون',
        siteUrl: 'https://almotamayzon.com',
        version: '2.0.0',
        language: 'ar',
        direction: 'rtl'
    };
    
    // متغيرات الأداء
    window.performanceMetrics = {
        pageLoadStart: performance.now(),
        searchCount: 0,
        userInteractions: 0
    };
}

// تفعيل التنقل السلس
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .footer-links a, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // حساب الموضع مع مراعاة header الثابت
                    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // تتبع النقرات للتحليلات
                    trackUserInteraction('navigation_click', {
                        target: targetId,
                        source: 'smooth_scroll'
                    });
                }
            }
        });
    });
}

// تفعيل تحديث الروابط النشطة
function initializeActiveLinks() {
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        const scrollPosition = window.scrollY + 120;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // تحديث الرابط النشط عند التحميل
    updateActiveLink();
    
    // تحديث الرابط النشط عند التمرير مع throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveLink, 100);
    });
}

// تفعيل نماذج الاتصال
function initializeContactForms() {
    // نموذج الاتصال الرئيسي
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
    
    // نموذج النشرة البريدية
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

// معالجة إرسال نموذج الاتصال
function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // التحقق من صحة البيانات
    if (!validateContactForm(data)) {
        return;
    }
    
    // إظهار حالة التحميل
    showLoadingState(e.target);
    
    // محاكاة إرسال البيانات (يمكن استبدالها بـ API حقيقي)
    setTimeout(() => {
        hideLoadingState(e.target);
        showSuccessMessage(`شكرًا ${data.name} على تواصلك معنا. سنرد عليك في أقرب وقت ممكن.`);
        e.target.reset();
        
        // تتبع الحدث
        trackUserInteraction('contact_form_submit', {
            subject: data.subject,
            has_message: data.message.length > 0
        });
    }, 2000);
}

// معالجة إرسال نموذج النشرة البريدية
function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!validateEmail(email)) {
        showErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // إظهار حالة التحميل
    showLoadingState(e.target);
    
    // محاكاة الاشتراك
    setTimeout(() => {
        hideLoadingState(e.target);
        showSuccessMessage('تم اشتراكك في النشرة البريدية بنجاح!');
        e.target.reset();
        
        // تتبع الاشتراك
        trackUserInteraction('newsletter_subscribe', {
            email_domain: email.split('@')[1]
        });
    }, 1500);
}

// تفعيل الحركات والتأثيرات
function initializeAnimations() {
    // Observer للحركات عند التمرير
    if ('IntersectionObserver' in window) {
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
        
        // مراقبة العناصر القابلة للحركة
        document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    // تأثيرات التفاعل
    addHoverEffects();
    addClickEffects();
}

// إضافة تأثيرات الماوس
function addHoverEffects() {
    const cards = document.querySelectorAll('.card, .subject-card, .stage-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// إضافة تأثيرات النقر
function addClickEffects() {
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// تفعيل تحسينات الأداء
function initializePerformanceOptimizations() {
    // تحميل كسول للصور
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // تحسين الخطوط
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Cache للموارد الثابتة
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// تفعيل إمكانية الوصول
function initializeAccessibility() {
    // تحسين التنقل بلوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // تحسين قارئ الشاشة
    addScreenReaderSupport();
    
    // تحسين التباين
    addHighContrastSupport();
}

// دعم قارئ الشاشة
function addScreenReaderSupport() {
    // إضافة تسميات ARIA
    const searchInput = document.getElementById('enhanced-search-input');
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'البحث في المكتبة التعليمية');
        searchInput.setAttribute('aria-describedby', 'search-help');
    }
    
    // إضافة وصف للبحث
    const searchHelp = document.createElement('div');
    searchHelp.id = 'search-help';
    searchHelp.className = 'sr-only';
    searchHelp.textContent = 'اكتب للبحث في مذكرات وكتب جميع المواد والمراحل التعليمية';
    if (searchInput) {
        searchInput.parentNode.appendChild(searchHelp);
    }
}

// دعم التباين العالي
function addHighContrastSupport() {
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastToggle.title = 'تبديل التباين العالي';
    contrastToggle.setAttribute('aria-label', 'تبديل التباين العالي');
    
    contrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
    });
    
    // استرجاع إعداد التباين
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    document.body.appendChild(contrastToggle);
}

// الوظائف المساعدة
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('يرجى إدخال اسم صحيح');
    }
    
    if (!validateEmail(data.email)) {
        errors.push('يرجى إدخال بريد إلكتروني صحيح');
    }
    
    if (!data.subject || data.subject.length < 5) {
        errors.push('يرجى إدخال موضوع الرسالة');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('يرجى إدخال رسالة مفصلة');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال';
    }
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة إلى الصفحة
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // إضافة animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // الإغلاق التلقائي
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // الإغلاق اليدوي
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function trackUserInteraction(action, data = {}) {
    window.performanceMetrics.userInteractions++;
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            custom_map: data,
            user_interactions: window.performanceMetrics.userInteractions
        });
    }
    
    // Console logging for development
    console.log('📊 User Interaction:', action, data);
}

// تصدير الوظائف للاستخدام العام
window.siteUtils = {
    showNotification,
    trackUserInteraction,
    validateEmail,
    showLoadingState,
    hideLoadingState
};
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you can add AJAX code to submit the email to your server
            // For demonstration, we'll just show an alert
            
            alert(`تم اشتراكك بنجاح في النشرة البريدية. سيتم إرسال آخر التحديثات إلى ${email}`);
            newsletterForm.reset();
        });
    }
      // Book search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchQuery = searchBox.querySelector('input').value.trim();
            
            if (searchQuery) {
                // Create base URL for search
                let baseUrl = '';
                
                // Determine current level
                const currentPath = window.location.pathname;
                if (currentPath.includes('/secondary/') || currentPath.includes('/primary/') || currentPath.includes('/preparatory/')) {
                    if (currentPath.split('/').length > 3) {
                        baseUrl = '../../search-results.html';
                    } else {
                        baseUrl = '../search-results.html';
                    }
                } else {
                    baseUrl = 'search-results.html';
                }
                
                // Redirect to search page with query
                window.location.href = `${baseUrl}?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
    
    // Book download functionality
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const bookTitle = this.closest('.book-card').querySelector('h3').textContent;
            
            // Here you would typically initiate a download
            // For demonstration, we'll just show an alert
            
            alert(`جاري تحميل كتاب: ${bookTitle}`);
        });
    });
});

// Function to update active navigation link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150 && 
            window.pageYOffset < sectionTop + sectionHeight - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}` || (!currentSection && href === '#')) {
            link.classList.add('active');
        }
    });
}

// Add animation to elements when they come into view
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.category-card, .book-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// Create a simple modal for book previews (placeholder functionality)
function createBookPreviewModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="book-preview">
                <h2>عنوان الكتاب</h2>
                <div class="book-details">
                    <div class="book-preview-image">
                        <img src="https://via.placeholder.com/300x450" alt="صورة الكتاب">
                    </div>
                    <div class="book-preview-info">
                        <p><strong>المؤلف:</strong> <span id="author-name"></span></p>
                        <p><strong>التصنيف:</strong> <span id="book-category"></span></p>
                        <p><strong>تاريخ النشر:</strong> <span id="publish-date"></span></p>
                        <p><strong>عدد الصفحات:</strong> <span id="page-count"></span></p>
                        <div class="book-rating">
                            <strong>التقييم:</strong> 
                            <div class="stars"></div>
                        </div>
                    </div>
                </div>
                <div class="book-description">
                    <h3>نبذة عن الكتاب</h3>
                    <p id="book-description-text"></p>
                </div>
                <div class="book-actions">
                    <button class="btn">تحميل الكتاب</button>
                    <button class="btn-small">إضافة إلى المفضلة</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

// Add book preview functionality (to be implemented when needed)
function showBookPreview(bookData) {
    const modal = document.querySelector('.modal') || createBookPreviewModal();
    
    // Fill in book details
    modal.querySelector('h2').textContent = bookData.title;
    modal.querySelector('#author-name').textContent = bookData.author;
    modal.querySelector('#book-category').textContent = bookData.category;
    modal.querySelector('#publish-date').textContent = bookData.publishDate;
    modal.querySelector('#page-count').textContent = bookData.pageCount;
    modal.querySelector('#book-description-text').textContent = bookData.description;
    
    // Set rating stars
    const starsContainer = modal.querySelector('.stars');
    starsContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = i <= bookData.rating ? 
            '<i class="fas fa-star"></i>' : 
            '<i class="far fa-star"></i>';
        starsContainer.appendChild(star);
    }
    
    // Set book cover image
    modal.querySelector('.book-preview-image img').src = bookData.coverImage;
    
    // Display the modal
    modal.style.display = 'block';
}

// Example data for future feature implementation
const sampleBooks = [
    {
        id: 1,
        title: 'الإنسان يبحث عن معنى',
        author: 'فيكتور فرانكل',
        category: 'تطوير الذات',
        publishDate: '2020-05-15',
        pageCount: 168,
        rating: 5,
        coverImage: 'https://via.placeholder.com/300x450/3498db/ffffff?text=كتاب+1',
        description: 'يروي فيكتور فرانكل في هذا الكتاب تجربته الشخصية في معسكرات الاعتقال النازية، ويشرح نظريته في العلاج بالمعنى. كتاب مؤثر يتناول معنى الحياة والبحث عن الهدف رغم المعاناة.'
    },
    {
        id: 2,
        title: 'فن اللامبالاة',
        author: 'مارك مانسون',
        category: 'تطوير الذات',
        publishDate: '2019-08-20',
        pageCount: 224,
        rating: 4,
        coverImage: 'https://via.placeholder.com/300x450/e74c3c/ffffff?text=كتاب+2',
        description: 'كتاب يقدم نهجًا مختلفًا للنظر إلى الحياة، حيث يركز على اختيار ما يهمك حقًا والتخلي عن القلق بشأن الأمور التي لا تستحق اهتمامك.'
    }
];
