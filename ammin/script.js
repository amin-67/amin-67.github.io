// تأثيرات JavaScript للموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // تأثير العد التصاعدي للإحصائيات
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // تشغيل العد التصاعدي عند ظهور العناصر
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    // مراقبة عناصر الإحصائيات
    document.querySelectorAll('.stat-number').forEach(function(el) {
        observer.observe(el);
    });

    // تأثير التمرير السلس للبطاقات
    const cards = document.querySelectorAll('.content-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // تأثير الجسيمات المتحركة
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleFloat 3s linear infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(function() {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    // إنشاء جسيمات بشكل دوري
    setInterval(createParticle, 300);

    // إنشاء جسيمات خلفية متحركة
    function createParticles() {
        const container = document.getElementById('particles-js');
        const particleCount = Math.min(window.innerWidth / 10, 50); // عدد الجسيمات مناسب لحجم الشاشة
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // تحديد موقع عشوائي
                const posX = Math.random() * window.innerWidth;
                const size = Math.random() * 4 + 2; // حجم متغير للجسيمات
                const duration = Math.random() * 20 + 10; // مدة التحريك
                const delay = Math.random() * 5;
                
                particle.style.cssText = `
                    left: ${posX}px;
                    bottom: -10px;
                    width: ${size}px;
                    height: ${size}px;
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                    background-color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
                `;
                
                container.appendChild(particle);
                
                // إزالة الجسيم بعد انتهاء التحريك
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, (duration + delay) * 1000);
            }, i * 200); // إنشاء الجسيمات بشكل تدريجي
        }
        
        // إنشاء دفعة جديدة من الجسيمات كل فترة
        setTimeout(createParticles, particleCount * 200 + 5000);
    }
    
    createParticles();

    // تأثير المرور على زر تليجرام
    const telegramBtn = document.querySelector('.telegram-btn');
    if (telegramBtn) {
        telegramBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        telegramBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // تأثير النقر على البطاقات
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // تأثير تتبع الماوس
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'custom-cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(newCursor);
        }
        
        const actualCursor = document.querySelector('.custom-cursor');
        actualCursor.style.left = e.clientX - 10 + 'px';
        actualCursor.style.top = e.clientY - 10 + 'px';
    });

    // إضافة تأثير تتبع المؤشر
    document.addEventListener('DOMContentLoaded', function() {
        // إنشاء عنصر متتبع المؤشر
        const cursorEffect = document.createElement('div');
        cursorEffect.classList.add('cursor-effect');
        document.body.appendChild(cursorEffect);
        
        // تحريك العنصر مع المؤشر
        document.addEventListener('mousemove', function(e) {
            cursorEffect.style.left = `${e.clientX}px`;
            cursorEffect.style.top = `${e.clientY}px`;
        });
        
        // تحديث حجم العنصر عند المرور على العناصر القابلة للنقر
        const clickableElements = document.querySelectorAll('a, button, .book-card, .image-card, .social-btn, .tag, .back-to-top, .theme-switcher');
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorEffect.style.width = '60px';
                cursorEffect.style.height = '60px';
                cursorEffect.style.borderColor = 'rgba(240, 147, 251, 0.5)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorEffect.style.width = '40px';
                cursorEffect.style.height = '40px';
                cursorEffect.style.borderColor = 'rgba(102, 126, 234, 0.5)';
            });
        });
    });

    // تأثير التمرير المتوازي
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach(function(shape, index) {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // تحسين الأداء عبر تأجيل التحميل
    function lazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    lazyLoad();    // تأثير النقر على زر التحميل
    const downloadBtn = document.getElementById('downloadBook');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', function() {
            // تأثير الانفجار عند المرور
            const explosion = document.createElement('div');
            explosion.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, #54a3ff, transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10000;
                animation: explode 0.6s ease-out forwards;
            `;
            
            document.body.appendChild(explosion);
            
            setTimeout(() => {
                if (explosion.parentNode) {
                    explosion.parentNode.removeChild(explosion);
                }
            }, 600);

            // تأثير الحركة الإضافية
            this.style.transform = 'translateY(-8px) scale(1.08)';
            
            // إضافة تأثير دوران الأيقونة
            const btnIcon = this.querySelector('.btn-content i');
            if (btnIcon) {
                btnIcon.style.animation = 'telegramPulse 0.6s infinite';
            }
        });
        
        downloadBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const btnIcon = this.querySelector('.btn-content i');
            if (btnIcon) {
                btnIcon.style.animation = '';
            }
        });
    }

    // تأثير معرض الصور
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            // إنشاء نافذة عرض الصور
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(10px);
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                max-width: 90%;
                max-height: 90%;
                position: relative;
            `;
            
            modalContent.innerHTML = `
                <h3>صورة ${index + 1}</h3>
                <p>هنا يمكنك إضافة الصورة الفعلية</p>
                <div style="width: 300px; height: 200px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); border-radius: 10px; margin: 20px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                    <i class="fas fa-image" style="font-size: 3rem;"></i>
                </div>
                <button onclick="this.closest('.image-modal').remove()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-top: 15px;">إغلاق</button>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    });

    // تأثير المرور على أزرار التواصل الاجتماعي
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // تأثير كتابة النص التدريجي
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // تطبيق تأثير الكتابة على العناوين
    const observer2 = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                typeWriter(entry.target, originalText, 80);
                observer2.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.content-card h2').forEach(function(h2) {
        observer2.observe(h2);
    });

    // تأثير الثلج المتساقط
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.style.cssText = `
            position: fixed;
            top: -10px;
            color: rgba(255, 255, 255, 0.8);
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * window.innerWidth}px;
            pointer-events: none;
            z-index: 1000;
            animation: snowfall ${Math.random() * 5 + 5}s linear infinite;
        `;
        
        document.body.appendChild(snowflake);
        
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 10000);
    }

    // إنشاء ثلج متساقط كل فترة
    setInterval(createSnowflake, 2000);

    // تحسين الأداء عند التمرير
    let ticking = false;
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // تأثير المرور على الهيدر
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // تأثير على الأشكال المتحركة
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // تأثير التحويم على الفوتر
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        footer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // تأثير تفاعلي للمقال
    const articleImage = document.querySelector('.article-image');
    if (articleImage) {
        articleImage.addEventListener('click', function() {
            alert('يمكنك إضافة صورة هنا من خلال تعديل ملف HTML');
        });
    }

    // تأثير الإضاءة على العناصر المهمة في المقال
    const articleSubheadings = document.querySelectorAll('.article-subheading');
    articleSubheadings.forEach(subheading => {
        subheading.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'translateX(-5px)';
        });
        
        subheading.addEventListener('mouseleave', function() {
            this.style.color = '#2c3e50';
            this.style.transform = 'translateX(0)';
        });
    });

    // تأثير مدة القراءة التقديرية
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const text = articleContent.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 كلمة في الدقيقة تقريباً
        
        const articleIntro = document.querySelector('.article-intro');
        if (articleIntro) {
            const readingTimeElement = document.createElement('p');
            readingTimeElement.className = 'article-reading-time';
            readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> مدة القراءة: ${readingTime} دقائق`;
            articleIntro.appendChild(readingTimeElement);
        }
    }

    // تأثير تمييز النصوص المهمة
    const articleParagraphs = document.querySelectorAll('.article-paragraph');
    articleParagraphs.forEach(paragraph => {
        // البحث عن الكلمات المهمة
        const importantWords = ['الكتب الخارجية', 'المنهج', 'الطلاب', 'التفكير النقدي', 'الإبداعي'];
        
        importantWords.forEach(word => {
            if (paragraph.textContent.includes(word)) {
                const regex = new RegExp(word, 'g');
                paragraph.innerHTML = paragraph.innerHTML.replace(
                    regex, 
                    `<span class="highlighted-text">${word}</span>`
                );
            }
        });
    });

    // إضافة CSS للنصوص المميزة
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .highlighted-text {
            background: linear-gradient(to bottom, transparent 50%, rgba(102, 126, 234, 0.2) 50%);
            padding: 0 2px;
            border-radius: 2px;
            font-weight: 600;
            color: var(--primary-color);
            transition: background 0.3s;
        }
        
        .highlighted-text:hover {
            background: linear-gradient(to bottom, transparent 50%, rgba(102, 126, 234, 0.4) 50%);
        }
        
        .article-reading-time {
            color: #777;
            margin-top: 10px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .article-reading-time i {
            color: var(--accent-color);
        }
    `;
    document.head.appendChild(highlightStyle);

    // زر العودة للأعلى
    const backToTopButton = document.getElementById('backToTop');
      // إظهار وإخفاء زر العودة للأعلى وزر تغيير السمات
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
            
            const themeSwitcher = document.getElementById('themeSwitcher');
            if (themeSwitcher) {
                themeSwitcher.classList.add('visible');
            }
        } else {
            backToTopButton.classList.remove('visible');
            
            const themeSwitcher = document.getElementById('themeSwitcher');
            if (themeSwitcher) {
                themeSwitcher.classList.remove('visible');
            }
        }
    });
    
    // التمرير إلى أعلى الصفحة عند النقر
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // تأثير الانفجار عند النقر
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            animation: explode 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 600);
    });
    
    // تشغيل نافذة الترحيب
    const welcomeModal = document.getElementById('welcomeModal');
    const startExploringBtn = document.getElementById('startExploring');
    const watchTutorialBtn = document.getElementById('watchTutorial');

    // عرض نافذة الترحيب بعد انتهاء شاشة التحميل
    setTimeout(() => {
        welcomeModal.classList.add('show');
        createConfetti();
    }, 2500);

    // إغلاق نافذة الترحيب عند النقر على زر البدء
    startExploringBtn.addEventListener('click', () => {
        welcomeModal.classList.remove('show');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 500);
    });

    // تأثير الكونفيتي للترحيب
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#6366f1'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);

            // حذف الكونفيتي بعد انتهاء التأثير
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // زر مشاهدة الشرح
    watchTutorialBtn.addEventListener('click', () => {
        const tutorialVideo = {
            title: "كيفية استخدام الموقع",
            description: "شرح مبسط لكيفية تحميل الكتب والاستفادة من الموقع"
        };
        
        // هنا يمكن إضافة كود لعرض فيديو تعليمي أو توجيه المستخدم لصفحة الشرح
        alert(tutorialVideo.description);
    });
});

// إضافة CSS للجسيمات
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// إنشاء تأثير الجسيمات الخلفية
function createBackgroundParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    const particleCount = Math.min(window.innerWidth / 10, 50);
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // تحديد موقع عشوائي
            const posX = Math.random() * window.innerWidth;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                left: ${posX}px;
                bottom: -10px;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                background-color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            `;
            
            container.appendChild(particle);
            
            // إزالة الجسيم بعد انتهاء التحريك
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }, i * 200);
    }
    
    // إنشاء دفعة جديدة من الجسيمات كل فترة
    setTimeout(createBackgroundParticles, particleCount * 200 + 5000);
}

