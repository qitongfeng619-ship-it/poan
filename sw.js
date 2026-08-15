const CACHE = 'poan-v5';
const ASSETS = [
  '/poan/index.html',
  '/poan/pools.html',
  '/poan/done-list.html',
  '/poan/stories.html',
  '/poan/dice.html',
  '/poan/bodymap.html',
  '/poan/boan_100days.html',
  '/poan/icon.svg',
  '/poan/manifest.webmanifest'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
