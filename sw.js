const CACHE_NAME = "path-to-done-v1";

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

  "./manifest.json",

  "./icons/icon-192.png",
  "./icons/icon-512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
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
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});