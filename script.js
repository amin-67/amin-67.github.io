document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize active link highlighting
    updateActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        updateActiveLink();
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you can add AJAX code to submit the form data to your server
            // For demonstration, we'll just show an alert
            
            alert(`شكرًا ${name} على تواصلك معنا. سنرد عليك في أقرب وقت ممكن.`);
            contactForm.reset();
        });
    }
    
    // Handle newsletter form submission
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
