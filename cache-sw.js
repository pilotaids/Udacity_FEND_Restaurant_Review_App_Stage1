let appCacheName = 'cache-1';

// Files to chace
let whatToCache = [
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

self.addEventListener('install', function(event) {
    console.log("ServiceWorker installed successfully!");
    // Waint until completed
    event.waitUntil(
        caches.open(appCacheName).then(function(cache) {
            console.log("ServiceWorker Caching... ");
            return cache.addAll(whatToCache);
        })
        .catch(function(err) {
            console.log('ServiceWorker falied to open the cache with the following error: ', err);
        })
    );
});

self.addEventListener('activate', function(event) { 
    console.log("ServiceWorker Activate");
    // Waint until completed
    event.waitUntil(
        // Get all the keys, return a promise, and handle the chances
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('restaurant-') && cacheName != appCacheName;})
                .map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Use 'fetch' to get data from the cache
self.addEventListener('fetch', function (event) {
    console.log('ServiceWorker fetching ', event.request.url);
    // Check the caches for a match to the requested url
    event.respondWith(
        caches.match(event.request).then(function (responseMatch) { 
            return responseMatch || fetch(event.request).then(function (response) {
                return caches.open(appCacheName).then(function (cache) {
                    // Insert the request and response match in the opened chace
                    cache.put(event.request, response.clone());
                    console.log('ServiceWorker Updated the cached with ', event.request.url);
                    return response;
                });
            });
        })
        .catch(function(err) {
            console.log('ServiceWorker - Error fetching and caching the new data.\nThe error is the following: ', err);
        })
    );
});
