// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "k-dppp-offline-cache";
const OFFLINE_URL = "/offline.html";

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
      return cache.addAll([
        "/",
        "/kuesioner",
        "/tentang",
        "/logo.png",
        "/favicon.ico",
        "/manifest.json",
        "/offline.html"
      ]);
    })
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  // For navigation requests (HTML pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If we can't fetch the page, return the cached offline page
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // For non-navigation requests, use a "stale-while-revalidate" strategy
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response immediately if available
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // Update the cache with the fresh response
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If both cache and network fail, we don't have much options
          return null;
        });
      
      return response || fetchPromise;
    })
  );
});

// When the current service worker activates, clear out old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});