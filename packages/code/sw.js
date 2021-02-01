self.importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js",
);
self.importScripts("https://code.zed.vision/ipfs.js");

const { cid, files, shaSums } = globalThis;

let currentCid = cid;

const { pathname } = self.location;

if (pathname.indexOf("/ipfs/") !== -1) {
  currentCid = pathname.slice(6, 52);
}

// self.workbox.setConfig({
//     debug: true,
// });

self.addEventListener('activate', () => {

  fetch("/cid.json").then((x) => x.json()).then(console.log)
  console.log('V1 now ready to handle fetches!');
});

self.workbox.loadModule("workbox-routing");
self.workbox.loadModule("workbox-precaching");
self.workbox.loadModule("workbox-strategies");
self.workbox.loadModule("workbox-cacheable-response");

const routes = Object.keys(files).filter((x) =>
  x.length && x.indexOf(".") !== -1
).map((x) => ({ url: `/${x}`, revision: files[x], integrity: `sha2-256-${shaSums[x]}` }));

if (cid === currentCid) {
  self.workbox.precaching.precacheAndRoute(
    routes,
    {
      urlManipulation: ({ url }) => {
        const { pathname } = url;
        if (pathname === "/") url.pathname = "/index.html";
        const fileName = pathname.slice(1);
        const fileCid = files[fileName];


        const urlList = [new URL(`https://code.zed.vision/ipfs/${currentCid}/${fileName}`)];
        if (fileCid) {
          urlList.push(new URL(`https://code.zed.vision/ipfs/${fileCid}`), new URL(`https://cf-ipfs.com/ipfs/${fileCid}`))
        }

        return urlList;
      },
    },
  );
} else {
  fetch(`/ipfs/${currentCid}/js/workers/shaSums.json`).then((x) => x.json())
    .then((files) => {
      const routes = Object.keys(files).filter((x) =>
        x.length && x.indexOf(".") !== -1
      ).map((x) => ({ url: `/ipfs/${currentCid}`, revision: files[x] }));

      self.workbox.precaching.precacheAndRoute(
        routes,
      );
      self.workbox.precaching.cleanupOutdatedCaches();
    });
}

self.workbox.routing.registerRoute(
  ({ url }) => url.origin.indexOf("zed.vision") === -1,
  new self.workbox.strategies.CacheFirst({
    cacheName: "cdn-cache",
    plugins: [
      new self.workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);
