const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  './',
  './index.html',
  './asset/fallback.html',
  './asset/js/FileSaver.js',
  './asset/js/index.js',
  './asset/js/docxtemplater.js',
  './asset/js/parse.js',
  './asset/js/pizzip-utils.js',
  './asset/js/pizzip.js',
  './asset/css/custom-forms.min.css',
  './asset/css/tailwind.min.css',
  './asset/css/style.css',
  './asset/sample.csv',
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
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 10);
          return fetchRes;
        })
      });
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('./asset/fallback.html');
      }
    })
  );
});
