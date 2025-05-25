// Downloads System
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const downloadsContainer = document.getElementById('downloads-container');
  const noDownloadsMessage = document.querySelector('.no-downloads-message');
  const downloadHistoryTable = document.getElementById('download-history-table');
  const lastDownloadDate = document.getElementById('last-download-date');
  const totalDownloads = document.getElementById('total-downloads');
  const totalSize = document.getElementById('total-size');
  const topSubject = document.getElementById('top-subject');

  // Sort and Filter Elements
  const sortDownloads = document.getElementById('sort-downloads');
  const filterStage = document.getElementById('filter-stage');
  const filterSubject = document.getElementById('filter-subject');
  const clearFilters = document.getElementById('clear-filters');
  
  // Get user data from localStorage
  function getUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
  
  // Save user data to localStorage
  function saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }
  
  // Display downloads
  function displayDownloads() {
    const userData = getUserData();
    
    // If user is not logged in or there's no data
    if (!userData || !userData.downloads || userData.downloads.length === 0) {
      if (downloadsContainer) {
        while (downloadsContainer.firstChild && !downloadsContainer.firstChild.classList.contains('no-downloads-message')) {
          downloadsContainer.removeChild(downloadsContainer.firstChild);
        }
        if (noDownloadsMessage) {
          noDownloadsMessage.style.display = 'block';
        }
      }
      updateStats([]); // Update stats with empty array
      updateHistoryTable([]); // Update history table with empty array
      return;
    }
    
    // User has downloads, display them
    if (noDownloadsMessage) {
      noDownloadsMessage.style.display = 'none';
    }
    
    const downloads = applyFilters(userData.downloads);
    
    // Update downloads grid
    if (downloadsContainer) {
      // Clear container except no-downloads-message
      while (downloadsContainer.firstChild && !downloadsContainer.firstChild.classList.contains('no-downloads-message')) {
        downloadsContainer.removeChild(downloadsContainer.firstChild);
      }
      
      // Add download cards
      downloads.forEach(download => {
        const downloadCard = createDownloadCard(download);
        if (downloadsContainer.firstChild) {
          downloadsContainer.insertBefore(downloadCard, downloadsContainer.firstChild);
        } else {
          downloadsContainer.appendChild(downloadCard);
        }
      });
    }
    
    // Update stats and history
    updateStats(userData.downloads);
    updateHistoryTable(userData.downloads);
  }
  
  // Create a download card for the grid
  function createDownloadCard(download) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.bookId = download.id;
    
    const coverPath = download.coverPath || `images/books/primary/grade1/${download.id}.jpg`;
    const bookTitle = download.title;
    const bookPublisher = download.publisher;
    const bookRating = download.rating || '4.0';
    const downloadDate = new Date(download.date).toLocaleDateString('ar-EG');
    
    card.innerHTML = `
      <div class="book-cover">
        <img src="${coverPath}" alt="${bookTitle}">
        <div class="book-overlay">
          <a href="${download.path}" class="btn">عرض التفاصيل</a>
        </div>
      </div>
      <div class="book-details">
        <h3><a href="${download.path}">${bookTitle}</a></h3>
        <div class="book-meta">
          <span class="publisher">${bookPublisher}</span>
          <div class="rating">
            <i class="fas fa-star"></i>
            <span>${bookRating}</span>
          </div>
        </div>
        <div class="download-meta">
          <span class="download-date"><i class="fas fa-calendar-alt"></i> ${downloadDate}</span>
          <span class="file-size"><i class="fas fa-file-alt"></i> ${download.size}</span>
        </div>
        <div class="card-actions">
          <a href="${download.downloadLink || '#'}" class="btn btn-sm btn-outline">
            <i class="fas fa-download"></i> تحميل مجدداً
          </a>
          <button class="btn btn-sm btn-danger btn-remove-download" data-book-id="${download.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to remove button
    const removeBtn = card.querySelector('.btn-remove-download');
    removeBtn.addEventListener('click', function() {
      removeDownload(download.id);
    });
    
    return card;
  }
  
  // Apply filters and sorting to downloads
  function applyFilters(downloads) {
    let filtered = [...downloads];
    
    // Apply stage filter
    if (filterStage && filterStage.value !== 'all') {
      filtered = filtered.filter(download => download.stage === filterStage.value);
    }
    
    // Apply subject filter
    if (filterSubject && filterSubject.value !== 'all') {
      filtered = filtered.filter(download => download.subject === filterSubject.value);
    }
    
    // Apply sorting
    if (sortDownloads) {
      const sortValue = sortDownloads.value;
      
      switch (sortValue) {
        case 'date-desc':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'date-asc':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title, 'ar'));
          break;
        default:
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }
    
    return filtered;
  }
  
  // Update download statistics
  function updateStats(downloads) {
    if (!downloads.length) {
      if (lastDownloadDate) lastDownloadDate.textContent = '--/--/----';
      if (totalDownloads) totalDownloads.textContent = '0';
      if (totalSize) totalSize.textContent = '0 ميجابايت';
      if (topSubject) topSubject.textContent = '--';
      return;
    }
    
    // Last download date
    const lastDownload = [...downloads].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (lastDownloadDate) {
      lastDownloadDate.textContent = new Date(lastDownload.date).toLocaleDateString('ar-EG');
    }
    
    // Total downloads count
    if (totalDownloads) {
      totalDownloads.textContent = downloads.length.toString();
    }
    
    // Calculate total size
    if (totalSize) {
      let sizeInMb = downloads.reduce((total, download) => {
        const sizeStr = download.size;
        const sizeNum = parseFloat(sizeStr.match(/\d+(\.\d+)?/)[0]);
        const unit = sizeStr.match(/[كميجابت]+/)[0];
        
        let sizeInMB = sizeNum;
        if (unit.includes('كيلو')) {
          sizeInMB = sizeNum / 1024;
        }
        
        return total + sizeInMB;
      }, 0);
      
      totalSize.textContent = sizeInMb.toFixed(2) + ' ميجابايت';
    }
    
    // Find top subject
    if (topSubject) {
      const subjectCounts = {};
      downloads.forEach(download => {
        const subject = download.subject;
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
      });
      
      let maxCount = 0;
      let maxSubject = '';
      
      Object.entries(subjectCounts).forEach(([subject, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxSubject = subject;
        }
      });
      
      // Translate subject code to Arabic name
      const subjectNames = {
        'arabic': 'اللغة العربية',
        'english': 'اللغة الإنجليزية',
        'math': 'الرياضيات',
        'science': 'العلوم',
        'religion': 'التربية الدينية',
        'discover': 'اكتشف'
      };
      
      topSubject.textContent = subjectNames[maxSubject] || maxSubject;
    }
  }
  
  // Update download history table
  function updateHistoryTable(downloads) {
    if (!downloadHistoryTable) return;
    
    // Clear table
    downloadHistoryTable.innerHTML = '';
    
    if (!downloads.length) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="5" class="empty-table">لا يوجد سجل تحميلات</td>';
      downloadHistoryTable.appendChild(emptyRow);
      return;
    }
    
    // Sort by date (newest first)
    const sortedDownloads = [...downloads].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Add rows
    sortedDownloads.forEach(download => {
      const row = document.createElement('tr');
      
      // Translate subject code to Arabic name
      const subjectNames = {
        'arabic': 'اللغة العربية',
        'english': 'اللغة الإنجليزية',
        'math': 'الرياضيات',
        'science': 'العلوم',
        'religion': 'التربية الدينية',
        'discover': 'اكتشف'
      };
      
      const subjectName = subjectNames[download.subject] || download.subject;
      
      row.innerHTML = `
        <td>${download.title}</td>
        <td>${subjectName}</td>
        <td>${new Date(download.date).toLocaleDateString('ar-EG')}</td>
        <td>${download.size}</td>
        <td>
          <a href="${download.downloadLink || '#'}" class="action-link download-action">
            <i class="fas fa-download"></i>
          </a>
          <a href="${download.path}" class="action-link view-action">
            <i class="fas fa-eye"></i>
          </a>
          <button class="action-link delete-action" data-book-id="${download.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      
      // Add event listener to delete button
      const deleteBtn = row.querySelector('.delete-action');
      deleteBtn.addEventListener('click', function() {
        removeDownload(download.id);
      });
      
      downloadHistoryTable.appendChild(row);
    });
  }
  
  // Remove a download
  function removeDownload(bookId) {
    if (confirm('هل أنت متأكد من رغبتك في إزالة هذا الكتاب من التحميلات؟')) {
      const userData = getUserData();
      if (userData && userData.downloads) {
        userData.downloads = userData.downloads.filter(download => download.id !== bookId);
        saveUserData(userData);
        displayDownloads();
      }
    }
  }
  
  // Event listeners for filter and sort controls
  if (sortDownloads) {
    sortDownloads.addEventListener('change', displayDownloads);
  }
  
  if (filterStage) {
    filterStage.addEventListener('change', displayDownloads);
  }
  
  if (filterSubject) {
    filterSubject.addEventListener('change', displayDownloads);
  }
  
  if (clearFilters) {
    clearFilters.addEventListener('click', function() {
      if (sortDownloads) sortDownloads.value = 'date-desc';
      if (filterStage) filterStage.value = 'all';
      if (filterSubject) filterSubject.value = 'all';
      displayDownloads();
    });
  }
  
  // Initial display
  displayDownloads();
});
