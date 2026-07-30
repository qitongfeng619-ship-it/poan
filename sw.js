const CACHE = 'poan-v2';
const ASSETS = [
  '/poan/index.html',
  '/poan/pools.html',
  '/poan/stories.html',
  '/poan/dice.html',
  '/poan/bodymap.html',
  '/poan/done-list.html',
  '/poan/manifest.webmanifest',
  '/poan/icon.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
