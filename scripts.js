// Main JavaScript file for educational website
console.log('Educational website scripts loaded');

// Image fallback handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle missing images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create fallback div
            const fallback = document.createElement('div');
            fallback.className = 'book-image-fallback';
            
            // Determine subject from path
            const src = this.src || '';
            let subjectClass = '';
            if (src.includes('arabic')) subjectClass = 'arabic-fallback';
            else if (src.includes('math')) subjectClass = 'math-fallback';
            else if (src.includes('english')) subjectClass = 'english-fallback';
            else if (src.includes('religion')) subjectClass = 'religion-fallback';
            else if (src.includes('discover')) subjectClass = 'discover-fallback';
            else if (src.includes('science')) subjectClass = 'science-fallback';
            else if (src.includes('social')) subjectClass = 'social-fallback';
            
            fallback.classList.add(subjectClass);
            
            // Get book name from alt text or src
            const bookName = this.alt || this.src.split('/').pop().replace(/\.(jpg|png|jpeg)$/i, '');
            fallback.innerHTML = `<div class="fallback-text">صورة الكتاب<br>${bookName}</div>`;
            
            // Replace image with fallback
            this.parentNode.replaceChild(fallback, this);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Download button analytics (placeholder)
    document.querySelectorAll('.download-btn-primary, .download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const bookTitle = document.querySelector('h1')?.textContent || 'Unknown Book';
            console.log('Download clicked:', bookTitle);
            
            // Show download notification
            showNotification('سيتم بدء التحميل قريباً...', 'success');
        });
    });
    
    // Search functionality (basic)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const cards = document.querySelectorAll('.book-card, .subject-card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-error {
            background: #f44336;
        }
        
        .notification-warning {
            background: #ff9800;
        }
        
        .notification-info {
            background: #2196F3;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization - Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Debug helper
window.debugWebsite = {
    checkImages: function() {
        const images = document.querySelectorAll('img');
        const broken = [];
        images.forEach(img => {
            if (img.naturalWidth === 0) {
                broken.push(img.src);
            }
        });
        console.log('Broken images:', broken);
        return broken;
    },
    
    checkLinks: function() {
        const links = document.querySelectorAll('a[href]');
        const internal = [];
        links.forEach(link => {
            if (link.href.includes(window.location.hostname)) {
                internal.push(link.href);
            }
        });
        console.log('Internal links:', internal);
        return internal;
    }
};
