(this.webpackJsonp=this.webpackJsonp||[]).push([[10,16],{154:function(e,t,n){e.exports=n.p+"static/forkMe-1a2bcb7dd2c870c3afe5d50466500c18.png"},170:function(e,t,n){"use strict";n.r(t);var r,a,i=n(7),o=n(4),s=n.n(o),c=(n(3),n(5)),u=n(8),l=n(0),d=n.n(l),p=n(14),f=n(45),h=n(18),m=n(17),b={get:(a=Object(c.a)(s.a.mark((function e(t,n){var r,a,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Function('return  import("https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js")')();case 2:return r=e.sent,a=r.getDB,e.next=6,a("shaDB");case 6:return e.t0=e.sent,e.next=9,(0,e.t0)();case 9:return i=e.sent,e.abrupt("return",i.get(t,n));case 11:case"end":return e.stop()}}),e)}))),function(e,t){return a.apply(this,arguments)}),put:(r=Object(c.a)(s.a.mark((function e(t,n){var r,a,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Function('return import("https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js")')();case 2:return r=e.sent,a=r.getDB,e.next=6,a("shaDB");case 6:return e.t0=e.sent,e.next=9,(0,e.t0)();case 9:return i=e.sent,e.abrupt("return",i.put(t,n));case 11:case"end":return e.stop()}}),e)}))),function(e,t){return r.apply(this,arguments)})};function g(){return v.apply(this,arguments)}function v(){return(v=Object(c.a)(s.a.mark((function e(){var t,n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!=typeof window){e.next=2;break}return e.abrupt("return","");case 2:return e.next=4,b.get("uuid");case 4:if(t=e.sent){e.next=15;break}return e.next=8,fetch("https://code.zed.vision/register");case 8:return n=e.sent,e.next=11,n.json();case 11:return r=e.sent,e.next=14,b.put("uuid",r.uuid);case 14:return e.abrupt("return",r.uuid);case 15:return e.abrupt("return",t);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var y=n(26),x=n(27),k={},w=function(){var e=Object(c.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=k&&k[t],e.t0){e.next=5;break}return e.next=4,fetch(t).then((function(e){return e.text()})).then(function(){var e=Object(c.a)(s.a.mark((function e(n){var r,a,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=k||{},a=URL.createObjectURL(new Blob([n],{type:"application/javascript"})),e.next=4,new Function('return import("'+a+'")')();case 4:return void 0!==(i=e.sent).default?r[t]=i.default:r[t]=i,e.abrupt("return",r[t]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:e.t0=e.sent;case 5:return e.abrupt("return",e.t0);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=n(47);function j(){var e=Object(i.a)(["\n              font-family: Roboto;\n              font-size: 20px;\n              text-transform: uppercase; \n              color: white;\n            "]);return j=function(){return e},e}function _(){var e=Object(i.a)(["\n              width: 200px;\n              height: 200px;\n              display: block;\n              box-shadow: 0 0 ","px 5px ",";\n          "]);return _=function(){return e},e}function S(){var e=Object(i.a)(["\n        background: blue;\n        display: inline-block;\n        padding: 10px 10px 0px 10px;\n        border-radius: 12px;\n        text-align: center;\n    "]);return S=function(){return e},e}var P=function(){var e=d.a.useRef(null),t=d.a.useState(100),n=t[0],r=t[1],a=d.a.useState([]),i=(a[0],a[1]),o=d.a.useState(0),l=o[0],p=o[1];return d.a.useEffect((function(){var t;"undefined"!=typeof window&&n>0&&function(){var n=Object(c.a)(s.a.mark((function n(){var a,o,c,u,l,d,f,h;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,w("https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js");case 2:return a=n.sent,o=a.sha256,n.next=6,w("https://unpkg.com/@zedvision/qrious@10.13.20/dist/qrious.esm.js");case 6:return c=n.sent,u=c.QRious,p(20),n.next=11,o(Math.random()+"-"+Math.random()+"-"+Math.random());case 11:return l=n.sent,d="https://zed.vision/"+l,f={element:e.current,size:200,foregroundAlpha:.9,foreground:"red",padding:12,backgroundAlpha:.8,background:"black",value:d},t?t.set(f):t=new u(f),setTimeout((function(){return r((function(e){return e-1}))}),2e4),n.next=18,Object(O.hash)(d,!0);case 18:h=n.sent,i((function(e){return[].concat(Object(x.a)(e),[h])}));case 20:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()()}),[n]),d.a.useEffect((function(){"undefined"!=typeof window&&l&&setTimeout((function(){return p((function(e){return e-1}))}),333)}),[l]),Object(u.c)(d.a.Fragment,null,Object(u.c)("a",{href:"code/"},n>0&&Object(u.c)("div",{css:Object(u.b)(S())},Object(u.c)("canvas",{css:Object(u.b)(_(),10+2*l,n%4==3?"darkorange":n%4==2?"green":"darkred"),ref:e}),Object(u.c)("p",{css:Object(u.b)(j())},"Connect device"))),!1)},A=n(154),T=n.n(A);function E(){var e=Object(i.a)(['    \n                    box-shadow: "none";\n                  ']);return E=function(){return e},e}function C(){var e=Object(i.a)(["  \n                      margin-bottom: ",";\n                      "]);return C=function(){return e},e}t.default=function(e){var t=e.data.allMdx.edges;return l.useEffect((function(){"undefined"!=typeof window&&function(){var e=Object(c.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=console,e.next=3,g();case 3:e.t1=e.sent,e.t0.log.call(e.t0,e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),Object(u.c)(h.a,null,Object(u.c)(m.a,{title:"This is Zed vision"}),!1===("undefined"!=typeof window&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent))?Object(u.c)("h1",null,"Link your mobile with this code: ",Object(u.c)(P,null)):Object(u.c)("h1",null,"This is my blog."),Object(u.c)("a",{href:"https://github.com/zed-vision/monorepo"},Object(u.c)("img",{loading:"lazy",width:"149",height:"149",src:T.a,style:{position:"absolute",top:0,right:0},alt:"Fork me on GitHub"})),t.map((function(e){var t=e.node,n=t.frontmatter.title||t.fields.slug;return Object(u.c)("article",{key:t.fields.slug},Object(u.c)("header",null,Object(u.c)("h3",{css:Object(u.b)(C(),Object(y.b)(1/4))},Object(u.c)(p.Link,{css:Object(u.b)(E()),to:t.fields.slug},n)),Object(u.c)("small",null,t.frontmatter.date)),Object(u.c)("section",null,Object(u.c)("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}})))})),Object(u.c)(f.a,null))}},28:function(e,t,n){"use strict";n(23);var r=n(0),a=n(34),i=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,o=Object(a.a)((function(e){return i.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),s=n(44),c=n(9),u=n(16),l=n(19),d=o,p=function(e){return"theme"!==e},f=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?d:p},h=function(e,t,n){var r;if(t){var a=t.shouldForwardProp;r=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},m=function e(t,n){var a,i,o=t.__emotion_real===t,d=o&&t.__emotion_base||t;void 0!==n&&(a=n.label,i=n.target);var p=h(t,n,o),m=p||f(d),b=!m("as");return function(){var g=arguments,v=o&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==a&&v.push("label:"+a+";"),null==g[0]||void 0===g[0].raw)v.push.apply(v,g);else{0,v.push(g[0][0]);for(var y=g.length,x=1;x<y;x++)v.push(g[x],g[0][x])}var k=Object(c.e)((function(e,t,n){var a=b&&e.as||d,o="",s=[],h=e;if(null==e.theme){for(var g in h={},e)h[g]=e[g];h.theme=Object(r.useContext)(c.b)}"string"==typeof e.className?o=Object(u.a)(t.registered,s,e.className):null!=e.className&&(o=e.className+" ");var y=Object(l.a)(v.concat(s),t.registered,h);Object(u.b)(t,y,"string"==typeof a);o+=t.key+"-"+y.name,void 0!==i&&(o+=" "+i);var x=b&&void 0===p?f(a):m,k={};for(var w in e)b&&"as"===w||x(w)&&(k[w]=e[w]);return k.className=o,k.ref=n,Object(r.createElement)(a,k)}));return k.displayName=void 0!==a?a:"Styled("+("string"==typeof d?d:d.displayName||d.name||"Component")+")",k.defaultProps=t.defaultProps,k.__emotion_real=k,k.__emotion_base=d,k.__emotion_styles=v,k.__emotion_forwardProp=p,Object.defineProperty(k,"toString",{value:function(){return"."+i}}),k.withComponent=function(t,r){return e(t,Object(s.a)({},n,{},r,{shouldForwardProp:h(k,r,!0)})).apply(void 0,v)},k}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){m[e]=m(e)}));t.a=m},45:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n(7),a=n(0),i=n(28),o=n(26),s=n(46),c=n.n(s);function u(){var e=Object(r.a)(["\n  margin-right: ",";\n  margin-bottom: 0;\n  overflow: hidden;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n"]);return u=function(){return e},e}function l(){var e=Object(r.a)(["\n  margin-top: ",";\n  display: flex;\n  margin-bottom: ",";\n"]);return l=function(){return e},e}var d=i.a.div(l(),Object(o.b)(2.5),Object(o.b)(2.5)),p=i.a.div(u(),Object(o.b)(.5)),f=["a bit less\n  frustrating.","more fun","great again"],h=function(){var e=Math.random();return"undefined"==typeof window&&(e=.4),a.createElement(d,null,a.createElement(p,null,a.createElement("img",{alt:"Zoltan Erdos",src:c.a})),a.createElement("p",null,"Written by ",a.createElement("strong",null,"Zoltan Erdos"),", who is interested to make software development"," "+(f[Math.floor(e*f.length)]||"crazy."),a.createElement("br",null),a.createElement("a",{href:"https://twitter.com/ZoltanErdos"},"Follow me on Twitter")))}},46:function(e,t,n){e.exports=n.p+"static/zed-profile-pic-cd941e033fafca9e98b23dae7e5a0ccc.jpg"},47:function(e,t,n){"use strict";n.r(t),n.d(t,"hash",(function(){return r}));var r=function(e,t){return new Function('return import("https://ipfs.io/ipfs/QmWsNQvhWkQnv1oyEVifraZASN1Ya8Z7g6APfofT54Wpua/src/ipfsKV.js")')().then((function(e){return e.ipfsKV})).then((function(n){return n.add(e,{onlyHash:t})}))}}}]);