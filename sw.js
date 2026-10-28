/* VELVET by FLINGR: offline copy, build 20719a4802 */
const C = 'fam-velvet-20719a4802', P = 'fam-velvet-photos-0b782a2001';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', './manifest.webmanifest', './icon-192.png'])).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('fam-velvet-') && k !== C && k !== P).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return; const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (r.mode === 'navigate' || /\/(index\.html)?$/.test(u.pathname)) {
    e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put('./', cp)); } return res; }).catch(() => caches.match('./', { ignoreSearch: true }).then(m => m || Response.error())));
    return;
  }
  if (/\/photos\/|\/icon-\d+\.png$|\.webmanifest$/.test(u.pathname)) e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(/\/photos\//.test(u.pathname) ? P : C).then(c => c.put(r, cp)); } return res; })));
});
