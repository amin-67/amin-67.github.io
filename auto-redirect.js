// Auto-redirect script for directory access
(function() {
    'use strict';
    
    // Check if we're on a directory listing page
    if (document.title === 'Index of' || 
        document.querySelector('h1')?.textContent?.includes('Index of') ||
        document.querySelector('pre')?.textContent?.includes('index.html')) {
        
        // Try to redirect to index.html
        const currentUrl = window.location.href;
        const indexUrl = currentUrl.endsWith('/') ? currentUrl + 'index.html' : currentUrl + '/index.html';
        
        // Check if index.html exists before redirecting
        fetch(indexUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    window.location.replace(indexUrl);
                }
            })
            .catch(() => {
                // If fetch fails, still try to redirect
                window.location.replace(indexUrl);
            });
    }
})();
