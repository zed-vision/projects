!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=t(1);addEventListener("fetch",e=>{e.respondWith(r.handleRequest(e.request))})},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.handleRequest=void 0;const r=t(2),o=SHATEST,i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,HEAD,POST,OPTIONS","Access-Control-Max-Age":"86400"};n.handleRequest=async function(e){if("GET"===e.method)return e.url.endsWith("sw.js")?new Response(r.sw,{headers:{"content-type":"text/javascript"}}):new Response(r.html,{headers:{"content-type":"text/html"}});if("POST"===e.method){const n=await e.json(),t=(new TextEncoder).encode(JSON.stringify(n)),r=await crypto.subtle.digest({name:"SHA-256"},t),i=Array.from(new Uint8Array(r)).map(e=>("00"+e.toString(16)).slice(-2)).join("").substring(0,7);o.put(i,t);const s=new Response(`{"hash":"${i}"}`);return s.headers.append("Access-Control-Allow-Origin","*"),s.headers.append("Access-Control-Allow-Methods","GET,HEAD,POST,OPTIONS"),s.headers.append("Access-Control-Max-Age","86400"),s}return function(e){let n={...e.headers,...i,"Access-Control-Allow-Headers":e.headers.get("Access-Control-Request-Headers")};return new Response(e.body,{headers:n})}(e)}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sw=n.html=n.version=void 0,n.version="7.0.25",n.html='<!DOCTYPE html>\n<html>\n\n<head>\n  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">\n  <meta content="utf-8" http-equiv="encoding">\n\n  <style>\n    a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}#container{background-color:#1e1e1e;width:100vw;height:100vh;animation-duration:1s;animation-name:opening}body{overflow:hidden;width:100%;height:100vh}\n\n    @keyframes opening {\n      from {\n        width: 10%;\n        height: 20vh;\n      }\n\n      66% {\n        width: 100%;\n        height: 20vh;\n      }\n\n      to {\n        width: 100%;\n        height: 100vh;\n      }\n    }\n\n\n    #error {\n      display: none;\n      background-color: red;\n      opacity: 0.7;\n    }\n\n    #root {\n      display: none;\n    }\n\n    #ace {\n      display: none;\n    }\n\n\n    .draggable {\n      margin: 24px;\n      padding: 32px;\n      position: absolute;\n      touch-action: none;\n      overflow: hidden;\n      z-index: 2;\n      word-wrap: break-word;\n      right: 24px;\n      /* float: right; */\n      /* top: 24px; */\n      /* right: 24px ; */\n      -webkit-transform: translate(0px, 0px);\n      transform: translate(0px, 0px);\n      font-size: 32px;\n      background-color: #ddd;\n      border-radius: 16px;\n      width: fit-content;\n      max-width: 40vw;\n      background: #ddd;\n      box-shadow:\n        0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n        0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n        0 12.5px 10px rgba(0, 0, 0, 0.06),\n        0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n        0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n        0 100px 80px rgba(0, 0, 0, 0.12);\n    }\n    #ace{\n      position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n    }\n    \n\n    .almosthidden {\n      opacity: 0.5;\n    }\n\n    button {\n      font-size: large;\n    }\n  </style>\n</head>\n\n<body>\n  <div id="error" class="draggable"></div>\n  <div id="root" class="draggable resize-drag"></div>\n\n  <div id="container"></div>\n  <div id="ace"></div>\n  <script>\n  if (\'serviceWorker\' in navigator) {\n  navigator.serviceWorker.register(\'/sw.js\').then(function() {\n    console.log(\'service worker is is all cool.\');\n  }).catch(function(e) {\n    console.error(\'service worker is not so cool.\', e);\n    throw e;\n  });\n  }\n  // bling.js\n  var $ = window.$ = document.querySelector.bind(document);\n  var $$ = window.$$ = document.querySelectorAll.bind(document);\n  Node.prototype.on = window.on = function(name, fn) {\n    this.addEventListener(name, fn);\n  }\n  NodeList.prototype.__proto__ = Array.prototype;\n  NodeList.prototype.on = NodeList.prototype.addEventListener = (function(name, fn) {\n    this.forEach(function(elem) {\n      elem.on(name, fn);\n    });\n  });\n  <\/script>\n  \n  <script type="module">\n\n    const runner = async ()=>{\n      const version = "7.0.25";\n      const cdnAddress = "https://unpkg.com/@zedvision/code@" ;\n      const script = "/dist/_cBundle.js.min.js";\n\n\n      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost") ) {\n        const {run} = await import("./dist/_cBundle.js")\n        run();\n      }\n\n      const {run} = await import(cdnAddress + version + script)\n      run();\n    }\n    \n\n    //inject\n      \n    //inject\n\n    runner();\n  <\/script>\n</body>\n</html>',n.sw="var VERSION = '7';\n\nthis.addEventListener('install', function(e) {\n  e.waitUntil(caches.open(VERSION).then(cache => {\n    return cache.addAll([\n      '/',\n      '/index.html',\n      '/sw.js',\n    ]);\n  }))\n});\n\nthis.addEventListener('fetch', function(e) {\n  var tryInCachesFirst = caches.open(VERSION).then(cache => {\n    return cache.match(e.request).then(response => {\n      if (!response) {\n        return handleNoCacheMatch(e);\n      }\n      // Update cache record in the background\n      fetchFromNetworkAndCache(e);\n      // Reply with stale data\n      return response\n    });\n  });\n  e.respondWith(tryInCachesFirst);\n});\n\nthis.addEventListener('activate', function(e) {\n  e.waitUntil(caches.keys().then(keys => {\n    return Promise.all(keys.map(key => {\n      if (key !== VERSION)\n        return caches.delete(key);\n    }));\n  }));\n});\n\nfunction fetchFromNetworkAndCache(e) {\n  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.\n  // There's probaly more going on here, but I'd rather just ignore this problem. :)\n  // https://github.com/paulirish/caltrainschedule.io/issues/49\n  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;\n\n  return fetch(e.request).then(res => {\n    // foreign requests may be res.type === 'opaque' and missing a url\n    if (!res.url) return res;\n    // regardless, we don't want to cache other origin's assets\n    if (new URL(res.url).origin !== location.origin) return res;\n\n    return caches.open(VERSION).then(cache => {\n      // TODO: figure out if the content is new and therefore the page needs a reload.\n      cache.put(e.request, res.clone());\n      return res;\n    });\n  }).catch(err => console.error(e.request.url, err));\n}\n\nfunction handleNoCacheMatch(e) {\n  return fetchFromNetworkAndCache(e);\n}"}]);