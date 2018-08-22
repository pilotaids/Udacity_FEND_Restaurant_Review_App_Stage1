/**
 * Register the Service Worker
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cache-sw.js', {scope:'/'})
  .then(function(registration) {
    // Registration successful
    console.log('Service Worker was registered succesfully.\n\tScope = ', registration.scope);
  })
  .catch(function(err) {
    // Registration failed
    console.log('Service Worker - Registration failed with the following error: ', err);
  });
}
