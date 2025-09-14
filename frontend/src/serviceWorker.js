// Service Worker for offline functionality

const CACHE_NAME = 'rural-healthcare-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API calls differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response before caching
          const responseToCache = response.clone();
          
          // Cache successful GET requests
          if (request.method === 'GET' && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If offline, try to return cached response for GET requests
          if (request.method === 'GET') {
            return caches.match(request);
          }
          
          // For POST/PUT requests, queue them for later
          if (request.method === 'POST' || request.method === 'PUT') {
            return queueRequest(request);
          }
        })
    );
  } else {
    // For non-API requests, use cache-first strategy
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(response => {
            // Cache successful responses
            if (response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Return offline page if available
          if (request.destination === 'document') {
            return caches.match('/offline.html');
          }
        })
    );
  }
});

// Background sync for queued requests
self.addEventListener('sync', event => {
  if (event.tag === 'sync-requests') {
    event.waitUntil(syncQueuedRequests());
  }
});

// Queue request for later sync
async function queueRequest(request) {
  const queue = await getRequestQueue();
  
  const requestData = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: await request.text(),
    timestamp: Date.now()
  };
  
  queue.push(requestData);
  await saveRequestQueue(queue);
  
  // Register sync event
  if ('sync' in self.registration) {
    await self.registration.sync.register('sync-requests');
  }
  
  return new Response(JSON.stringify({
    queued: true,
    message: 'Request queued for sync when online'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Sync queued requests when online
async function syncQueuedRequests() {
  const queue = await getRequestQueue();
  const failedRequests = [];
  
  for (const requestData of queue) {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body
      });
      
      if (!response.ok) {
        failedRequests.push(requestData);
      }
    } catch (error) {
      failedRequests.push(requestData);
    }
  }
  
  await saveRequestQueue(failedRequests);
  
  // Notify clients about sync completion
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'SYNC_COMPLETE',
      failedCount: failedRequests.length
    });
  });
}

// IndexedDB helpers for request queue
async function getRequestQueue() {
  // In a real implementation, this would use IndexedDB
  // For now, using a simple in-memory store
  return self.requestQueue || [];
}

async function saveRequestQueue(queue) {
  self.requestQueue = queue;
}

// Listen for skip waiting message
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});