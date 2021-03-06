module.exports = {
  "globDirectory": "build",
  "inlineWorkboxRuntime": "true",
  "globPatterns": [
    "**/*.{ico,html,css}",
    "images/manifest/icon-512x512.png",
    "images/manifest/icon-192x192.png",
    "images/manifest/safari-pinned-tab.svg",
    "manifest.json",
    "web_modules/import-map.json",
    "images/*-l.webp",
    "dist/*.js"
  ],
  "swDest": "build/sw.js",

  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request that ends with .webp .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'images',

      // Only cache 15 images.
      expiration: {
        maxEntries: 15,
      },
    },
  }],
};