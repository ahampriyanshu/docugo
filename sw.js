const staticAssets = [
  './',
  './index.html',
  './asset/fallback.html',
  './asset/js/FileSaver.js',
  './asset/js/index.js',
  './asset/js/docxtemplater.js',
  './asset/js/parse.js',
  './asset/js/pizzip-utils.js',
  './asset/js/pizzip.js',
  './asset/js/xlsx.full.min.js',
  'asset/js/jszip.js',
  './asset/css/custom-forms.min.css',
  './asset/css/tailwind.min.css',
  './asset/css/style.css',
  './asset/sample.xlsx',
  './asset/sample.docx',
  'asset/img/apple-icon-60x60.png',
  'asset/img/apple-icon-72x72.png',
  'asset/img/apple-icon-76x76.png',
  'asset/img/apple-icon-114x114.png',
  'asset/img/apple-icon-120x120.png',
  'asset/img/apple-icon-144x144.png',
  'asset/img/apple-icon-152x152.png',
  'asset/img/apple-icon-180x180.png',
  'asset/img/android-icon-192x192.png',
  'asset/img/favicon-32x32.png',
  'asset/img/favicon-96x96.png',
  'asset/img/favicon-16x16.png',
  'favicon.ico',
  'asset/img/ms-icon-144x144.png',
  'asset/img/logo.png',
  './manifest.json'
];

self.addEventListener('install', async event => {
  const cache = await caches.open('static-cache');
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(newtorkFirst(req));
  }
});

async function cacheFirst(req) {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
}

async function newtorkFirst(req) {
  const cache = await caches.open('dynamic-cache');

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}