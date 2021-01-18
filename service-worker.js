const staticQuizFlags = "quiz-flags-site-v1"
const assets = [
  "/",
  "/countries.json",
  "/index.html",
  "/list.html",
  "/css/styles.css",
  "/css/quiz.css",
  "/js/script.js",
  "/js/modal.js",
]

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticQuizFlags).then((cache) => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request)
    })
  )
})
