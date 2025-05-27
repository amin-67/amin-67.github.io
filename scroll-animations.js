/**
 * Scroll Animations & Enhanced Interactions - تأثيرات التمرير والتفاعلات المحسنة
 * Features: Scroll reveal animations, enhanced user interactions, smooth scrolling
 */

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupInteractiveElements();
        this.setupScrollToTop();
        this.initializeAnimations();
    }

    setupIntersectionObserver() {
        if (!window.IntersectionObserver) {
            // Fallback for older browsers
            this.showAllElements();
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.observeElements();
    }

    observeElements() {
        // Find all elements with animation classes
        const animationClasses = [
            '.fade-in-up',
            '.scale-in',
            '.fade-in-left',
            '.fade-in-right'
        ];

        animationClasses.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(element => {
                this.observer.observe(element);
                this.animatedElements.push(element);
            });
        });
    }

    animateElement(element) {
        // Add stagger effect for multiple elements in the same container
        const container = element.closest('.stages-container, .categories-container, .features-container');
        if (container) {
            const siblings = container.querySelectorAll('.scale-in, .fade-in-up');
            let delay = 0;
            
            siblings.forEach((sibling, index) => {
                if (sibling === element || sibling.classList.contains('visible')) return;
                
                setTimeout(() => {
                    sibling.classList.add('visible');
                }, delay);
                
                delay += 100; // 100ms stagger between elements
            });
        } else {
            element.classList.add('visible');
        }
    }

    showAllElements() {
        // Fallback for browsers without IntersectionObserver
        this.animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    this.smoothScrollToElement(targetElement);
                }
            });
        });
    }

    smoothScrollToElement(element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupInteractiveElements() {
        // Enhanced hover effects for cards
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
        this.setupParallaxEffects();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.stage-card, .category-card, .feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn, .btn-small, .grade-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
                button.style.transition = 'all 0.3s ease';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });
    }

    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.title = 'العودة للأعلى';
        
        // Add styles
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2563eb, #1e40af);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.transform = 'translateY(100px)';
            }
        });
        
        // Click handler
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(0) scale(1.1)';
            scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        });
    }

    initializeAnimations() {
        // Add loading animation for the page
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loaded');
        });

        // Progressive image loading
        this.setupProgressiveImageLoading();
    }

    setupProgressiveImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
}

// Enhanced User Interactions
class EnhancedInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupRatingSystem();
        this.setupBookmarkSystem();
        this.setupShareFunctionality();
        this.setupTooltips();
        this.setupKeyboardNavigation();
    }

    setupRatingSystem() {
        // Add rating functionality to cards
        const cards = document.querySelectorAll('.category-card, .stage-card');
        
        cards.forEach(card => {
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating-container';
            ratingContainer.innerHTML = `
                <div class="stars">
                    ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}">★</span>`).join('')}
                </div>
                <span class="rating-text">قيم هذا القسم</span>
            `;
            
            card.appendChild(ratingContainer);
            
            // Handle star clicks
            const stars = ratingContainer.querySelectorAll('.star');
            const ratingText = ratingContainer.querySelector('.rating-text');
            
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.dataset.rating);
                    this.setRating(stars, rating);
                    ratingText.textContent = `تم التقييم: ${rating} نجوم`;
                    this.saveRating(card, rating);
                });
                
                star.addEventListener('mouseenter', () => {
                    const rating = parseInt(star.dataset.rating);
                    this.highlightStars(stars, rating);
                });
            });
            
            ratingContainer.addEventListener('mouseleave', () => {
                const savedRating = this.getSavedRating(card);
                this.setRating(stars, savedRating);
            });
        });
    }

    setRating(stars, rating) {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    highlightStars(stars, rating) {
        stars.forEach((star, index) => {
            star.classList.toggle('hover', index < rating);
        });
    }

    saveRating(card, rating) {
        const cardId = card.querySelector('h3').textContent;
        localStorage.setItem(`rating_${cardId}`, rating);
    }

    getSavedRating(card) {
        const cardId = card.querySelector('h3').textContent;
        return parseInt(localStorage.getItem(`rating_${cardId}`)) || 0;
    }

    setupBookmarkSystem() {
        // Add bookmark functionality
        const cards = document.querySelectorAll('.category-card, .stage-card');
        
        cards.forEach(card => {
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            bookmarkBtn.title = 'إضافة للمفضلة';
            
            card.style.position = 'relative';
            card.appendChild(bookmarkBtn);
            
            // Check if already bookmarked
            const cardId = card.querySelector('h3').textContent;
            if (this.isBookmarked(cardId)) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
                bookmarkBtn.title = 'إزالة من المفضلة';
            }
            
            bookmarkBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleBookmark(cardId, bookmarkBtn);
            });
        });
    }

    isBookmarked(cardId) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        return bookmarks.includes(cardId);
    }

    toggleBookmark(cardId, button) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        if (bookmarks.includes(cardId)) {
            bookmarks = bookmarks.filter(id => id !== cardId);
            button.classList.remove('bookmarked');
            button.innerHTML = '<i class="far fa-bookmark"></i>';
            button.title = 'إضافة للمفضلة';
            this.showToast('تم إزالة القسم من المفضلة');
        } else {
            bookmarks.push(cardId);
            button.classList.add('bookmarked');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            button.title = 'إزالة من المفضلة';
            this.showToast('تم إضافة القسم للمفضلة');
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    setupShareFunctionality() {
        // Add share buttons to cards
        const cards = document.querySelectorAll('.category-card, .stage-card');
        
        cards.forEach(card => {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.title = 'مشاركة';
            
            card.appendChild(shareBtn);
            
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.shareContent(card);
            });
        });
    }

    shareContent(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: `المتميزون - ${title}`,
                text: description,
                url: url
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('تم نسخ الرابط للحافظة');
            });
        }
    }

    setupTooltips() {
        // Add tooltips for interactive elements
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.title);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.classList.add('visible'), 10);
    }

    hideTooltip() {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.search-modal.show, .auth-modal.show');
                if (modal) {
                    modal.classList.remove('show');
                }
            }
            
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchModal = document.getElementById('advanced-search-modal');
                if (searchModal) {
                    searchModal.classList.add('show');
                    const searchInput = searchModal.querySelector('#modal-search-input');
                    if (searchInput) searchInput.focus();
                }
            }
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        const container = document.getElementById('toast-container') || document.body;
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new EnhancedInteractions();
    
    // Add loading state
    document.body.classList.add('loaded');
});

// Performance optimization
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