// بدء تأثير الجسيمات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createBackgroundParticles, 2500);
});

// تفعيل زر تغيير السمات
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (!themeSwitcher) return;
    
    const themes = [
        { name: 'default', primary: '#667eea', secondary: '#764ba2', accent: '#f093fb' },
        { name: 'blue', primary: '#1a73e8', secondary: '#4285f4', accent: '#34a853' },
        { name: 'green', primary: '#00796b', secondary: '#009688', accent: '#4caf50' },
        { name: 'orange', primary: '#ff5722', secondary: '#ff9800', accent: '#ffeb3b' }
    ];
    
    let currentThemeIndex = 0;
    
    themeSwitcher.addEventListener('click', () => {
        // تحديث مؤشر السمة
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        
        // تطبيق السمة الجديدة
        document.documentElement.style.setProperty('--primary-color', newTheme.primary);
        document.documentElement.style.setProperty('--secondary-color', newTheme.secondary);
        document.documentElement.style.setProperty('--accent-color', newTheme.accent);
        
        // تأثير لطيف عند تغيير السمة
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100vw';
        ripple.style.height = '100vh';
        ripple.style.backgroundColor = newTheme.primary;
        ripple.style.opacity = '0.1';
        ripple.style.zIndex = '-1';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0.2';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(3)';
            ripple.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 1000);
        }, 50);
    });
});

