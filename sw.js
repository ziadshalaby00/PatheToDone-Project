const CACHE_NAME = "path-to-done-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./index.css",
  "./index.js",

  "./secondpage.html",
  "./secondpage.css",
  "./secondpage.js",

  "./thirdpage.html",
  "./thirdpage.css",
  "./thirdpage.js",

  "./site.webmanifest",

  "./favicon/android-chrome-192x192.png",
  "./favicon/android-chrome-512x512.png",
  "./favicon/favicon.ico"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        FILES_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn("Failed to cache:", url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(event.request)
          .then(response => {
            if (response.ok || response.type === "opaque") {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => caches.match("./index.html"));
      })
  );
});