(this.webpackJsonp=this.webpackJsonp||[]).push([[7],{167:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n.n(r),s=(n(2),n(5)),u=n(17),c=n(0),i=n.n(c),o=n(18),p=n(16);function l(e){return f.apply(this,arguments)}function f(){return(f=Object(s.a)(a.a.mark((function e(t){var n,r,s,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(new TextEncoder).encode(t),e.next=3,crypto.subtle.digest("SHA-256",n);case 3:return r=e.sent,s=Array.from(new Uint8Array(r)),u=s.map((function(e){return("00"+e.toString(16)).slice(-2)})).join(""),e.abrupt("return",u);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d=n(40);t.default=function(){var e="";"undefined"!=typeof window&&(e=new URL(location.href).pathname.substr(1));var t,n=8===e.length&&(t=e,0===Object(u.a)(t.slice(0,8)).filter((function(e){return e<"0"||e>"f"})).length),r=i.a.useState(!1),c=r[0],f=r[1];return i.a.useEffect((function(){"undefined"!=typeof window&&(n?function(){var t=Object(s.a)(a.a.mark((function t(){var n,r,s,u,c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log(e),n=e,t.next=5,Object(d.a)();case 5:return r=t.sent,console.log(r),t.next=9,l(r);case 9:return s=t.sent.substring(0,8),console.log(s),t.next=13,l(n+r);case 13:return u=t.sent.substring(0,8),t.next=16,l(n+s);case 16:return c=t.sent.substring(0,8),console.log({key:n,uuidHash:s,checkKeyUuid:u,checkHashUuidHash:c}),t.next=20,fetch("https://code.zed.vision/connect?key="+n+s+u+c);case 20:return i=t.sent,t.next=23,i.json();case 23:t.sent.success?location.href="https://zed.vision/code/":f(!0),t.next=31;break;case 27:t.prev=27,t.t0=t.catch(0),console.error(t.t0),f(!0);case 31:case"end":return t.stop()}}),t,null,[[0,27]])})));return function(){return t.apply(this,arguments)}}()():f(!0))}),[]),i.a.createElement(i.a.Fragment,null,!0===c&&i.a.createElement(o.a,null,i.a.createElement(p.a,{title:"404: Not Found"}),i.a.createElement("h1",null,"This page is not a page: ",e),i.a.createElement("p",null,"Let's say, its a 404 page.")),!1===c&&i.a.createElement("div",null))}},40:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(4),a=n.n(r),s=(n(2),n(5));function u(){return c.apply(this,arguments)}function c(){return(c=Object(s.a)(a.a.mark((function e(){var t,n,r,s,u,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!=typeof window){e.next=2;break}return e.abrupt("return","");case 2:return e.next=4,new Function('\n  return import("https://unpkg.com/@zedvision/shadb@8.7.0/dist/shaDB.js");\n')();case 4:return t=e.sent,n=t.getDB,e.next=8,n();case 8:return r=e.sent,e.next=11,r.get("uuid");case 11:if(s=e.sent){e.next=21;break}return e.next=15,fetch("https://code.zed.vision/register");case 15:return u=e.sent,e.next=18,u.json();case 18:return c=e.sent,r.put("uuid",c.uuid),e.abrupt("return",c.uuid);case 21:return e.abrupt("return",s);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);