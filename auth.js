// Authentication, Favorites & Downloads System
document.addEventListener('DOMContentLoaded', function() {
  // Authentication Modal Elements
  const authTrigger = document.getElementById('auth-trigger');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  // User Menu Elements
  const userMenu = document.getElementById('user-menu');
  const userDropdown = document.getElementById('user-dropdown');
  
  // Favorites System
  const favoriteButtons = document.querySelectorAll('.btn-favorite');
  
  // Download System
  const downloadButtons = document.querySelectorAll('.btn-download, .btn-download-large');
  
  // Demo user state (in a real application, this would be managed with a backend)
  let isLoggedIn = false;
  let currentUser = null;
  let favorites = [];
  let downloads = [];
    // Check local storage for user data
  function loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      isLoggedIn = true;
      currentUser = parsedData.user;
      favorites = parsedData.favorites || [];
      downloads = parsedData.downloads || [];
      updateUI();
    }
  }
  
  // Save user data to local storage
  function saveUserData() {
    const userData = {
      user: currentUser,
      favorites: favorites,
      downloads: downloads
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
  // Update UI based on authentication state
  function updateUI() {
    // Update header
    if (authTrigger) {
      if (isLoggedIn) {
        authTrigger.style.display = 'none';
        if (userMenu) {
          userMenu.style.display = 'block';
          const userNameElement = userMenu.querySelector('.user-name');
          if (userNameElement && currentUser) {
            userNameElement.textContent = currentUser.name;
          }
        }
      } else {
        authTrigger.style.display = 'block';
        if (userMenu) {
          userMenu.style.display = 'none';
        }
      }
    }
    
    // Update favorite buttons
    updateFavoriteButtons();
  }
  
  // Update favorite buttons state
  function updateFavoriteButtons() {
    if (!favoriteButtons) return;
    
    favoriteButtons.forEach(button => {
      const bookId = button.dataset.bookId;
      if (favorites.includes(bookId)) {
        button.classList.add('active');
        button.querySelector('i').className = 'fas fa-heart';
        button.querySelector('span').textContent = 'في المفضلة';
      } else {
        button.classList.remove('active');
        button.querySelector('i').className = 'far fa-heart';
        button.querySelector('span').textContent = 'إضافة للمفضلة';
      }
    });
  }
  
  // Toggle authentication modal
  if (authTrigger) {
    authTrigger.addEventListener('click', function() {
      authModal.style.display = 'flex';
    });
  }
  
  if (authClose) {
    authClose.addEventListener('click', function() {
      authModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  if (authModal) {
    authModal.addEventListener('click', function(e) {
      if (e.target === this) {
        authModal.style.display = 'none';
      }
    });
  }
  
  // Switch between login and register tabs
  if (loginTab && registerTab) {
    loginTab.addEventListener('click', function() {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });
    
    registerTab.addEventListener('click', function() {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    });
  }
  
  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Demo login (in a real app, this would call an API)
      const email = document.getElementById('login-email').value;
      const name = email.split('@')[0]; // Use part of email as name for demo
      
      // Set user data
      currentUser = {
        name: name,
        email: email,
        avatar: '../../../images/avatars/default-avatar.jpg'
      };
      
      isLoggedIn = true;
      
      // Save to local storage
      saveUserData();
      
      // Update UI
      updateUI();
      
      // Close modal
      authModal.style.display = 'none';
      
      // Show success message
      alert('تم تسجيل الدخول بنجاح!');
    });
  }
  
  // Register form submission
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Demo registration (in a real app, this would call an API)
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      
      // Set user data
      currentUser = {
        name: name,
        email: email,
        avatar: '../../../images/avatars/default-avatar.jpg'
      };
      
      isLoggedIn = true;
      
      // Save to local storage
      saveUserData();
      
      // Update UI
      updateUI();
      
      // Close modal
      authModal.style.display = 'none';
      
      // Show success message
      alert('تم إنشاء الحساب بنجاح!');
    });
  }
  
  // User menu dropdown toggle
  if (userMenu) {
    userMenu.addEventListener('click', function() {
      userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
      if (!userMenu.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });
  }
  
  // Logout functionality
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      isLoggedIn = false;
      currentUser = null;
      favorites = [];
      
      // Remove from local storage
      localStorage.removeItem('userData');
      
      // Update UI
      updateUI();
      
      // Close dropdown
      userDropdown.classList.remove('active');
    });
  }
  
  // Favorite button functionality
  favoriteButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (!isLoggedIn) {
        // Show login modal if not logged in
        authModal.style.display = 'flex';
        return;
      }
      
      const bookId = this.dataset.bookId;
      
      if (favorites.includes(bookId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== bookId);
        this.classList.remove('active');
        this.querySelector('i').className = 'far fa-heart';
        this.querySelector('span').textContent = 'إضافة للمفضلة';
      } else {
        // Add to favorites
        favorites.push(bookId);
        this.classList.add('active');
        this.classList.add('animate');
        this.querySelector('i').className = 'fas fa-heart';
        this.querySelector('span').textContent = 'في المفضلة';
        
        // Remove animation class after animation completes
        setTimeout(() => {
          this.classList.remove('animate');
        }, 300);
      }
      
      // Save updated favorites
      saveUserData();
    });
  });
  
  // Download buttons functionality
  downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // If user isn't logged in, show login modal
      if (!isLoggedIn) {
        authModal.style.display = 'flex';
        return;
      }
      
      // Get book information from the nearest book card or book header section
      let bookContainer = this.closest('.book-card') || this.closest('.book-header');
      if (!bookContainer) {
        bookContainer = this.closest('.download-card') || document.querySelector('.book-header');
      }
      
      // Get book ID either from the button itself or from a favorite button in the same container
      let bookId = this.dataset.bookId;
      if (!bookId) {
        const favoriteButton = bookContainer.querySelector('.btn-favorite');
        if (favoriteButton) {
          bookId = favoriteButton.dataset.bookId;
        }
      }
      
      // If still no bookId, extract from the current URL
      if (!bookId && window.location.pathname.includes('/')) {
        const pathParts = window.location.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];
        bookId = fileName.replace('.html', '');
      }
      
      if (!bookId) {
        console.error('Could not identify book ID');
        alert('حدث خطأ أثناء تحميل الكتاب. يرجى المحاولة مرة أخرى.');
        return;
      }
      
      // Get book title
      let bookTitle = '';
      const titleElement = bookContainer.querySelector('h1') || bookContainer.querySelector('h3');
      if (titleElement) {
        bookTitle = titleElement.textContent.trim();
      }
      
      // Get book subject from URL or metadata
      let bookSubject = '';
      if (window.location.pathname.includes('/')) {
        const pathParts = window.location.pathname.split('/');
        for (let i = 0; i < pathParts.length; i++) {
          if (['arabic', 'english', 'math', 'religion', 'discover', 'science'].includes(pathParts[i])) {
            bookSubject = pathParts[i];
            break;
          }
        }
      }
      
      // Get book stage from URL
      let bookStage = '';
      if (window.location.pathname.includes('primary')) {
        bookStage = 'primary';
      } else if (window.location.pathname.includes('prep')) {
        bookStage = 'prep';
      } else if (window.location.pathname.includes('secondary')) {
        bookStage = 'secondary';
      }
      
      // Get book publisher
      let bookPublisher = '';
      const publisherElement = bookContainer.querySelector('.publisher') || 
                              bookContainer.querySelector('.meta-item:nth-child(3) span');
      if (publisherElement) {
        bookPublisher = publisherElement.textContent.trim();
      }
      
      // Get book size
      let bookSize = '';
      const sizeElement = bookContainer.querySelector('.spec-item:nth-child(2) .value') || 
                         document.querySelector('.detail-item:nth-child(2) span');
      if (sizeElement) {
        bookSize = sizeElement.textContent.trim().replace('حجم الملف: ', '');
      } else {
        bookSize = Math.floor(Math.random() * 20 + 5) + ' ميجابايت'; // Fallback random size
      }
      
      // Create download object
      const download = {
        id: bookId,
        title: bookTitle,
        subject: bookSubject,
        stage: bookStage,
        publisher: bookPublisher,
        size: bookSize,
        date: new Date().toISOString(),
        path: window.location.pathname,
        coverPath: `images/books/${bookStage || 'primary'}/grade1/${bookId}.jpg`,
        downloadLink: `#download-${bookId}`
      };
      
      // Check if book is already downloaded
      const existingDownloadIndex = downloads.findIndex(d => d.id === bookId);
      if (existingDownloadIndex !== -1) {
        // Update the existing download with current date
        downloads[existingDownloadIndex].date = download.date;
      } else {
        // Add new download
        downloads.push(download);
      }
      
      // Save to local storage
      saveUserData();
      
      // Show success message
      alert(`تم تحميل كتاب ${bookTitle} بنجاح!`);
      
      // Simulate download for demo purposes
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${bookId}.pdf`;
      link.click();
    });
  });

  // Load user data when page loads
  loadUserData();
});
