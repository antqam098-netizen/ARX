
const CACHE_NAME = 'myuni-cache-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/offline.html',
  '/manifest.json'
];

// install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
      .then(self.skipWaiting())
  );
});

// activate
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// fetch - cache first for navigation, network-first for API JSON
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // navigation requests -> offline page fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        // put in cache for offline use
        let copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => {
        return caches.match(req).then(r => r || caches.match(OFFLINE_URL));
      })
    );
    return;
  }

  // for same-origin requests, try cache first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        // cache fetched response
        let copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => {
        // final fallback - try offline page for html
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return caches.match(OFFLINE_URL);
        }
      }))
    );
  }
});

// simple message handler to show notification from client when needed
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data && data.type === 'show-notification') {
    const title = data.title || 'إشعار';
    const options = data.options || {};
    self.registration.showNotification(title, options);
  }
});

// when notification is clicked
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window'}).then(clientsArr => {
      if (clientsArr.length > 0) {
        clientsArr[0].focus();
      } else {
        clients.openWindow('/');
      }
    })
  );
});
