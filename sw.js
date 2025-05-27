/**
 * Service Worker for Performance Optimization
 * Provides caching, offline functionality, and performance improvements
 */

const CACHE_NAME = 'almotamayzon-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/performance.css',
    '/ultra-performance.css',
    '/compatibility-enhancements.css',
    '/performance.js',
    '/script.js',
    '/ultra-enhanced.js',
    '/auth.css',
    '/auth.js',
    '/enhanced-search-system.js',
    '/enhanced-search.css',
    '/enhanced-features.css',
    '/advanced-enhancements.js',
    '/advanced-search.css',
    '/advanced-search.js',
    '/enhanced-design.css',
    '/scroll-animations.js',
    '/offline.html',
    '/test-features.html',
    '/logo.svg',
    '/favicon.svg',
    '/manifest.json'
];

// Cache strategy patterns
const CACHE_STRATEGIES = {
    // Cache first for static assets
    CACHE_FIRST: [
        /\.css$/,
        /\.js$/,
        /\.svg$/,
        /\.png$/,
        /\.jpg$/,
        /\.jpeg$/,
        /\.gif$/,
        /\.webp$/,
        /favicon\.ico$/
    ],
    
    // Network first for dynamic content
    NETWORK_FIRST: [
        /\/api\//,
        /\/search/,
        /\/downloads/
    ],
    
    // Stale while revalidate for pages
    STALE_WHILE_REVALIDATE: [
        /\.html$/,
        /\/$/
    ]
};

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle requests with appropriate cache strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip chrome-extension and non-http requests
    if (!request.url.startsWith('http')) return;
    
    event.respondWith(handleRequest(request));
});

/**
 * Handle request with appropriate cache strategy
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    try {        // Determine cache strategy
        if (shouldUseCacheFirst(pathname)) {
            return await cacheFirst(request);
        }
        
        if (shouldUseNetworkFirst(pathname)) {
            return await networkFirst(request);
        }
        
        return await staleWhileRevalidate(request);
    } catch (error) {
        console.error('Service Worker: Error handling request', error);
        return await handleOffline(request);
    }
}

/**
 * Cache First Strategy
 */
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        return await handleOffline(request);
    }
}

/**
 * Network First Strategy
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return await handleOffline(request);
    }
}

/**
 * Stale While Revalidate Strategy
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Fetch in background
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);
    
    // Return cached version immediately, or wait for network
    return cachedResponse || await fetchPromise || await handleOffline(request);
}

/**
 * Handle offline scenarios
 */
async function handleOffline(request) {
    const url = new URL(request.url);
    
    // Return offline page for HTML requests
    if (request.destination === 'document') {
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) return offlinePage;
        
        // Fallback offline response
        return new Response(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>غير متصل - المتميزون</title>
                <style>
                    body { 
                        font-family: 'Tajawal', sans-serif; 
                        text-align: center; 
                        padding: 2rem;
                        background: #f9fafb;
                        color: #374151;
                    }
                    .offline-container {
                        max-width: 500px;
                        margin: 0 auto;
                        padding: 2rem;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }
                    .icon { font-size: 4rem; margin-bottom: 1rem; color: #6b7280; }
                    h1 { color: #1f2937; margin-bottom: 1rem; }
                    p { margin-bottom: 1rem; line-height: 1.6; }
                    .btn {
                        background: #2563eb;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        text-decoration: none;
                        display: inline-block;
                        font-family: inherit;
                    }
                    .btn:hover { background: #1d4ed8; }
                </style>
            </head>
            <body>
                <div class="offline-container">
                    <div class="icon">📱</div>
                    <h1>غير متصل بالإنترنت</h1>
                    <p>يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك وإعادة المحاولة.</p>
                    <button class="btn" onclick="window.location.reload()">إعادة المحاولة</button>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
    
    // Return placeholder for images
    if (request.destination === 'image') {
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#f3f4f6"/>
                <text x="200" y="150" text-anchor="middle" fill="#6b7280" font-family="Arial">صورة غير متاحة</text>
            </svg>`,
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
    
    return new Response('خطأ في الشبكة', { 
        status: 408, 
        statusText: 'Network Error' 
    });
}

/**
 * Check if request should use cache-first strategy
 */
function shouldUseCacheFirst(pathname) {
    return CACHE_STRATEGIES.CACHE_FIRST.some(pattern => pattern.test(pathname));
}

/**
 * Check if request should use network-first strategy
 */
function shouldUseNetworkFirst(pathname) {
    return CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => pattern.test(pathname));
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(handleBackgroundSync());
    }
});

/**
 * Handle background sync
 */
async function handleBackgroundSync() {
    console.log('Service Worker: Background sync triggered');
    
    // Handle any queued requests here
    // For example, sync form submissions, downloads, etc.
    
    try {
        // Example: sync downloads queue
        const downloadQueue = await getDownloadQueue();
        
        for (const download of downloadQueue) {
            try {
                await processDownload(download);
                await removeFromDownloadQueue(download.id);
            } catch (error) {
                console.error('Failed to process download:', error);
            }
        }
    } catch (error) {
        console.error('Background sync error:', error);
    }
}

/**
 * Push notification handling
 */
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'إشعار جديد من المتميزون',
        icon: '/logo.svg',
        badge: '/favicon.svg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'استكشاف',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('المتميزون', options)
    );
});

/**
 * Notification click handling
 */
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions (placeholder implementations)
async function getDownloadQueue() {
    // Implement download queue retrieval
    return [];
}

async function processDownload(download) {
    // Implement download processing
    console.log('Processing download:', download);
}

async function removeFromDownloadQueue(id) {
    // Implement queue item removal
    console.log('Removing from queue:', id);
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});
