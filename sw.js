self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // HTML 和 JS 永远走网络，不读缓存
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname === '/') {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
