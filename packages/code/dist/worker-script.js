const html = `<!DOCTYPE html>\n<html>\n\n<head>\n  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">\n  <meta content="utf-8" http-equiv="encoding">\n\n  <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n  <script crossorigin src="https://unpkg.com/@emotion/react@11.0.0/dist/emotion-react.umd.min.js"></script>\n  <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n\n\n\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />\n\n  <style>\n    #container {\n      background-color: #1e1e1e;\n      width: 100vw;\n      height: 100vh;\n    }\n\n\n    #error {\n      display: none;\n      background-color: red;\n      opacity: 0.7;\n    }\n\n\n    #ace {\n      display: none;\n    }\n\n\n\n\n    #ace {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n    }\n\n\n    .almosthidden {\n      opacity: 0.5;\n    }\n\n    button {\n      font-size: large;\n    }\n  </style>\n</head>\n\n<body>\n  <div id="error" class="draggable"></div>\n  <div id="root"></div>\n\n  <div id="container"></div>\n\n  <div id="ace"></div>\n\n  <script type="module">\n    import * as Comlink from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";\n\n\n\n\n    async function initComlink() {\n      const { port1, port2 } = new MessageChannel();\n      const msg = {\n        comlinkInit: true,\n        port: port1,\n      };\n\n      navigator.serviceWorker.ready.then(registration => {\n        registration.active.postMessage(msg, [port1]);\n      });\n\n\n      const swProxy = Comlink.wrap(port2);\n      console.log(await swProxy.counter);\n\n      window["SHATEST"] = {\n        get: async (key) => await swProxy.get(key),\n        put: async (key, value) => await swProxy.put(key, value)\n      }\n\n      await swProxy.inc();\n      console.log(await swProxy.counter);\n    }\n\n    navigator.serviceWorker.addEventListener("controllerchange", initComlink);\n\n    if (navigator.serviceWorker) {\n      navigator.serviceWorker.register("sw.js");\n      initComlink()\n    }\n\n\n// navigator.serviceWorker.getRegistrations().then(function (registrations) {\n//     for (let registration of registrations) {\n//       registration.unregister();\n//     }\n//   });\n\n  </script>\n\n  <script type="module">\n    // window["motion"] = window["Motion"].motion;\n    window["css"] = window["emotionReact"].css;\n    window["jsx"] = window["emotionReact"].jsx;\n\n    window["styled"] = window["emotionStyled"];\n\n    //inject\n    //inject\n\n\n\n    async function restartCode(transpileCode) {\n\n      //  console.log(replaced);\n      const restart = new Function(\n        "transpileCode",\n        \`return function() {  \n        \${transpileCode}\n      }\`,\n      )()\n      restart();\n    }\n\n\n  </script>\n  <script type="module">\n\n    const runner = async () => {\n      const cdnAddress = "https://unpkg.com/@zedvision/code";\n      const script = "/dist/_cBundle.js.min.js";\n\n\n      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost")) {\n        const { run } = await import("./dist/_cBundle.js")\n        run();\n      } else {\n        const version = "@7.1.31";\n        const { run } = await import(cdnAddress   //+ version\n          + script)\n        run();\n      }\n\n\n    }\n\n\n    runner();\n  </script>\n</body>\n\n</html>`;
const sw = `importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");\nimportScripts("https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js");\n\nimportScripts(\n  "https://unpkg.com/@zedvision/code@7.1.31/dist/html.js",\n);\n\nconst dbPromise = idb.openDB("localZedCodeStore", 1, {\n  upgrade(db) {\n    db.createObjectStore("codeStore");\n  },\n});\n\nconst SHATEST = {\n  async get(key) {\n    return (await dbPromise).get("codeStore", key);\n  },\n  async put(key, val) {\n    return (await dbPromise).put("codeStore", val, key);\n  },\n  async delete(key) {\n    return (await dbPromise).delete("codeStore", key);\n  },\n  async clear() {\n    return (await dbPromise).clear("codeStore");\n  },\n  async keys() {\n    return (await dbPromise).getAllKeys("codeStore");\n  },\n};\n\nvar cacheKey = "7.1.31";\n\nthis.addEventListener("install", function (e) {\n  e.waitUntil(\n    caches.open(cacheKey).then((cache) => {\n      return cache.addAll([\n        "/",\n        "/index.html",\n      ]);\n    }),\n  );\n});\n\nself.addEventListener("fetch", function (e) {\n  self.runner = "browser-sw";\n\n  const tryInCachesFirst = caches.open(cacheKey).then((cache) => {\n    return cache.match(e.request).then((response) => {\n      if (!response) {\n        console.log("NO CACHE MATCH");\n        return handleNoCacheMatch(e);\n      }\n\n      fetchFromNetworkAndCache(e);\n\n      return response;\n    });\n  });\n\n  e.respondWith(tryInCachesFirst);\n});\n\nthis.addEventListener("activate", function (e) {\n  e.waitUntil(\n    caches.keys().then((keys) => {\n      return Promise.all(keys.map((key) => {\n        if (key !== cacheKey) {\n          return caches.delete(key);\n        }\n      }));\n    }),\n  );\n});\n\nfunction fetchFromNetworkAndCache(e) {\n  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.\n  // There's probably more going on here, but I'd rather just ignore this problem. :)\n  // https://github.com/paulirish/caltrainschedule.io/issues/49\n  if (\n    e.request.cache === "only-if-cached" && e.request.mode !== "same-origin"\n  ) {\n    return;\n  }\n\n  return fetch(e.request).then((res) => {\n    console.log(res);\n    if (\n      res.type === "opaque" || new URL(res.url) !== location.origin ||\n      location.search !== ""\n    ) {\n      return res;\n    }\n\n    return caches.open(cacheKey).then((cache) => {\n      // TODO: figure out if the content is new and therefore the page needs a reload.\n\n      if (e.request.method !== "POST") {\n        cache.put(e.request, res.clone());\n      }\n      return res;\n    });\n  }).catch((err) => console.error(e.request.url, err));\n}\n\nfunction handleNoCacheMatch(e) {\n  return fetchFromNetworkAndCache(e);\n}\n\nconst obj = {\n  counter: 0,\n  put(key, val) {\n    return SHATEST.put(key, val);\n  },\n  get(key) {\n    return SHATEST.get(key);\n  },\n  inc() {\n    this.counter++;\n  },\n};\n\nself.addEventListener("message", (event) => {\n  if (event.data.comlinkInit) {\n    Comlink.expose(obj, event.data.port);\n  }\n});\n`;
function inject(html1, startKey, code, codeTranspiled) {
    const res = html1.split("//inject");
    return [
        res[0],
        `localStorage.setItem("${startKey}", unescape("${escape(code)}"));`,
        `restartCode(\n          unescape("${escape(codeTranspiled)}")\n          );`,
        res[2], 
    ].join("\n");
}
var SHATEST;
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
const favicon = `data:image/x-icon;base64,AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAKBEAAJ4EAAAwMAAAAQAgAGgmAADGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/34AAP/5AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/+QAA/34AAP/5AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/5AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//01N///S0v//09P//9PT///T0///09P//9PT///T0///09P//2ho//8AAP//AAD//wAA//8AAP//AAD//wAA//9zc/////////////////////////////////////////////+Kiv//AAD//wAA//8AAP//AAD//wAA//8AAP//IyP//+/v////////7Oz//zk5//8REf//ERH//xER//8REf//AwP//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//82Nv//7+/////////o6P//Kyv//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//zU1///u7v///////+rq//8wMP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//MzP//+3t////////7e3//zQ0//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8yMv//7e3////////v7///ODj//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8EBP//GRn//xkZ//8ZGf//GRn//0pK///09P////////Ly//8vL///AAD//wAA//8AAP//AAD//wAA//8AAP//iIj/////////////////////////////////////////////g4P//wAA//8AAP//AAD//wAA//8AAP//AAD//2Bg///MzP//zMz//8zM///MzP//zMz//8zM///MzP//zMz//1VV//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/+QAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/+QAA/34AAP/5AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/+QAA/34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wIAAP98AAD/5gAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/5gAA/3wAAP8CAAD/fAAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA/3wAAP/mAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/5gAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//9OTv//paX//6en//+np///p6f//6en//+np///p6f//6en//+np///p6f//6en//+np///p6f//6en//+np///p6f//3p6//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//+Xl/////////////////////////////////////////////////////////////////////////////////////////////ygo//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//7e3/////////////////////////////////////////////////////////////////////////////////////////////Ly///wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA///f3////////////////////////////////////////////////////////////////////////////////////////+np//8QEP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//4aG/////////////////////////////7S0//8lJf//IyP//yMj//8jI///IyP//yMj//8jI///IyP//yMj//8jI///DAz//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//CAj//8HB/////////////////////////////5yc//8CAv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//DAz//8HB/////////////////////////////6Ki//8DA///AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Cwv//7+//////////////////////////////6en//8EBP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Cwv//76+/////////////////////////////62t//8GBv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Cgr//729/////////////////////////////7Ky//8HB///AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Cgr//7u7/////////////////////////////7e3//8JCf//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//CQn//7m5/////////////////////////////7y8//8KCv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//CAj//7i4/////////////////////////////8HB//8NDf//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//CAj//7e3/////////////////////////////8XF//8PD///AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Bwf//7W1/////////////////////////////8rK//8QEP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8SEv//MzP//zMz//8zM///MzP//zMz//8zM///MzP//zMz//8zM///Ojr//9XV/////////////////////////////6ys//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Dg7//+vr////////////////////////////////////////////////////////////////////////////////////////+/v//wYG//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8nJ///////////////////////////////////////////////////////////////////////////////////////////////////DQ3//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//x0d//////////////////////////////////////////////////////////////////////////////////////////////r6//8ICP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//2Rk//+Zmf//mZn//5mZ//+Zmf//mZn//5mZ//+Zmf//mZn//5mZ//+Zmf//mZn//5mZ//+Zmf//mZn//5mZ//+YmP//VFT//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/mAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/5gAA/3wAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP98AAD/AgAA/3wAAP/mAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/mAAD/fAAA/wIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAADAAAABgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8PAAD/XAAA/8YAAP/2AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/2AAD/xgAA/1wAAP8PAAAAAAAA/w8AAP+VAAD/+AAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//gAAP+VAAD/DwAA/1wAAP/4AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/4AAD/XAAA/8YAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/xgAA//YAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/9gAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8FBf//Ly///2ho//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//21t//9tbf//bW3//09P//8PD///AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//89Pf//4uL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////j4//99ff//Bgb//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//9ra///+Pj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+trf//Dw///wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//9tbf//+fn///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vr///EBD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//9sbP//+Pj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+np///DQ3//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//9ZWf//8vL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pz//9hYf//AgL//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8jI///2Nj////////////////////////////////////////w8P//cnL//zw8//87O///Ozv//zs7//87O///Ozv//zs7//87O///Ozv//zs7//87O///Ozv//zs7//87O///Ozv//yIi//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//YGD///b2////////////////////////////////////////3d3//05O//8CAv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//BAT//2tr///39////////////////////////////////////////+Pj//9QUP//AQH//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wcH//96ev//9PT////////////////////////////////////////j4///RET//wIC//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8MDP//eXn///b2////////////////////////////////////////5ub//1hY//8EBP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Bgb//2dn///29v///////////////////////////////////////+np//9dXf//AgL//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wYG//92dv//8/P////////////////////////////////////////r6///T0///wMD//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8KCv//dXX///X1////////////////////////////////////////7e3//2Vl//8GBv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//Bgb//2Nj///19f///////////////////////////////////////+7u//9paf//BAT//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wUF//9zc///8fH////////////////////////////////////////x8f//W1v//wUF//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8JCf//cXH///Pz////////////////////////////////////////8vL//3Fx//8KCv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//BQX//15e///z8/////////////////////////////////////////Ly//91df//Bgb//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wUF//9ubv//8PD////////////////////////////////////////29v//aWn//wcH//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8ICP//bW3///Ly////////////////////////////////////////9/f//319//8ODv//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//BAT//1tb///x8f////////////////////////////////////////X1//+Cgv//CAj//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wQE//9ra///7+/////////////////////////////////////////6+v//eHj//wkJ//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8HB///aWn//+/v////////////////////////////////////////+/v//4KC//8ICP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8BAf//MTH//1ZW//9WVv//Vlb//1ZW//9WVv//Vlb//1ZW//9WVv//Vlb//1ZW//9WVv//Vlb//1ZW//9WVv//WVn//6Ki///+/v///////////////////////////////////////+np//9ERP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wIC//9kZP//9PT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////39//98fP//AQH//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wsL//+hof////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+MjP//BAT//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w0N//+np/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Njf//BQX//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wwM//+jo/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+//+Jif//BAT//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wMD//9paf//8/P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+rq//9RUf//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8LC///Nzf//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VVX//1VV//9VVf//VFT//y0t//8HB///AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//YAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/9gAA/8YAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/xgAA/1wAAP/4AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/4AAD/XAAA/w8AAP+VAAD/+AAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//gAAP+VAAD/DwAAAAAAAP8PAAD/XAAA/8YAAP/2AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP/2AAD/xgAA/1wAAP8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==`;
async function handleCloudRequest(request) {
    if (request.method === "GET") {
        const url = new URL(request.url);
        if (request.url.endsWith("sw.js")) {
            return new Response(sw, {
                headers: {
                    "content-type": "text/javascript"
                }
            });
        }
        if (request.url.endsWith("favicon.ico")) {
            return new Response(favicon, {
                headers: {
                    "content-type": "image/x-icon"
                }
            });
        }
        if (request.url.includes("?hash=")) {
            const hash = url.searchParams.get("hash");
            if (hash !== null) {
                const jsonStream = await SHATEST.get(hash, "stream");
                if (jsonStream !== null) {
                    return new Response(jsonStream, {
                        headers: {
                            "content-type": ""
                        }
                    });
                }
            }
        }
        const hash = url.searchParams.get("h");
        let code = null;
        let codeTranspiled = null;
        if (hash !== null && hash.length > 5) {
            const json = await SHATEST.get(hash);
            if (json !== null) {
                const parsed = JSON.parse(json);
                code = parsed.code;
                codeTranspiled = parsed.codeTranspiled;
            }
        }
        return new Response(hash !== null ? inject(html, hash, code, codeTranspiled) : html, {
            headers: {
                "content-type": "text/html"
            }
        });
    } else if (request.method === "POST") {
        const data = await request.json();
        const myBuffer = new TextEncoder().encode(JSON.stringify(data));
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 7);
        await SHATEST.put(smallerKey, myBuffer);
        const resp = new Response(`{"hash":"${smallerKey}"}`);
        resp.headers.append("Access-Control-Allow-Origin", "*");
        resp.headers.append("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
        resp.headers.append("Access-Control-Max-Age", "86400");
        return resp;
    }
    return handleOptions(request);
}
function handleOptions(request) {
    const headers = request.headers;
    let respHeaders;
    return new Response(request.body, {
        headers: {
            ...headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
self.runner = self.runner || "worker-cf";
addEventListener("fetch", (event)=>{
    if (self.runner !== "worker-cf") return;
    event.respondWith(handleCloudRequest(event.request));
});