// وظائف البحث
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    // تعريف بيانات الكتب في الموقع
    const booksData = [
        { 
            title: "كتاب الرياضيات للصف الأول الإبتدائي", 
            category: "ابتدائي", 
            subject: "رياضيات",
            link: "https://t.me/aminsayed_books/elementary1"
        },
        { 
            title: "كتاب العلوم للصف الثاني الإبتدائي", 
            category: "ابتدائي", 
            subject: "علوم",
            link: "https://t.me/aminsayed_books/elementary2"
        },
        { 
            title: "كتاب اللغة العربية للصف الثالث الإبتدائي", 
            category: "ابتدائي", 
            subject: "لغة عربية",
            link: "https://t.me/aminsayed_books/elementary3"
        },
        { 
            title: "كتاب اللغة الإنجليزية للصف الرابع الإبتدائي", 
            category: "ابتدائي", 
            subject: "لغة إنجليزية",
            link: "https://t.me/aminsayed_books/elementary4"
        },
        { 
            title: "كتاب الدراسات الإجتماعية للصف الخامس الإبتدائي", 
            category: "ابتدائي", 
            subject: "دراسات اجتماعية",
            link: "https://t.me/aminsayed_books/elementary5"
        },
        { 
            title: "كتاب التربية الدينية للصف السادس الإبتدائي", 
            category: "ابتدائي", 
            subject: "تربية دينية",
            link: "https://t.me/aminsayed_books/elementary6"
        },
        { 
            title: "كتاب الرياضيات للصف الأول الإعدادي", 
            category: "إعدادي", 
            subject: "رياضيات",
            link: "https://t.me/aminsayed_books/middle1"
        },
        { 
            title: "كتاب العلوم للصف الثاني الإعدادي", 
            category: "إعدادي", 
            subject: "علوم",
            link: "https://t.me/aminsayed_books/middle2"
        },
        { 
            title: "كتاب اللغة العربية للصف الثالث الإعدادي", 
            category: "إعدادي", 
            subject: "لغة عربية",
            link: "https://t.me/aminsayed_books/middle3"
        },
        { 
            title: "كتاب الفيزياء للصف الأول الثانوي", 
            category: "ثانوي", 
            subject: "فيزياء",
            link: "https://t.me/aminsayed_books/high1"
        },
        { 
            title: "كتاب الكيمياء للصف الثاني الثانوي", 
            category: "ثانوي", 
            subject: "كيمياء",
            link: "https://t.me/aminsayed_books/high2"
        },
        { 
            title: "كتاب الأحياء للصف الثالث الثانوي", 
            category: "ثانوي", 
            subject: "أحياء",
            link: "https://t.me/aminsayed_books/high3"
        }
    ];

    // إنشاء كونتينر نتائج البحث
    let searchResultsContainer;
    function createSearchResults() {
        if (!document.querySelector('.search-results')) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.className = 'search-results';
            document.querySelector('.search-box').appendChild(searchResultsContainer);
        } else {
            searchResultsContainer = document.querySelector('.search-results');
        }
    }
    
    createSearchResults();

    // وظيفة البحث في البيانات
    function searchBooks(query) {
        if (!query) return [];
        
        query = query.toLowerCase().trim();
        return booksData.filter(book => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.category.toLowerCase().includes(query) ||
                book.subject.toLowerCase().includes(query)
            );
        });
    }

    // عرض نتائج البحث
    function displaySearchResults(results) {
        searchResultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<div class="search-no-results">لا توجد نتائج مطابقة للبحث</div>';
            searchResultsContainer.classList.add('show');
            return;
        }
        
        results.forEach(book => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${book.title}</div>
                    <div class="search-result-description">${book.subject} - ${book.category}</div>
                </div>
            `;
            
            // فتح رابط الكتاب عند النقر
            resultItem.addEventListener('click', function() {
                window.open(book.link, '_blank');
            });
            
            searchResultsContainer.appendChild(resultItem);
        });
        
        searchResultsContainer.classList.add('show');
    }

    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(event) {
        const isClickInside = searchInput.contains(event.target) || 
                              searchBtn.contains(event.target) || 
                              searchResultsContainer.contains(event.target);
        
        if (!isClickInside) {
            searchResultsContainer.classList.remove('show');
        }
    });

    // معالجة حدث البحث
    function handleSearch() {
        const query = searchInput.value;
        const results = searchBooks(query);
        displaySearchResults(results);
    }

    // إضافة مستمعي الأحداث
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // اقتراحات البحث عند الكتابة
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            const results = searchBooks(query);
            displaySearchResults(results);
        } else {
            searchResultsContainer.classList.remove('show');
        }
    });
}

// تشغيل كاروسل الكتب المضافة حديثاً
function initBooksCarousel() {
    const carousel = document.getElementById('booksCarousel');
    const prevBtn = document.getElementById('prevBook');
    const nextBtn = document.getElementById('nextBook');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = document.querySelectorAll('.book-slide');
    const totalSlides = slides.length;
    
    // وظيفة الانتقال إلى شريحة محددة
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        const translateX = -currentIndex * 100 + '%';
        carousel.style.transform = 'translateX(' + translateX + ')';
    }
    
    // إضافة مستمعي الأحداث للأزرار
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // التمرير التلقائي كل 5 ثواني
    let autoplay = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // إيقاف التمرير التلقائي عند التفاعل
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });
    
    // إعادة تشغيل التمرير التلقائي عند إنهاء التفاعل
    carousel.addEventListener('mouseleave', () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // دعم اللمس للهواتف والأجهزة اللوحية
    let startX, endX;
    const minSwipeDistance = 50;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const distance = startX - endX;
        
        if (Math.abs(distance) >= minSwipeDistance) {
            if (distance > 0) {
                // سحب لليسار (التالي)
                goToSlide(currentIndex + 1);
            } else {
                // سحب لليمين (السابق)
                goToSlide(currentIndex - 1);
            }
        }
    });
}

// تهيئة قسم التقييمات
function initReviews() {
    const addReviewBtn = document.getElementById('addReviewBtn');
    if (!addReviewBtn) return;
    
    // عرض نموذج التقييم
    addReviewBtn.addEventListener('click', function() {
        showReviewModal();
    });
    
    // إنشاء وعرض نموذج التقييم
    function showReviewModal() {
        // إنشاء عناصر النموذج
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        
        modal.innerHTML = `
            <div class="review-modal-content">
                <div class="review-modal-header">
                    <h3>أضف تقييمك للكتاب</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="review-modal-body">
                    <div class="review-form">
                        <div class="form-group">
                            <label for="reviewerName">الاسم</label>
                            <input type="text" id="reviewerName" placeholder="أدخل اسمك الكريم" required>
                        </div>
                        <div class="form-group">
                            <label>التقييم</label>
                            <div class="star-rating">
                                <i class="far fa-star star-btn" data-rating="1"></i>
                                <i class="far fa-star star-btn" data-rating="2"></i>
                                <i class="far fa-star star-btn" data-rating="3"></i>
                                <i class="far fa-star star-btn" data-rating="4"></i>
                                <i class="far fa-star star-btn" data-rating="5"></i>
                                <span class="rating-text"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="bookTitle">الكتاب</label>
                            <select id="bookTitle" required>
                                <option value="">اختر الكتاب</option>
                                <option value="الرياضيات للثانوية العامة">الرياضيات للثانوية العامة</option>
                                <option value="العلوم للمرحلة الإعدادية">العلوم للمرحلة الإعدادية</option>
                                <option value="اللغة العربية للمرحلة الابتدائية">اللغة العربية للمرحلة الابتدائية</option>
                                <option value="الفيزياء للثانوية العامة">الفيزياء للثانوية العامة</option>
                                <option value="الكيمياء للثانوية العامة">الكيمياء للثانوية العامة</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="reviewText">التقييم</label>
                            <textarea id="reviewText" rows="4" placeholder="اكتب تقييمك هنا..." required></textarea>
                        </div>
                    </div>
                </div>
                <div class="review-modal-footer">
                    <button class="cancel-btn">إلغاء</button>
                    <button class="submit-review-btn">إرسال التقييم</button>
                </div>
            </div>
        `;
        
        // إضافة النموذج إلى الصفحة
        document.body.appendChild(modal);
        
        // إظهار النموذج مع تأثير حركي
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // زر الإغلاق
        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', closeReviewModal);
        
        // زر الإلغاء
        const cancelBtn = modal.querySelector('.cancel-btn');
        cancelBtn.addEventListener('click', closeReviewModal);
        
        // أزرار النجوم للتقييم
        const starBtns = modal.querySelectorAll('.star-btn');
        const ratingText = modal.querySelector('.rating-text');
        let selectedRating = 0;
        
        starBtns.forEach(star => {
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                updateStars(rating);
            });
            
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-rating'));
                updateRatingText(selectedRating);
            });
        });
        
        const starContainer = modal.querySelector('.star-rating');
        starContainer.addEventListener('mouseleave', function() {
            updateStars(selectedRating);
        });
        
        function updateStars(rating) {
            starBtns.forEach((star, index) => {
                if (index < rating) {
                    star.className = 'fas fa-star star-btn';
                } else {
                    star.className = 'far fa-star star-btn';
                }
            });
        }
        
        function updateRatingText(rating) {
            const ratingTexts = ['', 'سيء', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];
            ratingText.textContent = ratingTexts[rating];
        }
        
        // زر إرسال التقييم
        const submitBtn = modal.querySelector('.submit-review-btn');
        submitBtn.addEventListener('click', function() {
            const name = modal.querySelector('#reviewerName').value;
            const book = modal.querySelector('#bookTitle').value;
            const review = modal.querySelector('#reviewText').value;
            
            if (!name || !book || !review || selectedRating === 0) {
                showValidationError();
                return;
            }
            
            addNewReview({
                name,
                rating: selectedRating,
                book,
                review
            });
            
            closeReviewModal();
            showThankYouMessage();
        });
        
        // إغلاق النموذج عند النقر خارجه
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeReviewModal();
            }
        });
        
        function closeReviewModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        function showValidationError() {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'validation-error';
            errorMsg.textContent = 'يرجى ملء جميع الحقول وتحديد التقييم';
            
            const existingError = modal.querySelector('.validation-error');
            if (existingError) {
                existingError.remove();
            }
            
            const modalFooter = modal.querySelector('.review-modal-footer');
            modalFooter.prepend(errorMsg);
            
            setTimeout(() => {
                errorMsg.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                errorMsg.classList.remove('show');
                setTimeout(() => {
                    errorMsg.remove();
                }, 300);
            }, 3000);
        }
    }
    
    // إضافة تقييم جديد للقائمة
    function addNewReview(reviewData) {
        const reviewsList = document.querySelector('.reviews-list');
        if (!reviewsList) return;
        
        const randomColor = ['#764ba2', '#11998e', '#4facfe', '#8e2de2'][Math.floor(Math.random() * 4)];
        const initials = reviewData.name.split(' ').map(n => n[0]).join('');
        
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-img" style="background-color: ${randomColor}">
                    <span>${initials}</span>
                </div>
                <div class="reviewer-info">
                    <div class="reviewer-name">${reviewData.name}</div>
                    <div class="review-date">23 مايو 2025</div>
                </div>
                <div class="review-stars">
                    ${Array(5).fill('').map((_, i) => 
                        i < reviewData.rating ? 
                            '<i class="fas fa-star"></i>' : 
                            '<i class="far fa-star"></i>'
                    ).join('')}
                </div>
            </div>
            <div class="review-content">
                <p>${reviewData.review}</p>
            </div>
            <div class="review-tags">
                <span class="review-tag">${reviewData.book}</span>
                <span class="review-tag">تقييم جديد</span>
            </div>
        `;
        
        // إضافة التقييم الجديد في أعلى القائمة مع تأثير حركي
        reviewsList.prepend(reviewCard);
        reviewCard.style.opacity = '0';
        reviewCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            reviewCard.style.transition = 'all 0.5s ease';
            reviewCard.style.opacity = '1';
            reviewCard.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // إظهار رسالة شكر بعد إرسال التقييم
    function showThankYouMessage() {
        const thankYouMsg = document.createElement('div');
        thankYouMsg.className = 'thank-you-message';
        thankYouMsg.innerHTML = `
            <div class="thank-you-content">
                <div class="thank-you-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>شكراً لك!</h3>
                <p>تم إرسال تقييمك بنجاح. نُقدر مشاركتك ورأيك.</p>
                <button class="close-thank-you-btn">إغلاق</button>
            </div>
        `;
        
        document.body.appendChild(thankYouMsg);
        
        setTimeout(() => {
            thankYouMsg.classList.add('active');
        }, 10);
        
        const closeBtn = thankYouMsg.querySelector('.close-thank-you-btn');
        closeBtn.addEventListener('click', function() {
            thankYouMsg.classList.remove('active');
            setTimeout(() => {
                thankYouMsg.remove();
            }, 300);
        });
        
        setTimeout(() => {
            thankYouMsg.classList.remove('active');
            setTimeout(() => {
                thankYouMsg.remove();
            }, 300);
        }, 5000);
    }
    
    // إظهار الرسوم البيانية للتقييمات بتأثير حركي
    const ratingFills = document.querySelectorAll('.rating-fill');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const ratingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.style.width || '0%';
                ratingObserver.unobserve(fill);
            }
        });
    }, observerOptions);
    
    ratingFills.forEach(fill => {
        fill.style.width = '0%';
        ratingObserver.observe(fill);
    });
}

// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// تأثير ظهور العناصر عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.content-card, .book-card, .image-card').forEach(el => {
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', function() {
    // الوظائف الموجودة مسبقاً
    // ...existing code...
    
    // إضافة وظيفة البحث
    initSearchFunctionality();
    
    // تهيئة كاروسل الكتب
    initBooksCarousel();
    
    // تهيئة نظام التقييمات
    initReviews();
});

// تأثيرات التمرير
function addScrollEffects() {
    const elements = document.querySelectorAll('.content-card, .book-card, .image-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// تحسين تأثيرات الأزرار
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.social-btn, .main-download, .pdf-download-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('btn-ripple');
            
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });
}

// تفعيل التأثيرات عند تحميل الصفحة
window.addEventListener('load', () => {
    addScrollEffects();
    enhanceButtonEffects();
});
