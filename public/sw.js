/* BarışCreativeDesign — Basit network-first/service-worker cache */
const VERSION = "bcd-v2026-05-10-1";
const PRECACHE = [
  "/",
  "/logo.png",
  "/og-image.png",
  "/site.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  // Sadece kendi origin'imiz; analytics ve 3rd-party aşağıda
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML dokümanlar için network-first (taze içerik için)
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
    return;
  }

  // Statik kaynaklar için cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request)
          .then((response) => {
            if (response && response.status === 200 && response.type === "basic") {
              const copy = response.clone();
              caches.open(VERSION).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => new Response("", { status: 504, statusText: "Offline" }))
      );
    })
  );
});
