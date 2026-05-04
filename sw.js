const CACHE_NAME = "study-timer-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-152.png",
  "./icon-192.png",
  "./icon-512.png",
  "./bg1.jpg",
  "./bg2.jpg",
  "./bg3.jpg",
  "./bg4.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
