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
