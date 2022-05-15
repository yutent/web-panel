/**
 *
 */

// Files to cache
const CACHE_NAME = 'dns-host'
const APP_FILES = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/app.css',
  '/lib/anot.js',
  '/lib/utils.js',
  '/lib/css/reset-basic.css',
  '/lib/drag/core.js',
  '/lib/form/button.js',
  '/lib/form/input.js',
  '/lib/form/switch.js',
  '/lib/icon/index.js',
  '/lib/icon/svg.js',
  '/lib/layer/index.js',
  '/lib/scroll/index.js'
]

// Installing Service Worker
self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(APP_FILES)
    })
  )
})

self.addEventListener('fetch', ev => {
  ev.respondWith(caches.match(ev.request).then(res => res || fetch(ev.request)))
})
